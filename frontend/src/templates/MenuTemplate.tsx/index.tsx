import { MainTemplate } from '../../templates/MainTemplate.tsx';

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
        <section className='grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto max-w-7xl lg:grid-cols-3 px-4 mb-16 md:gap-10 bg-[#F2F2F2]'>
          <div className='flex flex-col  gap-2 bg-white rounded-md transition duration-300 ease-in-out hover:scale-105'>
            {children}
          </div>
        </section>
      </main>
    </MainTemplate>
  );
}
