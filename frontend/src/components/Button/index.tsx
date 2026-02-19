type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Button({ children, className, onClick, ...rest }: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center text-amber-50 bg-[#97448F] w-1/2 p-2 cursor-pointer hover:bg-[#973b8e] transition duration-100 hover:scale-102 rounded-full sm:w-80 lg:w-50 ${className}`}
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
