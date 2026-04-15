import { useState } from 'react';
import { FiEdit2, FiMapPin, FiPlus, FiTrash2 } from 'react-icons/fi';
import type { Address } from '../../hook/useAddress';
import { useAddresContext } from '../../hook/useAddressContext';
import { UseHandleModal } from '../../hook/useHandleModal';
import { LayoutTemplateProfile } from '../../templates/LayoutTemplateProfile';
import { AddressModal } from '../AddressModal';
import type { AddressModalMode } from '../ManageAddressesModal';

export function AddressProfile() {
  const {
    removeAddressById,
    address,
    istoggleDefault,
    updateAddressByID,
    createAddress,
  } = useAddresContext();
  const [modalMode, setModalMode] = useState<AddressModalMode>('create');
  const [title, setTitle] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { addressClick, handleAddressClick } = UseHandleModal();
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

  const handleSubmit = async (data: Address) => {
    if (modalMode === 'edit' && selectedAddress) {
      await updateAddressByID(data);
    } else {
      await createAddress(data);
    }
    handleAddressClick(true);
  };

  return (
    <LayoutTemplateProfile>
      <div className='flex justify-between mb-4'>
        <h2 className='font-semibold text-xl'>Meus Endereços</h2>
        <button
          onClick={() => openCreateModal()}
          className='flex gap-2 items-center justify-center bg-[#3B82F6] text-white p-2 rounded-lg text-sm cursor-pointer hover:brightness-110 transition duration-100'
        >
          <FiPlus />
          Adicionar
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        {address &&
          address.map(address => (
            <div
              key={address.id}
              className={`flex justify-between items-center p-4 border  rounded-lg cursor-pointer ${address.isDefault ? 'bg-[#d3e1f7] border-[#3B82F6]' : 'opacity-50'}`}
            >
              <div
                onClick={() => istoggleDefault(address.id)}
                className='flex gap-2 items-center'
              >
                <FiMapPin
                  className={`${address.isDefault ? 'text-[#3B82F6]' : ''}`}
                />
                <p className='text-sm'>
                  {address.street}, {address.number} - {address.district},{' '}
                  {address.city} - {address.state}
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => openEditModal(address)}
                  className='cursor-pointer hover:text-[#3B82F6] z-10'
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => removeAddressById(address.id)}
                  className='cursor-pointer hover:text-red-600 z-10'
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
      </div>
      <AddressModal
        data={selectedAddress}
        title={title}
        handleSubmit={handleSubmit}
      />
    </LayoutTemplateProfile>
  );
}
