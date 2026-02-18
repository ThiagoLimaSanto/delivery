type DefaultInputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;

export function Input({ type, id, labelText, ...rest }: DefaultInputProps) {
  return (
    <div className='flex flex-col mb-8 min-w-[80%] sm:min-w-130 lg:min-w-full h-16'>
      <label className='text-amber-50 mb-1' htmlFor={id}>
        {labelText}
      </label>
      <input
        className='border-2 border-transparent focus:border-neutral-400 outline-none bg-white h-10 p-2 rounded-md text-slate-700'
        id={id}
        type={type}
        {...rest}
      />
    </div>
  );
}
