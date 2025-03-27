'use client';

import { Character } from '@/types/character.types';
import {
  IconChevronsRight,
  IconArrowNarrowLeftDashed,
} from '@tabler/icons-react';

interface Props {
  currentPage: number;
  totalPages: number;
  data: Character[];
  onPageChange: (page: number) => void;
}

const PaginationList: React.FC<Props> = ({
  currentPage,
  totalPages,
  data,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (selectedPage: number) => {
    if (selectedPage !== currentPage) {
      onPageChange(selectedPage);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {data.map((item) => (
          <div className="mx-auto relative" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="w-[270px] rounded-lg opacity-90"
              loading="lazy"
            />
            <p
              className="text-sm absolute top-1 right-1 bg-green-500 text-white font-bold px-3 py-1 rounded-lg"
              style={{ background: item.status === 'Dead' ? 'red' : 'auto' }}
            >
              {item.status}
            </p>

            <div className="my-2">
              <p className="text-md">{item.name}</p>
              <p className="text-sm">
                {item.gender} - {item.species}
              </p>
              <p className="text-sm">{item.location.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="sm:flex justify-center items-center space-x-4 mt-6">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <IconArrowNarrowLeftDashed stroke={2} size={24} />
        </button>

        <div className="sm:flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <IconChevronsRight stroke={2} size={24} />
        </button>
      </div>
    </div>
  );
};

export default PaginationList;
