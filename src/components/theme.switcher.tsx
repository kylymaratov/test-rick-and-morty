'use client';

import React from 'react';
import { IconSun, IconSunFilled } from '@tabler/icons-react';
import { UseTheme } from '@/hooks/use.theme';

const ThemeSwitcher: React.FC = () => {
  const { changeTheme, darkTheme } = UseTheme();

  return (
    <button type="button" onClick={changeTheme}>
      {darkTheme ? (
        <IconSun stroke={2} size={26} />
      ) : (
        <IconSunFilled stroke={2} size={26} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
