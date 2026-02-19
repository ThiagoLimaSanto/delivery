import type { JSX } from 'react';

type HeadingProps = {
  children: React.ReactNode;
  Tag?: keyof JSX.IntrinsicElements;
};

export function Heading({ children, Tag = 'h1' }: HeadingProps) {
  const styles: Record<string, string> = {
    h1: 'text-5xl text-amber-50 mb-15 font-extrabold text-center',
    h2: 'text-4xl text-[#97448F] my-10 font-extrabold text-center',
  };
  return <Tag className={styles[Tag]}>{children}</Tag>;
}
