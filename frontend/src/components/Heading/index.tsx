type HeadingProps = {
  children: React.ReactNode;
};

export function Heading({ children }: HeadingProps) {
  return <h1 className='text-5xl text-amber-50 mb-20 font-extrabold'>{children}</h1>;
}
