import { useState } from 'react';
import { useGetDefaultAddress } from '../../hook/useAddress';
import { UseHandleModal } from '../../hook/useHandleModal';
import { Spinner } from '../Spinner';

export function DeliveryOptions() {
  const { handleManageAddressesCLick, manageAddressesCLick } = UseHandleModal();
  const { data, isLoading } = useGetDefaultAddress();
  const [active, setActive] = useState(true);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='w-full flex flex-col mt-4'>
      <div className='flex gap-8 mt-4'>
        <p
          onClick={() => setActive(!false)}
          className={`${active ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
        >
          Entrega
        </p>
        <p
          onClick={() => setActive(!true)}
          className={`${!active ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6;] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
        >
          Retirada
        </p>
      </div>
      <div className='my-8'>
        {active ? (
          <>
            {data ? (
              <>
                <p>
                  {data.street}, {data.number}
                </p>
                <p>
                  {data.district} - {data.city}/{data.state}
                </p>
              </>
            ) : (
              <>
                <p>Nenhum endereço cadastrado!</p>
                <p className=''>
                  Cadastrar um novo endereço.{' '}
                  <span
                    onClick={() =>
                      handleManageAddressesCLick(manageAddressesCLick)
                    }
                    className='text-red-500 cursor-pointer'
                  >
                    clique aqui.
                  </span>
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <p>Rua Centro, 204</p>
            <p>Rua de frente ao cemiterio - Morrinhos/GO</p>
          </>
        )}
      </div>
    </div>
  );
}
