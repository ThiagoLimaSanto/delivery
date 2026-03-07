import { MainSideBar } from '../../components/MainSideBar';
import { ModalOverlay } from '../../components/ModalOverlay';
import { NavBar } from '../../components/NavBar';

type MainTemplateProps = { children: React.ReactNode };

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <NavBar />
      <ModalOverlay />
      <MainSideBar />
      <div className='mt-20'>{children}</div>
    </>
  );
}
