import { FC } from "react";

interface Props {
  message: string;
  isAuthor: boolean;
  date: Date;
}

const format = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const hoursFormatted = hours % 12 === 0 ? 12 : hours % 12;
  return `${hoursFormatted}:${minutes} ${ampm}`;
};

const ChatBox: FC<Props> = props => {
  const { message, isAuthor } = props;
  const date = format(props.date);

  return (
    <div
      className={`flex flex-col justify-center p-2 shadow-lg mb-2 rounded max-w-lg ${
        isAuthor
          ? "ml-auto dark:bg-green-700 bg-green-100"
          : "mr-auto dark:bg-slate-600 bg-blue-100"
      }`}
    >
      <div className={`text-gray-800 ${"dark:text-gray-200"}`}>{message}</div>
      <div className={`text-xs text-gray-500 dark:text-gray-400`}>{date}</div>
    </div>
  );
};

export default ChatBox;
