type SideBarProps = {
  children: React.ReactNode;
};

export function SideBarText({ children }: SideBarProps) {
  return (
    <div className='flex items-center justify-center w-full h-15 bg-amber-500text-black cursor-pointer hover:scale-105 transition duration-100'>{children}</div>
  );
}
