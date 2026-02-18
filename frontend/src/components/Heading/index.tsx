type HeadingProps = {
  children: React.ReactNode;
};

export function Heading({ children }: HeadingProps) {
  return <h1 className='text-4xl font-bold text-amber-50 mb-20'>{children}</h1>;
}
