import { Link } from 'react-router-dom';
import { useCategories } from '../../hook/useCategories';
import { Image } from '../Image';
import { Spinner } from '../Spinner';

type ItemsCategoryProps = {
  carouselRef: React.RefObject<HTMLDivElement | null>;
};

export function ItemsCategory({ carouselRef }: ItemsCategoryProps) {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div
      ref={carouselRef}
      className='flex gap-4 no-scrollbar items-center overflow-x-auto snap-x snap-mandatory p-4 mx-2'
    >
      {data?.map(category => (
        <div className='min-w-40 h-32 w-32 snap-start shrink-0 text-black p-6 rounded-xl text-center cursor-pointer hover:scale-105 transition duration-100'>
          <Image
            src={
              'https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$c223742c-0e75-41b0-9f4b-283df4dfcc77/200/200/original?country=br'
            }
            alt={category.name}
            className='w-full'
          />
          <Link key={category.id} to={''}>
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
