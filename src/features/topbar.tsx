'use client';

import { useContext, useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import ThemeSwitcher from '../components/theme.switcher';
import httpRequest from '@/api/api';
import { SearchContext } from '@/context/search.context';
import { SearchResponse } from '@/api/types/response.types';
import { AxiosError } from 'axios';
import { Loading } from '@/components/loading';

const TopBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { setState, state } = useContext(SearchContext);
  const [loading, setLoading] = useState<boolean>(false);

  const getDataByQuery = async () => {
    if (!query.length) {
      return setState({
        ...state,
        searchResult: [],
        searchQuery: '',
        totalPages: 0,
        currentPage: 1,
      });
    }
    setLoading(true);
    try {
      const data = await httpRequest<SearchResponse>(
        `/character?name=${query}&page=1`,
        'GET'
      );

      localStorage.setItem('lastSearchData', JSON.stringify(data.results));
      localStorage.setItem('lastSearchQuery', query);
      localStorage.setItem('lastSearchDate', new Date().toLocaleTimeString());
      localStorage.setItem('lastTotalPages', data.info.pages.toString());

      setState({
        ...state,
        searchResult: data.results,
        totalPages: data.info.pages,
        searchQuery: query,
        currentPage: 1,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(getDataByQuery, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <header className="sticky">
        <div className="flex items-center justify-between p-1">
          <div className="w-full sm:w-[30vw] flex justify-start">
            <span className="text-2xl font-bold">Rick and Morty</span>
          </div>
          <div className="w-full sm:w-[30vw] flex justify-center">
            <div className="bg-gray-500 dark:text-white text-black p-2 rounded-md flex items-center w-full">
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
        </div>
      </header>
      {loading && <Loading />}
    </>
  );
};

export default TopBar;
