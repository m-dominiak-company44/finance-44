import { Button } from '~/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function LanguageToggle() {
    const { i18n } = useTranslation();
    // "pl" also for a detected "pl-PL" – i18n.language keeps the browser's full tag.
    const language = i18n.resolvedLanguage ?? i18n.language;

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        i18n.changeLanguage(language === 'en' ? 'pl' : 'en');
    };

    return (
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="rounded-full px-3 font-semibold">
            {language.toUpperCase()}
        </Button>
    );
}
