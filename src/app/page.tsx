import dynamic from 'next/dynamic';

const SearchResult = dynamic(() => import('@/features/search.result'), {});

export default function Home() {
  return (
    <div>
      <SearchResult />
    </div>
  );
}
