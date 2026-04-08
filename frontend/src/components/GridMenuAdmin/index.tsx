import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useMenuAdmin } from '../../hook/useMenu';
import { Image } from '../Image';
import { Spinner } from '../Spinner';

export function GridMenuAdmin() {
  const { data, isLoading } = useMenuAdmin();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {data &&
        data.map(menu => (
          <div className='bg-[#1A1E26] rounded-lg overflow-hidden p-2 text-white'>
            <div className='flex justify-between'>
              <div className='flex gap-4'>
                <Image
                  src={menu.image}
                  className='w-15 h-15 object-cover object-center'
                  alt={menu.name}
                />
                <div>
                  <p className='font-bold'>{menu.name}</p>
                  <p className='text-sm text-[#858a8d]'>{menu.category.name}</p>
                </div>
              </div>
              <p className='text-[#32c560] font-bold text-lg'>R$ {menu.price.toFixed(2)}</p>
            </div>
            <div className='border-b border-[#28282b] pb-4 mt-2'>
              <p className='text-[#858a8d]'>
                {menu.description}
              </p>
            </div>
            <div className='flex justify-between items-center py-4'>
              <div>
                <p className='text-sm text-[#858a8d]'>{menu.available ? 'Disponível' : 'Indisponível'}</p>
              </div>
              <div className='flex justify-center items-center gap-4'>
                <FiEdit2 className='cursor-pointer' size={20} />
                <FiTrash2 color='red' className='cursor-pointer' size={20} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
