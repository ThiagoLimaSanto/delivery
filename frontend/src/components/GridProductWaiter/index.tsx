import { FiPlus } from 'react-icons/fi';
import { useHandleOrder } from '../../hook/useHandleOrder';
import { useMenu } from '../../hook/useMenu';
import { CartsTemplate } from '../../templates/CartsTemplate';
import { Spinner } from '../Spinner';

export function GridProductWaiter() {
  const { data, isLoading } = useMenu();
  const { addToCart } = useHandleOrder();

  if (isLoading) return <Spinner />;
  return (
    <>
      <h2 className='text-white font-bold text-lg mt-4'>Menu</h2>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 max-h-100 overflow-y-auto pr-4 [scrollbar-gutter:stable]'>
        {data &&
          data.map(product => (
            <CartsTemplate key={product.id}>
              <div className='flex justify-between items-center'>
                <div className='text-white'>
                  <p>{product.name}</p>
                  <p className='text-sm mt-2 text-[#858a8d]'>
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    addToCart({
                      productId: product.id,
                      quantity: 1,
                      comment: '',
                      price: product.price,
                      name: product.name,
                    });
                  }}
                >
                  <FiPlus
                    size={40}
                    color='#000'
                    className='cursor-pointer bg-[#32c560] p-2 rounded-full'
                  />
                </button>
              </div>
            </CartsTemplate>
          ))}
      </div>
    </>
  );
}
