'use client';

import httpRequest from '@/api/api';
import { SearchResponse } from '@/api/types/response.types';
import PaginationList from '@/features/pagination.list';
import { SearchContext } from '@/context/search.context';
import { Character } from '@/types/character.types';
import { useContext, useEffect, useState } from 'react';
import { Loading } from '@/components/loading';
import { AxiosError } from 'axios';

const SearchResult: React.FC = () => {
  const [lastSearchData, setLastSearchData] = useState<Character[]>([]);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('');
  const [lastSearchDate, setLastSearchDate] = useState<string>('');
  const [lastTotalPages, setLastTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { state, setState } = useContext(SearchContext);

  const handleLoadPage = async (page: number) => {
    setLoading(true);
    try {
      const data = await httpRequest<SearchResponse>(
        `/character?name=${state.searchQuery || lastSearchQuery}&page=${page}`,
        'GET'
      );
      setState({
        ...state,
        searchResult: data.results,
        currentPage: page,
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
    const savedLastSearchData = localStorage.getItem('lastSearchData');
    const savedLastSearchQuery = localStorage.getItem('lastSearchQuery');
    const savedLastSearchDate = localStorage.getItem('lastSearchDate');
    const savedLastTotalPages = localStorage.getItem('lastTotalPages');

    if (savedLastSearchData) {
      const data = JSON.parse(savedLastSearchData);
      if (data.length) setLastSearchData(data);
    }

    setLastSearchQuery(savedLastSearchQuery || '');
    setLastSearchDate(savedLastSearchDate || '');
    setLastTotalPages(Number(savedLastTotalPages) || 0);
  }, [state.searchResult]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-5">
      <div>
        {state.searchQuery ? (
          <p className="ml-1 text-md">
            Search result by{' '}
            <span className="font-bold">{state.searchQuery}</span> - just now
          </p>
        ) : lastSearchQuery ? (
          <p className="ml-1 text-md">
            Last search result by{' '}
            <span className="font-bold">{lastSearchQuery}</span> in{' '}
            {lastSearchDate}
          </p>
        ) : null}
        <div className="mt-4">
          <PaginationList
            data={
              state.searchResult.length ? state.searchResult : lastSearchData
            }
            totalPages={state.totalPages || lastTotalPages}
            currentPage={state.currentPage}
            onPageChange={handleLoadPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
