type SideBarProps = {
  children: React.ReactNode;
};

export function SideBar({ children }: SideBarProps) {
  return (
    <div className='flex items-center justify-center w-full h-15 bg-amber-500text-black cursor-pointer hover:scale-102 transition duration-100'>{children}</div>
  );
}
