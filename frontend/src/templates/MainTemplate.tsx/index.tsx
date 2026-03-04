import { NavBar } from '../../components/NavBar';

type MainTemplateProps = { children: React.ReactNode };

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
