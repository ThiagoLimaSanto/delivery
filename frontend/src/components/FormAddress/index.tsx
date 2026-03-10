import { useEffect, useState } from 'react';
import { type Address } from '../../hook/useAddress';
import { Input } from '../Input';
import { Form } from '../MainForm';

type FormAddressProps = {
  handleSubmit: (data: Address) => Promise<void>;
  data?: Address | null;
  title: string;
};

export function FormAddress({ handleSubmit, data, title }: FormAddressProps) {
  const [address, setAddress] = useState<Address>(() => ({
    id: data?.id || '',
    street: data?.street || '',
    number: data?.number || '',
    district: data?.district || '',
    city: data?.city || '',
    state: data?.state || '',
    zipCode: data?.zipCode || '',
  }));

  useEffect(() => {
  if (data) {
    setAddress(data);
  }
}, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  return (
    <div className='flex justify-center h-full w-full gap-2 flex-wrap'>
      <Form
        buttonName={title}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(address);
        }}
      >
        <Input
          classNameInput='border-[#ccc]'
          classNameLabel='!text-black'
          value={address.street || ''}  
          onChange={handleChange}
          id='street'
          name='street'
          type='text'
          labelText='Rua:'
          placeholder='Digite o nome da rua...'
        />
        <Input
          classNameLabel='!text-black'
          classNameInput='border-[#ccc]'
          value={address.number || ''}
          onChange={handleChange}
          id='number'
          name='number'
          type='text'
          labelText='Número:'
          placeholder='Digite o número da casa...'
        />
        <Input
          classNameLabel='!text-black'
          value={address.district || ''}
          onChange={handleChange}
          classNameInput='border-[#ccc]'
          id='district'
          name='district'
          type='text'
          labelText='Bairro:'
          placeholder='Digite o bairro...'
        />
        <Input
          classNameLabel='!text-black'
          value={address.city || ''}
          onChange={handleChange}
          classNameInput='border-[#ccc]'
          id='city'
          name='city'
          type='text'
          labelText='Cidade:'
          placeholder='Digite a cidade...'
        />
        <Input
          classNameLabel='!text-black'
          value={address.state || ''}
          onChange={handleChange}
          classNameInput='border-[#ccc]'
          id='state'
          name='state'
          type='text'
          labelText='Estado:'
          placeholder='Digite o estado EX: GO'
        />
        <Input
          classNameLabel='!text-black'
          value={address.zipCode || ''}
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
