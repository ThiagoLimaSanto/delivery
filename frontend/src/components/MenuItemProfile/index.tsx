type MenuItemProfileProps = {
  children: React.ReactNode;
  Icon: React.ElementType;
  value: string;
  active: string;
  className?: string;
  colorIcon?: string;
  onClick?: () => void;
};

export function MenuItemProfile({
  children,
  Icon,
  value,
  active,
  className = '',
  colorIcon = '',
  onClick,
}: MenuItemProfileProps) {
  const isActive = active === value;

  return (
    <p
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg flex gap-2 items-center cursor-pointer text-sm transition duration-300 text-[#3B82F6]
        ${isActive ? 'bg-[#d3e1f7]' : 'text-black hover:bg-[#d3e1f7]'}
        ${className}
      `}
    >
      <Icon
        className={`${isActive ? 'text-[#3B82F6]' : 'text-black'} ${colorIcon}`}
      />
      {children}
    </p>
  );
}
