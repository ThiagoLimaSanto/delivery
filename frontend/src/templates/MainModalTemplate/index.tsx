import { FiChevronDown } from 'react-icons/fi';

type MainModalProps = {
  children: React.ReactNode;
  click: boolean;
  handleClick: (click: boolean) => void;
  title?: string;
};

export function MainModalTemplate({
  children,
  click,
  handleClick,
  title,
}: MainModalProps) {
  return (
    <div
      className={`
                    fixed left-1/2 top-1/2
                    w-[90%] sm:max-w-xl
                    bg-white rounded-2xl shadow-xl p-4
                    transition-all duration-300 ease-out
                    -translate-x-1/2
                    ${!click ? '-translate-y-1/2 opacity-100 z-3' : 'translate-y-[100vh] opacity-0'}
                  `}
    >
      <div className='w-full h-full flex flex-col gap-2 p-4'>
        <div>
          <button
            onClick={() => handleClick(!click)}
            className='text-2xl cursor-pointer'
          >
            <FiChevronDown size={25} />
          </button>
          <div className='mb-4'>
            <h2 className='font-bold text-xl text-center'>{title}</h2>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
