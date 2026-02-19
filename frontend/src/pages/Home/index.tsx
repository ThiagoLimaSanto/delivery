import { Spinner } from '../../components/Spinner';
import { useAuth } from '../../hook/useAuth';

export function Home() {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return <div>
    
  </div>;
}
