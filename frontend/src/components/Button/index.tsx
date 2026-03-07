type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Button({ children, className, onClick, ...rest }: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center text-amber-50 bg-green-600 w-1/2 p-2 cursor-pointer hover:bg-green-700 font-bold transition duration-100 hover:scale-105 rounded-full sm:w-80 lg:w-50 ${className}`}
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
