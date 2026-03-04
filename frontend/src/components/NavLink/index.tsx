import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: string;
}

export function NavLink({ to, children }: NavLinkProps) {
  return (
    <li className='cursor-pointer group border-b-2 border-transparent hover:border-white'>
      <Link
        to={`${to}`}
        className='transition-transform inline-block group-hover:text-white group-hover:-translate-y-1.5  pb-1 font-medium'
      >
        {children}
      </Link>
    </li>
  );
}
