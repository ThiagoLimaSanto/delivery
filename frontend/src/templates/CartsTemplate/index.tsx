type CartsTemplateProps = {
  children: React.ReactNode;
};

export function CartsTemplate({ children }: CartsTemplateProps) {
  return (
    <div className='rounded-2xl w-full border border-[#3b3b3b] hover:border hover:border-[#32c560] transition-colors duration-500 ease-in-out bg-[#1A1E26]'>
      <div className='p-7'>
        {children}
      </div>
    </div>
  );
}
