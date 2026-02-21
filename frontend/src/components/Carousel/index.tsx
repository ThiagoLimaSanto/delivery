import { useRef } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { ItemsCategory } from '../ItemsCategory';

export function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };
  return (
    <div className='flex items-center justify-center'>
      <button
        onClick={scrollLeft}
        className='hidden md:block p-2 transition duration-200 bg-black/80 opacity-50 hover:opacity-100  rounded-full cursor-pointer text-white shadow-2xl lg:hidden'
      >
        <HiOutlineChevronLeft size={30} />
      </button>

      <ItemsCategory carouselRef={carouselRef} />
      <button
        onClick={scrollRight}
        className='hidden md:block p-2 transition duration-200 bg-black/80 opacity-50 hover:opacity-100  rounded-full cursor-pointer text-white shadow-2xl lg:hidden'
      >
        <HiOutlineChevronRight size={30} />
      </button>
    </div>
  );
}
