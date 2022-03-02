import { FC, useContext, useEffect, useState } from "react";
import authContext from "../../contexts/authContext";
import { friendsContext } from "../../contexts/friendsContext";
import useHttp from "../../hooks/useHttp";
import { User } from "../../interfaces/auth";
import { Chat } from "../../interfaces/chat";
import { Request as RequestType } from "../../interfaces/request";
import { Request } from "../../utils/request";

const FriendsProvider: FC = ({ children }) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<RequestType[]>([]);
  const { sendRequest } = useHttp();
  const { token, user, socket } = useContext(authContext);

  useEffect(() => {
    const url = import.meta.env.VITE_SERVER;

    if (!token) return;
    if (!socket) return;

    sendRequest(
      () => Request.get(`${url}/users/friends`, { token }),
      {},
      (data: User[]) => setFriends(data)
    );

    sendRequest(
      () => Request.get(`${url}/requests`, { token }),
      {},
      (data: RequestType[]) => setRequests(data)
    );

    socket!.on("request", data => {
      console.log(data);
      setRequests(prevRequests => {
        return [data, ...prevRequests];
      });
    });

    socket!.on("accept", requestId => {
      setRequests(prevRequests => {
        const req = prevRequests.find(r => r._id === requestId);
        if (!req) return prevRequests;

        setFriends(prevFriends => [
          ...prevFriends,
          { ...req!.receiver, online: true },
        ]);
        return prevRequests.filter(r => r._id !== requestId);
      });
    });

    socket!.on("reject", requestId => {
      setRequests(prevRequests =>
        prevRequests.filter(r => r._id !== requestId)
      );
    });

    socket!.on("user-offline", userId => {
      setFriends(prevFriends => {
        const friend = prevFriends.find(f => f._id === userId);
        if (!friend) return prevFriends;

        friend.online = false;

        return [...prevFriends];
      });
    });

    socket!.on("user-online", userId => {
      setFriends(prevFriends => {
        const friend = prevFriends.find(f => f._id === userId);
        if (!friend) return prevFriends;

        friend.online = true;

        return [...prevFriends];
      });
    });

    socket!.on("removeFriend", (userId: string) => {
      setFriends(prevFriends => prevFriends.filter(f => f._id !== userId));
    });

    socket!.on("message-notify", (chat: Chat) => {
      setFriends(prevFriends => {
        const sender = prevFriends.find(f => f._id === chat.sender);

        if (!sender) return prevFriends;

        sender.lastMessage = chat.message;
        sender.lastMessageCreatedAt = chat.createdAt;

        return [...prevFriends];
      });
    });
  }, [socket, token]);

  const sendRequestTo = (toUser: User) => {
    socket!.emit(
      "request",
      {
        sender: user!._id,
        receiver: toUser._id,
      },
      (request: RequestType) => {
        setRequests(prevrequests => [request, ...prevrequests]);
      }
    );
  };

  const acceptRequest = (request: RequestType) => {
    socket!.emit("accept", request._id);

    setFriends(prevFriends => [
      ...prevFriends,
      { ...request.sender, online: true },
    ]);

    setRequests(prevRequests =>
      prevRequests.filter(r => r._id !== request._id)
    );
  };

  const rejectRequest = (request: RequestType) => {
    socket!.emit("reject", request._id);

    setRequests(prevRequests =>
      prevRequests.filter(r => r._id !== request._id)
    );
  };

  const cancelRequest = (request: RequestType) => {
    socket!.emit("cancelRequest", request._id);

    setRequests(prevRequests =>
      prevRequests.filter(r => r._id !== request._id)
    );
  };

  const removeFriend = (friend: User) => {
    socket!.emit("removeFriend", {
      userId: user!._id,
      friendId: friend._id,
    });

    setFriends(prevFriends => prevFriends.filter(f => f._id !== friend._id));
  };

  const updateLastMessage = (id: string, message: string) => {
    setFriends(prevFriends => {
      const friend = prevFriends.find(f => f._id === id);

      if (!friend) return prevFriends;

      friend.lastMessage = message;
      friend.lastMessageCreatedAt = new Date();

      return [...prevFriends];
    });
  };

  return (
    <friendsContext.Provider
      value={{
        friends,
        requests,
        sendRequestTo,
        acceptRequest,
        rejectRequest,
        cancelRequest,
        removeFriend,
        updateLastMessage,
      }}
    >
      {children}
    </friendsContext.Provider>
  );
};

export default FriendsProvider;
