'use client';

import { useEffect, useState } from 'react';

export const UseTheme = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const isDarkTheme = localStorage.getItem('darkModeEnabled');

    if (isDarkTheme) {
      enableDarkTheme();
    }
  }, []);

  const enableDarkTheme = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkModeEnabled', 'true');
    setDarkTheme(true);
  };

  const disableDarkTheme = () => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('darkModeEnabled');
    setDarkTheme(false);
  };

  const changeTheme = () => {
    darkTheme ? disableDarkTheme() : enableDarkTheme();
  };

  return { changeTheme, darkTheme };
};
