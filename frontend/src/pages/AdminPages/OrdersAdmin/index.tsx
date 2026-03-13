import { useState } from 'react';
import { FiCheck, FiClock, FiPackage, FiX, FiTruck } from 'react-icons/fi';
import { LuChefHat } from 'react-icons/lu';
import { FilterOfOrdersAdm } from '../../../components/FilterOfOrdersAdm';
import { MainTemplateAdmin } from '../../../templates/MainTemplateAdmin';

export function OrdersAdmin() {
  const [filter, setFilter] = useState('Todos');

  const handleFilter = (filtro: string) => {
    setFilter(filtro);
  };
  return (
    <MainTemplateAdmin>
      <div className='p-4'>
        <div className='mb-8'>
          <h1 className='text-white text-4xl md:text-5xl uppercase tracking-wider font-medium'>
            Pedidos
          </h1>
        </div>
        <div className='flex flex-wrap justify-around text-[#858a8d] bg-[#1A1E26] rounded-lg p-2 gap-2 border border-[#3b3b3b] max-w-lg'>
          <FilterOfOrdersAdm
            handleFilter={handleFilter}
            namefilter={'Todos (4)'}
            filter={filter}
          />
          <FilterOfOrdersAdm
            handleFilter={handleFilter}
            namefilter={`Novos (2) `}
            filter={filter}
            notification={true}
          />
          <FilterOfOrdersAdm
            handleFilter={handleFilter}
            namefilter={'Preparando'}
            filter={filter}
          />
          <FilterOfOrdersAdm
            handleFilter={handleFilter}
            namefilter={'Pronto'}
            filter={filter}
          />
          <FilterOfOrdersAdm
            handleFilter={handleFilter}
            namefilter={'Entregue'}
            filter={filter}
          />
        </div>
        <div className='mt-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-[#1A1E26] flex flex-col gap-4 rounded-lg border border-[#3b3b3b] p-4 text-white'>
              <div className='flex justify-between'>
                <p className='flex items-center justify-center gap-2 text-[#32c560] text-sm bg-[#204532] rounded-full px-2'>
                  <FiClock />
                  Novo
                </p>
                <p className='text-[#858a8d]'>14:32</p>
              </div>
              <div>
                <p className='text-white font-bold text-xl'>Pedro Santos</p>
                <p className='text-md text-[#858a8d]'>Rua das flores, 45</p>
                <p className='text-md text-[#858a8d]'>(62) 99999-9999</p>
              </div>
              <div className='bg-[#1F232B] p-4 rounded-lg'>
                <div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>2x Smash Buruger</p>
                    <p>R$ 59,80</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>2x Smash Buruger</p>
                    <p>R$ 19,90</p>
                  </div>
                  <div className='flex justify-between border-t border-[#3b3b3b] mt-2 pt-2'>
                    <p className='font-extrabold'>Total</p>
                    <p className='font-extrabold'>R$ 79.70</p>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <p className='bg-[#1F232B] p-2 rounded-lg text-[#858a8d]'>
                  Pix
                </p>
                <div className='flex gap-4'>
                  <button className='text-red-700 border border-red-700 bg-[#111217] flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
                    <FiX />
                    Recusar
                  </button>
                  <button className='text-white bg-green-600 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
                    <FiCheck />
                    Aceitar
                  </button>
                </div>
              </div>
            </div>
            <div className='bg-[#1A1E26] flex flex-col gap-4 rounded-lg border border-[#3b3b3b] p-4 text-white'>
              <div className='flex justify-between'>
                <p className='flex items-center justify-center gap-2 text-[#DF9C31] text-sm bg-[#4E3B22] rounded-full px-2'>
                  <LuChefHat />
                  Preparando
                </p>
                <p className='text-[#858a8d]'>14:32</p>
              </div>
              <div>
                <p className='text-white font-bold text-xl'>Pedro Santos</p>
                <p className='text-md text-[#858a8d]'>Rua das flores, 45</p>
                <p className='text-md text-[#858a8d]'>(62) 99999-9999</p>
              </div>
              <div className='bg-[#1F232B] p-4 rounded-lg'>
                <div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>2x Smash Buruger</p>
                    <p>R$ 59,80</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>2x Smash Buruger</p>
                    <p>R$ 19,90</p>
                  </div>
                  <div className='flex justify-between border-t border-[#3b3b3b] mt-2 pt-2'>
                    <p className='font-extrabold'>Total</p>
                    <p className='font-extrabold'>R$ 79.70</p>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <p className='bg-[#1F232B] p-2 rounded-lg text-[#858a8d]'>
                  Pix
                </p>
                <div className='flex gap-4'>
                  <button className='text-white bg-green-600 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
                    <FiPackage />
                    Pronto
                  </button>
                </div>
              </div>
            </div>
            <div className='bg-[#1A1E26] flex flex-col gap-4 rounded-lg border border-[#3b3b3b] p-4 text-white'>
              <div className='flex justify-between'>
                <p className='flex items-center justify-center gap-2 text-[#3888E3] text-sm bg-[#253956] rounded-full px-2'>
                  <LuChefHat />
                  Pronto
                </p>
                <p className='text-[#858a8d]'>14:32</p>
              </div>
              <div>
                <p className='text-white font-bold text-xl'>Pedro Santos</p>
                <p className='text-md text-[#858a8d]'>Rua das flores, 45</p>
                <p className='text-md text-[#858a8d]'>(62) 99999-9999</p>
              </div>
              <div className='bg-[#1F232B] p-4 rounded-lg'>
                <div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>2x Smash Buruger</p>
                    <p>R$ 59,80</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>2x Smash Buruger</p>
                    <p>R$ 19,90</p>
                  </div>
                  <div className='flex justify-between border-t border-[#3b3b3b] mt-2 pt-2'>
                    <p className='font-extrabold'>Total</p>
                    <p className='font-extrabold'>R$ 79.70</p>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <p className='bg-[#1F232B] p-2 rounded-lg text-[#858a8d]'>
                  Pix
                </p>
                <div className='flex gap-4'>
                  <button className='text-white bg-green-600 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
                    <FiTruck />
                    Entregar
                  </button>
                </div>
              </div>
            </div>
            <div className='bg-[#1A1E26] flex flex-col gap-4 rounded-lg border border-[#3b3b3b] p-4 text-white'>
              <div className='flex justify-between'>
                <p className='flex items-center justify-center gap-2 text-[#858a8d] text-sm bg-[#1F232B] rounded-full px-2'>
                  <FiTruck />
                  Entregue
                </p>
                <p className='text-[#858a8d]'>14:32</p>
              </div>
              <div>
                <p className='text-white font-bold text-xl'>Pedro Santos</p>
                <p className='text-md text-[#858a8d]'>Rua das flores, 45</p>
                <p className='text-md text-[#858a8d]'>(62) 99999-9999</p>
              </div>
              <div className='bg-[#1F232B] p-4 rounded-lg'>
                <div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>2x Smash Buruger</p>
                    <p>R$ 59,80</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>2x Smash Buruger</p>
                    <p>R$ 19,90</p>
                  </div>
                  <div className='flex justify-between border-t border-[#3b3b3b] mt-2 pt-2'>
                    <p className='font-extrabold'>Total</p>
                    <p className='font-extrabold'>R$ 79.70</p>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <p className='bg-[#1F232B] p-2 rounded-lg text-[#858a8d]'>
                  Pix
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplateAdmin>
  );
}
