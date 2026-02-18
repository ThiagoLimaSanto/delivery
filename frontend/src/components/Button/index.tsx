type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className={
        'text-amber-50 bg-[#97448F] w-1/2 p-2 cursor-pointer hover:bg-[#973b8e] transition duration-100 hover:scale-102 rounded-xl mt-4 sm:w-80 lg:w-50'
      }
      {...rest}
    >
      {children}
    </button>
  );
}
