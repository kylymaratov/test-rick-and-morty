import type { Metadata } from 'next';
import './globals.css';
import dynamic from 'next/dynamic';

const TopBar = dynamic(() => import('@/features/top-bar'), {});
const SearchProvider = dynamic(() => import('@/context/search.context'), {});

export const metadata: Metadata = {
  title: 'Rick and Modry',
  description: 'Rick and Morty, app for search the person',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <main className="p-2 fixed xl:container w-full top-0 left-1/2 transform -translate-x-1/2">
            <TopBar />
            <div id="content">{children}</div>
          </main>
        </SearchProvider>
      </body>
    </html>
  );
}
