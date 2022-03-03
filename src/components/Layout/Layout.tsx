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
    </div>
  );
};

export default Layout;
