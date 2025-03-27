export interface Character {
  id: number;
  name: string;
  status: 'dead' | 'unknown' | 'alive';
  species: string;
  type: string;
  gende: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: string[];
  url: string;
  created: Date;
}
