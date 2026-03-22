import { useState } from 'react';
import { SubmitOrderButton } from '../SubmitOrderButton';

export function PaymentOptions() {
  const [activePayment, setActivePayment] = useState(true);
  return (
    <div className='w-full flex flex-col border-t border-[#a6a6a6]'>
      <div className='flex gap-8 mt-8'>
        <p
          onClick={() => setActivePayment(!false)}
          className={`${activePayment ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
        >
          Pague pelo site
        </p>
        <p
          onClick={() => setActivePayment(!true)}
          className={`${!activePayment ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6;] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
        >
          Pague na entrega
        </p>
      </div>
      <div className='mt-6 flex flex-col gap-8'>
        {activePayment ? (
          <>
            <button className='cursor-pointer py-3 border border-[#a6a6a6] rounded-lg w-60'>
              Pague pelo Pix
            </button>
            <button className='cursor-pointer py-3 border border-[#a6a6a6] rounded-lg w-60'>
              Pague pelo Cartão
            </button>
          </>
        ) : (
          <div className='flex gap-4 flex-wrap'>
            <button className='px-3 py-2 hover:bg-[#D7ECDF]  border border-[#ccc] rounded-full cursor-pointer text-black'>
              Dinheiro
            </button>
            <button className='px-3 py-2 hover:bg-[#D7ECDF]  border border-[#ccc] rounded-full cursor-pointer text-black'>
              Cartão Credito
            </button>
            <button className='px-3 py-2 hover:bg-[#D7ECDF]  border border-[#ccc] rounded-full cursor-pointer text-black'>
              {' '}
              Cartão Debido
            </button>
          </div>
        )}
      </div>
      <SubmitOrderButton />
    </div>
  );
}
