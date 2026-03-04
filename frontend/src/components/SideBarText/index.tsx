type SideBarProps = {
  children: React.ReactNode;
  to: string;
};

export function SideBarText({ children, to }: SideBarProps) {
  return (
    <a
      href={to}
      className='flex items-center justify-center w-full h-15 bg-amber-500text-black cursor-pointer hover:bg-[#f1f1f1]'
    >
      {children}
    </a>
  );
}
