import { FiChevronDown } from 'react-icons/fi';
import { UseHandleModal } from '../../hook/useHandleModal';
import { MainModalTemplate } from '../../templates/MainModalTemplate';
import { FormAddress } from '../FormAddress';

type AddressModalProps = {
  handleSubmit: (addressId?: string) => Promise<void>;
};

export function AddressModal({ handleSubmit }: AddressModalProps) {
  const { handleAddressClick, addressClick } = UseHandleModal();
  return (
    <MainModalTemplate click={!addressClick}>
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={() => handleAddressClick(addressClick)}
          className='text-2xl cursor-pointer'
        >
          <FiChevronDown size={25} />
        </button>
        <p className='text-center font-bold'>Cadastrar Novo Endereço</p>
        <p></p>
      </div>
      <FormAddress handleSubmit={handleSubmit}/>
    </MainModalTemplate>
  );
}
