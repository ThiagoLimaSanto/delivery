import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Address } from '../../hook/useAddress';
import { useAddresContext } from '../../hook/useAddressContext';
import { UseHandleModal } from '../../hook/useHandleModal';
import { MainTemplate } from '../../templates/MainTemplate';

export function MyProfile() {
  const [modalMode, setModalMode] = useState('create');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [title, setTitle] = useState('');
  const { addressClick, handleAddressClick, manageAddressesCLick } =
    UseHandleModal();
  const { updateAddressByID, removeAddressById, address, istoggleDefault } =
    useAddresContext();

  const handleToggleDefaultAddress = (addressId: string) => {
    istoggleDefault(addressId);
  };

  const handleSubmit = async (data: Address) => {
    await updateAddressByID(data);
  };

  const openEditModal = (address: Address) => {
    setModalMode('edit');
    setTitle('Editar');
    setSelectedAddress(address);
    handleAddressClick(addressClick);
  };
  return (
    <MainTemplate>
      <section className='mt-30 w-screen'>
        <div className='w-[90%] lg:max-w-7xl mx-auto'>
          <h1 className='text-4xl md:text-5xl xl:text-6xl font-semibold text-black mb-6 md:mb-10 xl:mb-20 text-center'>
            Perfil
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto max-w-7xl px-4 mb-16 md:gap-10'>
            <div className='bg-white p-4'>
              <h2 className='text-2xl text-center mb-4'>
                Informações Pessoais
              </h2>
              <div className='flex flex-col gap-2'>
                <p>Nome: Matheus</p>
                <p>Email: 7LxkF@example.com</p>
                <p>Telefone: (11) 99999-9999</p>
              </div>
              <button className='px-3 py-2 bg-blue-500 rounded-full text-white mt-4 cursor-pointer hover:scale-105'>
                Editar
              </button>
            </div>
            <div className='bg-white p-4'>
              <h2 className='text-2xl text-center mb-6'>Meus Endereços</h2>
              <div className='flex flex-col gap-4 mb-4'>
                {address &&
                  address.map(address => (
                    <div key={address.id} className='flex flex-col gap-2'>
                      <div className='flex items-center gap-2'>
                        <FiEdit2
                          onClick={() => openEditModal(address)}
                          size={20}
                          className='cursor-pointer hover:text-blue-600 transition-colors duration-100'
                        />
                        <FiTrash2
                          onClick={() => removeAddressById(address.id)}
                          size={20}
                          className='cursor-pointer hover:text-red-600 transition-colors duration-100'
                        />
                      </div>
                      <div
                        onClick={() => handleToggleDefaultAddress(address.id)}
                        className={`${address.isDefault ? 'border-red-500 text-black font-medium' : 'text-[#b4b4b4]'}  border border-[#ccc] p-3 rounded-lg cursor-pointer hover:-translate-y-1 transition-transform duration-100 flex-1 mb-4`}
                      >
                        <p>
                          {address.street}, {address.number}, {address.district}{' '}
                          - {address.city}, {address.state}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
