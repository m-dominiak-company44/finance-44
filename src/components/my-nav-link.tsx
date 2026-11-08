import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '~/lib/utils';
import { buttonVariants } from './ui/button';

interface MyNavLinkProps {
    /** `""` for the home page or `?page=…`. */
    to: string;
    label: string;
}

/** Pages differ only in `?page=` (App.tsx), so the active link is decided by that parameter, not by the path. */
export function MyNavLink({ to, label }: MyNavLinkProps) {
    const [searchParams] = useSearchParams();
    const target = new URLSearchParams(to.split('?')[1] ?? '').get('page');
    const current = searchParams.get('page');
    const isActive = target === null ? current !== 'privacy' && current !== 'terms' : current === target;

    return (
        <Link
            to={to}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'rounded-full px-3.5',
                isActive ? 'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary' : 'text-muted-foreground',
            )}
        >
            {label}
        </Link>
    );
}
