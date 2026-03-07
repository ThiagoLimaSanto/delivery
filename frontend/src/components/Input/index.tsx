type DefaultInputProps = {
  id: string;
  labelText: string;
  classNameLabel?: string;
  classNameInput?: string;
} & React.ComponentProps<'input'>;

export function Input({ type, id, labelText, classNameLabel, classNameInput, ...rest}: DefaultInputProps) {
  return (
    <div className='flex flex-col mb-8 min-w-[80%] sm:min-w-130 lg:min-w-full h-16'>
      <label className={`mb-1 ${classNameLabel}`} htmlFor={id}>
        {labelText}
      </label>
      <input
        className={`border-2 focus:border-neutral-400 outline-none bg-white h-10 p-2 rounded-md text-slate-700 ${classNameInput}`}
        id={id}
        type={type}
        {...rest}
      />
    </div>
  );
}
