import { useEffect, useState } from 'react';
import type { Category } from '../../hook/useCategories';
import { Input } from '../Input';
import { Form } from '../MainForm';

type FormMenuProps = {
  handleSubmit: (data: Category) => void;
  title?: string;
  data: Category | undefined;
};

export function FormCategories({ handleSubmit, title, data }: FormMenuProps) {
  const [category, setCategory] = useState<Category>({
    id: '',
    name: '',
  });

  useEffect(() => {
    if (data) {
      setCategory(data);
    } else {
      setCategory({ id: '', name: '' });
    }
  }, [data]);
  return (
    <>
      <Form
        buttonName={title}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(category);
        }}
      >
        <Input
          classNameInput='border-[#ccc]'
          classNameLabel='!text-black'
          value={category.name || ''}
          onChange={e => setCategory({ ...category, name: e.target.value })}
          id='name'
          name='name'
          type='text'
          labelText='Nome:'
          placeholder='Digite o nome...'
        />
      </Form>
    </>
  );
}
