import { Image } from '../../components/Image/index.tsx';
import { Spinner } from '../../components/Spinner/index.tsx';
import { useCategories } from '../../hook/useCategories.tsx';
import { MenuTemplate } from '../../templates/MenuTemplate.tsx/index.tsx';

export function Category() {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <MenuTemplate title={'Categorias'}>
      {data &&
        data.map(category => (
          <div
            key={category.id}
            className='flex flex-col gap-2 bg-white rounded-md transition duration-300 ease-in-out lg:hover:scale-105'
          >
            <div className='h-1/2 w-full'>
              <Image
                src='https://images.unsplash.com/photo-1598679253544-2c97992403ea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='Smash'
                className='w-full h-full object-center object-cover rounded-md rounded-b-none'
              />
            </div>
            <div className='p-4'>
              <p className='font-bold text-[20px] text-[#333] mb-4'>
                {category.name}
              </p>
              <p className='text-[14px]'>
                Pão levinho de fermentalção natural da Trigou, burguer 160g,
                queijo prato e maionese da casa. queijo prato e maionese da
                casa.
              </p>
            </div>
          </div>
        ))}
    </MenuTemplate>
  );
}
