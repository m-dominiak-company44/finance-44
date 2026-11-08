import { Button } from '~/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = document.documentElement;
        const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
        setTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full [&_svg]:size-5">
            {theme === 'light' ? <Moon /> : <Sun />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
