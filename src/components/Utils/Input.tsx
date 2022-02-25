import { FC, useState } from "react";

interface IProps {
  label: string;
  error?: string;
  type: "text" | "password" | "email" | "number" | "date";
  register: any;
}

const Input: FC<IProps> = props => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mb-3">
      <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold dark:font-semibold mb-2">
        {props.label}
      </label>
      <div className="relative">
        <input
          type={
            props.type !== "password"
              ? props.type
              : visible
              ? "text"
              : "password"
          }
          className={`w-full rounded dark:bg-transparent dark:text-gray-300 ${
            props.error &&
            "border-red-500 focus:border-red-500 focus:ring-red-500"
          }`}
          {...props.register}
        />
        {props.type === "password" && (
          <span className="absolute right-3 top-1.5">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-300 hover:text-gray-500 text-lg"
              onClick={() => setVisible(!visible)}
            >
              <i
                className={`fas fa-${visible ? "eye-slash" : "eye"}
              `}
              />
            </button>
          </span>
        )}
      </div>
      {props.error && (
        <p className="text-red-500 text-xs italic">{props.error}</p>
      )}
    </div>
  );
};

export default Input;
