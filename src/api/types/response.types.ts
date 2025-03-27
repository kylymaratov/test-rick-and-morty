import { Character } from '@/types/character.types';

export interface SearchResponse {
  results: Character[];
  info: { pages: number; count: number };
}
