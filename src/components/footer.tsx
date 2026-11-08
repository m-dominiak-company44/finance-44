import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONTACT_URL } from '~/lib/legal';

export function Footer() {
    const { t } = useTranslation();
    const linkClass = 'transition-colors hover:text-foreground';

    return (
        <footer className="border-t bg-muted/40">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground md:flex-row">
                <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
                <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
                    <Link to="?page=privacy" className={linkClass}>
                        {t('privacy-policy')}
                    </Link>
                    <Link to="?page=terms" className={linkClass}>
                        {t('terms-of-use')}
                    </Link>
                    <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {t('footer.contact')}
                    </a>
                </nav>
            </div>
        </footer>
    );
}
