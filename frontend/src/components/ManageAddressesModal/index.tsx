import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import {
  useDeleteAddres,
  useGetAllAddress,
  useToggleDefaultAddress,
} from '../../hook/useAddress';
import { UseHandleModal } from '../../hook/useHandleModal';
import { MainModalTemplate } from '../../templates/MainModalTemplate';
import { AddressModal } from '../AddressModal';

export function ManageAddressesModal() {
  const { manageAddressesCLick } = UseHandleModal();
  const { data } = useGetAllAddress();
  const { addressClick, handleAddressClick } = UseHandleModal();
  const { mutate: toggleDefault } = useToggleDefaultAddress();
  const { mutate: deleteAddress } = useDeleteAddres();

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress(addressId);
  };

  const handleToggleDefaultAddress = (addressId: string) => {
    toggleDefault(addressId);
  };
  
  return (
    <MainModalTemplate click={!manageAddressesCLick}>
      <div className='mb-4'>
        <h2 className='font-bold text-center'>Seus Endereços</h2>
      </div>
      <div className='flex flex-col gap-4 mb-4'>
        {data &&
          data.map(address => (
            <>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <FiEdit2
                    size={20}
                    className='cursor-pointer hover:text-blue-600 transition-colors duration-100'
                  />
                  <FiTrash2
                    onClick={() => handleDeleteAddress(address.id)}
                    size={20}
                    className='cursor-pointer hover:text-red-600 transition-colors duration-100'
                  />
                </div>
                <div
                  onClick={() => handleToggleDefaultAddress(address.id)}
                  key={address.id}
                  className={`${address.isDefault ? 'border-red-500 text-black font-medium' : 'text-[#b4b4b4]'}  border border-[#ccc] p-3 rounded-lg cursor-pointer hover:-translate-y-1 transition-transform duration-100 flex-1 mb-4`}
                >
                  <p>
                    {address.street}, {address.number}, {address.district} -{' '}
                    {address.city}, {address.state}
                  </p>
                </div>
              </div>
            </>
          ))}
      </div>
      <button
        onClick={() => handleAddressClick(addressClick)}
        className=' transition-colors duration-300 bg-green-600 hover:bg-green-700 py-2 px-3 w-1/3 rounded-lg cursor-pointer text-white font-bold'
      >
        Novo Endereço
      </button>
      <AddressModal />
    </MainModalTemplate>
  );
}
