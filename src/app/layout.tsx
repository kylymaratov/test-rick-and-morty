import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';

const TopBar = dynamic(() => import('@/features/topbar'), {});
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
          <main className="p-2 xl:container w-full mx-auto">
            <TopBar />
            <div id="content">{children}</div>
          </main>
        </SearchProvider>
      </body>
    </html>
  );
}
