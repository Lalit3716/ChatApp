import { FC } from "react";

interface IProps {
  label: string;
  error?: string;
  type: "text" | "password" | "email" | "number" | "date";
  register: any;
}

const Input: FC<IProps> = props => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold dark:font-semibold mb-2">
        {props.label}
      </label>
      <input
        type="text"
        className={`w-full rounded dark:bg-transparent dark:text-gray-300 ${
          props.error &&
          "border-red-500 focus:border-red-500 focus:ring-red-500"
        }`}
        {...props.register}
      />
      {props.error && (
        <p className="text-red-500 text-xs italic">{props.error}</p>
      )}
    </div>
  );
};

export default Input;
