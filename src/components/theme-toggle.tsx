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
        <Button variant="outline" size="default" onClick={toggleTheme} className="p-3">
            {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
