import { FilterModal } from '../../components/FilterModal/index.tsx';
import { MainTemplate } from '../MainTemplate/index.tsx';

type MenuProps = {
  title: string;
  children: React.ReactNode;
};

export function MenuTemplate({ title, children }: MenuProps) {
  return (
    <MainTemplate>
      <main className='mt-30'>
        <h2 className='text-center mt-8 mb-15 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold'>
          {title}
        </h2>
        <FilterModal />
        <section className='grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto max-w-7xl lg:grid-cols-3 px-4 mb-16 md:gap-10 bg-[#F2F2F2]'>
          {children}
        </section>
      </main>
    </MainTemplate>
  );
}
