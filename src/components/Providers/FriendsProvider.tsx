import { FC, useContext, useEffect, useState } from "react";
import authContext from "../../contexts/authContext";
import { friendsContext } from "../../contexts/friendsContext";
import useHttp from "../../hooks/useHttp";
import { User } from "../../interfaces/auth";
import { Request as RequestsType } from "../../interfaces/request";
import { Request } from "../../utils/request";

const FriendsProvider: FC = ({ children }) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<RequestsType[]>([]);
  const { sendRequest } = useHttp();
  const { token, user, socket } = useContext(authContext);

  useEffect(() => {
    const url = "http://localhost:8000";

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
      (data: RequestsType[]) => setRequests(data)
    );

    socket!.on("request", data => {
      setRequests(prevRequests => [data, ...prevRequests]);
    });

    socket!.on("accept", requestId => {
      const request = requests.find(r => r._id === requestId);

      setFriends(prevFriends => [...prevFriends, request!.sender]);

      setRequests(prevRequests =>
        prevRequests.filter(r => r._id !== requestId)
      );
    });

    socket!.on("reject", requestId => {
      setRequests(prevRequests =>
        prevRequests.filter(r => r._id !== requestId)
      );
    });
  }, [socket, token]);

  const sendRequestTo = (toUser: User) => {
    socket!.emit(
      "request",
      {
        sender: user!._id,
        receiver: toUser._id,
      },
      (request: RequestsType) => {
        setRequests(prevrequests => [request, ...prevrequests]);
      }
    );
  };

  const acceptRequest = (request: RequestsType) => {
    socket!.emit("accept", request._id);

    setFriends(prevFriends => [...prevFriends, request.sender]);

    setRequests(prevRequests =>
      prevRequests.filter(r => r._id !== request._id)
    );
  };

  const rejectRequest = (request: RequestsType) => {
    socket!.emit("reject", request._id);

    setRequests(prevRequests =>
      prevRequests.filter(r => r._id !== request._id)
    );
  };

  return (
    <friendsContext.Provider
      value={{
        friends,
        requests,
        sendRequestTo,
        acceptRequest,
        rejectRequest,
      }}
    >
      {children}
    </friendsContext.Provider>
  );
};

export default FriendsProvider;
