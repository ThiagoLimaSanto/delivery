import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { type Address } from '../../hook/useAddress';
import { useAddresContext } from '../../hook/useAddressContext';
import { UseHandleModal } from '../../hook/useHandleModal';
import { MainModalTemplate } from '../../templates/MainModalTemplate';
import { AddressModal } from '../AddressModal';

type AddressModalMode = 'create' | 'edit';

export function ManageAddressesModal() {
  const [modalMode, setModalMode] = useState<AddressModalMode>('create');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [title, setTitle] = useState('');
  const { addressClick, handleAddressClick, manageAddressesCLick } =
    UseHandleModal();
  const {
    updateAddressByID,
    removeAddressById,
    createAddress,
    address,
    istoggleDefault,
  } = useAddresContext();

  const handleToggleDefaultAddress = (addressId: string) => {
    istoggleDefault(addressId);
  };

  const handleSubmit = async (data: Address) => {
    if (modalMode === 'edit' && selectedAddress) {
      await updateAddressByID(data);
    } else {
      await createAddress(data);
    }
    handleAddressClick(true);
  };

  const openCreateModal = () => {
    setModalMode('create');
    setTitle('Cadastrar');
    setSelectedAddress(null);
    handleAddressClick(addressClick);
  };

  const openEditModal = (address: Address) => {
    setModalMode('edit');
    setTitle('Editar');
    setSelectedAddress(address);
    handleAddressClick(addressClick);
  };

  return (
    <MainModalTemplate click={!manageAddressesCLick}>
      <div className='mb-4'>
        <h2 className='font-bold text-center'>Seus Endereços</h2>
      </div>
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
                  {address.street}, {address.number}, {address.district} -{' '}
                  {address.city}, {address.state}
                </p>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => openCreateModal()}
        className=' transition-colors duration-300 bg-green-600 hover:bg-green-700 py-2 px-3 w-1/3 rounded-lg cursor-pointer text-white font-bold'
      >
        Novo Endereço
      </button>
      <AddressModal
        data={selectedAddress}
        title={title}
        handleSubmit={handleSubmit}
      />
    </MainModalTemplate>
  );
}
