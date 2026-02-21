import type { JSX } from 'react';

type HeadingProps = {
  children: React.ReactNode;
  Tag?: keyof JSX.IntrinsicElements;
};

export function Heading({ children, Tag = 'h1' }: HeadingProps) {
  const styles: Record<string, string> = {
    h1: 'text-5xl text-amber-50 mb-15 font-extrabold',
    h2: 'text-4xl text-[#97448F] font-extrabold',
    h3: 'text-5xl text-[#97448F] font-bold text-center mb-4',
  };
  return <Tag className={styles[Tag]}>{children}</Tag>;
}
