import { FC } from "react";

interface Props {
  placeHolder?: string;
  icon?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

const SearchBar: FC<Props> = props => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full bg-transparent dark:text-gray-50 rounded outline-none border-gray-500 border-2"
        placeholder={props.placeHolder}
        value={props.value}
        onChange={e => props.onChange(e.currentTarget.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            props.onSubmit && props.onSubmit();
          }
        }}
      />
      {props.icon && (
        <button className="absolute top-2.5 right-4" onClick={props.onSubmit}>
          <i
            className={`fas fa-${props.icon} text-gray-600 dark:text-gray-400`}
          />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
