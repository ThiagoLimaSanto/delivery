import { HeroHome } from '../../components/HeroHome';
import { Spinner } from '../../components/Spinner';
import { useAuth } from '../../hook/useAuth';
import { MainTemplate } from '../../templates/MainTemplate.tsx';

export function Home() {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <MainTemplate>
        <HeroHome />
      </MainTemplate>
    </>
  );
}
