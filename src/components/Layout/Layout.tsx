import { FC, useState } from "react";

enum ThemeMode {
  light,
  dark,
}

const Layout: FC = props => {
  const [theme, setTheme] = useState(ThemeMode.dark);

  const toggleThemes = () => {
    setTheme(theme === ThemeMode.light ? ThemeMode.dark : ThemeMode.light);
  };

  return (
    <div className={theme === ThemeMode.dark ? "dark h-full" : "h-full"}>
      <div className="dark:bg-gray-800 bg-gray-200 h-full w-screen">
        {props.children}
      </div>
      <div className="fixed bottom-0 right-0 m-4">
        <button
          className="rounded-full border bg-pink-400 px-5 py-4"
          onClick={toggleThemes}
        >
          {theme === ThemeMode.light ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Layout;
