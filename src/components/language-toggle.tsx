import { Button } from '~/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function LanguageToggle() {
    const { i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pl' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Button variant="outline" size="default" onClick={toggleLanguage} className="px-6 text-lg">
            {i18n.language.toUpperCase()}
        </Button>
    );
}
