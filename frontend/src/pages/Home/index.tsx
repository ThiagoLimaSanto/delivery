import { useAuth } from '../../hook/useAuth';

export function Home() {
  const { user, loading } = useAuth();

  <p>{loading && 'Carregando...'}</p>;

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </>
      )}
    </div>
  );
}
