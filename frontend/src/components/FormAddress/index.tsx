import { useState } from 'react';
import { type Address } from '../../hook/useAddress';
import { Input } from '../Input';
import { Form } from '../MainForm';

type FormAddressProps = {
  handleSubmit: (addressId?: string) => Promise<void>;
};

export function FormAddress({ handleSubmit }: FormAddressProps) {
  const [address, setAddress] = useState<Address>({
    id: '',
    street: '',
    number: '',
    district: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  return (
    <div className='flex justify-center h-full w-full gap-2 flex-wrap'>
      <Form buttonName='Cadastrar' onSubmit={() => handleSubmit}>
        <Input
          classNameInput='border-[#ccc]'
          value={address.street}
          onChange={handleChange}
          id='street'
          name='street'
          type='text'
          labelText='Rua:'
          placeholder='Digite o nome da rua...'
        />
        <Input
          classNameInput='border-[#ccc]'
          value={address.number}
          onChange={handleChange}
          id='number'
          name='number'
          type='text'
          labelText='Número:'
          placeholder='Digite o número da casa...'
        />
        <Input
          value={address.district}
          onChange={handleChange}
          classNameInput='border-[#ccc]'
          id='district'
          name='district'
          type='text'
          labelText='Bairro:'
          placeholder='Digite o bairro...'
        />
        <Input
          value={address.city}
          onChange={handleChange}
          classNameInput='border-[#ccc]'
          id='city'
          name='city'
          type='text'
          labelText='Cidade:'
          placeholder='Digite a cidade...'
        />
        <Input
          value={address.state}
          onChange={handleChange}
          classNameInput='border-[#ccc]'
          id='state'
          name='state'
          type='text'
          labelText='Estado:'
          placeholder='Digite o estado EX: GO'
        />
        <Input
          value={address.zipCode}
          onChange={handleChange}
          classNameInput='border-[#ccc]'
          id='zipCode'
          name='zipCode'
          type='text'
          labelText='CEP: (opcional)'
          placeholder='Digite o CEP...'
        />
      </Form>
    </div>
  );
}
