import { NavLink as Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: string;
}

export function NavLink({ to, children }: NavLinkProps) {
  return (
    <li className='cursor-pointer group'>
      <Link
        to={`${to}`}
        className={({ isActive }) =>
          `transition-transform inline-block group-hover:text-white group-hover:-translate-y-1.5 ${isActive ? '-translate-y-1.5' : ''}  pb-1 font-medium`
        }
      >
        {children}
      </Link>
    </li>
  );
}
