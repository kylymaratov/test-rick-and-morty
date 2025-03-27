'use client';

import { Character } from '@/types/character-types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface SearchContextTypes {
  searchResult: Character[];
  setSearchResult: Dispatch<SetStateAction<Character[]>>;
}

interface SearchProvderTypes {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextTypes>({
  searchResult: [],
  setSearchResult: () => {},
});

const SearchProvider: React.FC<SearchProvderTypes> = ({ children }) => {
  const [searchResult, setSearchResult] = useState<Character[]>([]);

  return (
    <SearchContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
