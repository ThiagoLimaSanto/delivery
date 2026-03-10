import { FiChevronDown } from 'react-icons/fi';
import type { Address } from '../../hook/useAddress';
import { UseHandleModal } from '../../hook/useHandleModal';
import { MainModalTemplate } from '../../templates/MainModalTemplate';
import { FormAddress } from '../FormAddress';

type AddressModalProps = {
  handleSubmit: (data: Address) => Promise<void>;
  title: string;
  data?: Address | null;
};

export function AddressModal({
  handleSubmit,
  title = 'Novo Endereço',
  data,
}: AddressModalProps) {
  const { handleAddressClick, addressClick } = UseHandleModal();
  return (
    <MainModalTemplate click={!addressClick}>
      <button
        onClick={() => handleAddressClick(addressClick)}
        className='text-2xl cursor-pointer'
      >
        <FiChevronDown size={25} />
      </button>
      <div className='flex justify-center items-center mb-4'>
        <p className='text-center font-bold'>{title + ' Endereço'}</p>
      </div>
      <FormAddress title={title} data={data} handleSubmit={handleSubmit} />
    </MainModalTemplate>
  );
}
