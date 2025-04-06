import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t bg-muted/50">
            <div className="flex h-16 w-full items-center justify-center">
                <p className="text-sm text-muted-foreground">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            </div>
        </footer>
    );
}
