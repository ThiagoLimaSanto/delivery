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
    <MainModalTemplate
      title={title}
      handleClick={handleAddressClick}
      click={!addressClick}
    >
      <FormAddress title={title} data={data} handleSubmit={handleSubmit} />
    </MainModalTemplate>
  );
}
