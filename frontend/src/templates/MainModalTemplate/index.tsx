type MainModalProps = {
  children: React.ReactNode;
  click: boolean;
};

export function MainModalTemplate({ children, click }: MainModalProps) {
  return (
    <div
      className={`
                    fixed left-1/2 top-1/2
                    w-[90%] sm:max-w-xl
                    bg-white rounded-2xl shadow-xl p-4
                    transition-all duration-300 ease-out
                    -translate-x-1/2 z-3
                    ${!click ? '-translate-y-1/2 opacity-100' : 'translate-y-[100vh] opacity-0'}
                  `}
    >
      <div className='w-full h-full flex flex-col gap-2 p-4'>{children}</div>
    </div>
  );
}
