'use client';

import React, { useEffect, useState } from 'react';
import { IconSun, IconSunFilled } from '@tabler/icons-react';

const ThemeSwitcher: React.FC = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled');

    if (darkModeEnabled) {
      return setDarkMode(true);
    }

    setDarkMode(false);
  }, []);

  const handleDarkMode = () => {
    if (isDarkMode) {
      localStorage.removeItem('darkModeEnabled');
      document.documentElement.classList.remove('darkMode');
      setDarkMode(false);
    } else {
      localStorage.setItem('darkModeEnabled', 'true');
      document.documentElement.classList.add('darkMode');
      setDarkMode(true);
    }
  };

  return (
    <button type="button" onClick={handleDarkMode}>
      {isDarkMode ? (
        <IconSun stroke={2} size={26} />
      ) : (
        <IconSunFilled stroke={2} size={26} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
