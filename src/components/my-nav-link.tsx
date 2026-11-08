import { NavLink } from 'react-router-dom';
import { cn } from '~/lib/utils';
import { buttonVariants } from './ui/button';

interface MyNavLinkProps {
    to: string;
    label: string;
}

export function MyNavLink({ to, label }: MyNavLinkProps) {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <span className={cn(buttonVariants({ variant: isActive ? 'secondary' : 'ghost' }), isActive && 'bg-accent')}>{label}</span>
            )}
        </NavLink>
    );
}
