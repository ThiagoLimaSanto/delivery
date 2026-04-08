import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import type { Category } from '../../hook/useCategories';
import { UseHandleModal } from '../../hook/useHandleModal';
import type { MenuPost } from '../../hook/useMenu';
import { Input } from '../Input';
import { Form } from '../MainForm';

type FormMenuProps = {
  handleSubmit: (data: MenuPost) => void;
  title?: string;
  data: Category[] | undefined;
};

export function FormMenu({ handleSubmit, title, data }: FormMenuProps) {
  const { handleCLickPostMenu, clickPostMenu } = UseHandleModal();
  const [menu, setMenu] = useState<MenuPost>({
    name: '',
    description: '',
    price: 0,
    image: '',
    categoryId: '',
  });
  return (
    <>
      <div>
        <button
          onClick={() => handleCLickPostMenu(clickPostMenu)}
          className='text-2xl cursor-pointer'
        >
          <FiChevronDown size={25} />
        </button>
        <p className='text-center text-2xl font-bold'>Adicionar Item</p>
      </div>
      <Form
        buttonName={title}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(menu);
        }}
      >
        <Input
          classNameInput='border-[#ccc]'
          classNameLabel='!text-black'
          value={menu.name || ''}
          onChange={e => setMenu({ ...menu, name: e.target.value })}
          id='name'
          name='name'
          type='text'
          labelText='Nome:'
          placeholder='Digite o nome...'
        />
        <Input
          classNameLabel='!text-black'
          classNameInput='border-[#ccc]'
          value={menu.description || ''}
          onChange={e => setMenu({ ...menu, description: e.target.value })}
          id='description'
          name='description'
          type='text'
          labelText='Descrição:'
          placeholder='Digite a descrição...'
        />
        <Input
          classNameLabel='!text-black'
          value={menu.price || ''}
          onChange={e => setMenu({ ...menu, price: Number(e.target.value) })}
          classNameInput='border-[#ccc]'
          id='price'
          name='price'
          type='text'
          labelText='Preço:'
          placeholder='Digite o preço...'
        />
        <Input
          classNameLabel='!text-black'
          value={menu.image || ''}
          onChange={e => setMenu({ ...menu, image: e.target.value })}
          classNameInput='border-[#ccc]'
          id='image'
          name='image'
          type='text'
          labelText='Imagem:'
          placeholder='Digite a url imagem...'
        />
        <div className='flex flex-col mb-8 min-w-[80%] h-16'>
          <label className='mb-1 text-black' htmlFor='categoryId'>
            Categoria:
          </label>
          <select
            className='border-2 focus:border-neutral-400 outline-none bg-white h-10 p-2 rounded-md text-slate-700 border-[#ccc]'
            name='categoryId'
            id='categoryId'
            onChange={e => setMenu({ ...menu, categoryId: e.target.value })}
          >
            <option value=''>Selecione uma categoria</option>
            {data &&
              data.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      </Form>
    </>
  );
}
