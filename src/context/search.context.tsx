'use client';

import { Character } from '@/types/character.types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface State {
  searchResult: Character[];
  totalPages: number;
  searchQuery: string;
  currentPage: number;
}

interface SearchContextTypes {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
}

interface SearchProviderTypes {
  children: ReactNode;
}

const defaultValues: State = {
  searchResult: [],
  totalPages: 0,
  searchQuery: '',
  currentPage: 0,
};

export const SearchContext = createContext<SearchContextTypes>({
  state: defaultValues,
  setState: () => {},
});

const SearchProvider: React.FC<SearchProviderTypes> = ({ children }) => {
  const [state, setState] = useState<State>(defaultValues);

  return (
    <SearchContext.Provider value={{ state, setState }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
