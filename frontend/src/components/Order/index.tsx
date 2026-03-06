import { useEffect, useState } from 'react';
import { FiChevronDown, FiMinus, FiPlus } from 'react-icons/fi';
import { UseHandleModal } from '../../hook/useHandleModal';
import type { ProductType } from '../../types/Product';
import { Image } from '../Image';
import { useHandleOrder } from '../../hook/useHandleOrder';

type OrderProps = {
  comment: React.RefObject<HTMLTextAreaElement | null>;
  selectedProduct: ProductType;
};

export function Order({ comment, selectedProduct }: OrderProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useHandleOrder();
  const { orderClick, handleOrderClick, handleModalCarrinho } =
    UseHandleModal();
  const totalPrice = (selectedProduct?.price * quantity).toFixed(2);

  useEffect(() => {
    setQuantity(1);

    if (comment.current) {
      comment.current.value = '';
    }
  }, [selectedProduct]);

  return (
    <div
      className={`
          fixed flex flex-col justify-between left-1/2 top-1/2
          w-[90%] h-[90%] sm:max-w-xl
          bg-white rounded-md shadow-xl p-4
          transition-all duration-300 ease-out
          -translate-x-1/2 z-3
          ${orderClick ? '-translate-y-1/2 opacity-100' : 'translate-y-[100vh] opacity-0'}
        `}
    >
      <div className='flex flex-col gap-4 items-center mb-4 w-full h-[70%]'>
        <button
          onClick={() => {
            handleOrderClick(orderClick);
          }}
          className='text-2xl cursor-pointer'
        >
          <FiChevronDown size={25} />
        </button>
        <p className='text-center font-bold flex-1'>{selectedProduct?.name}</p>
        <Image
          src={selectedProduct?.image}
          className='w-full h-full object-cover object-center overflow-hidden rounded-md'
          alt={selectedProduct?.name}
        />
        <p className='text-[14px] w-full'>{selectedProduct?.description}</p>
        <div className='w-full'>
          <p className='mt-4 mb-2 font-bold text-[#a1a1a1]'>
            Algum Comentário?
          </p>
          <textarea
            ref={comment}
            rows={4}
            className='w-full h-24 border border-[#ccc] rounded-md p-2'
            placeholder='Ex: Tirar a cebola, o ketchup e o alface etc...'
          />
        </div>
      </div>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center justify-center gap-4 border border-[#ccc] px-3 py-2'>
          <button
            onClick={() => {
              if (quantity > 1) setQuantity(quantity - 1);
            }}
            className='text-green-600 text-2xl cursor-pointer'
          >
            <FiMinus size={20} />
          </button>
          <span className='text-black font-semibold'>{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className='text-green-600 text-2xl cursor-pointer'
          >
            <FiPlus size={20} />
          </button>
        </div>
        <button
          onClick={() => {
            addToCart({
              productId: selectedProduct.id,
              quantity: quantity,
              comment: comment.current?.value || '',
              price: selectedProduct.price,
              name: selectedProduct.name,
            });
            handleOrderClick(orderClick);
            handleModalCarrinho(false);
          }}
          className='text-md cursor-pointer border border-[#ccc] px-3 py-2 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-bold'
        >
          Adicionar R$ {totalPrice}
        </button>
      </div>
    </div>
  );
}
