'use client';

import { useContext, useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import ThemeSwitcher from '../components/theme-switcher';
import httpRequest from '@/api/api';
import { Character } from '@/types/character-types';
import { SearchContext } from '@/context/search.context';

const TopBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { setSearchResult } = useContext(SearchContext);

  const getDataByQuery = async () => {
    if (!query.length) return;
    try {
      const data = await httpRequest<{ result: Character[] }>(
        `/character?name=${query}`,
        'GET'
      );
      setSearchResult(data.result);
    } catch (error) {}
  };

  useEffect(() => {
    const timeout = setTimeout(getDataByQuery, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <header className="flex items-center justify-betweenp-1">
      <div className="w-full sm:w-[30vw] flex justify-start">
        <span className="text-2xl font-bold">Rick and Morty</span>
      </div>
      <div className="w-full sm:w-[30vw] flex justify-center">
        <div className="dark:bg-gray-200 p-2 rounded-md flex items-center w-full">
          <IconSearch stroke={3} size={20} />
          <input
            id="query"
            type="text"
            className="mx-3 w-full bg-transparent border-none outline-none text-md"
            placeholder="Search the person by name"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="w-full sm:w-[30vw] flex justify-end items-center">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default TopBar;
