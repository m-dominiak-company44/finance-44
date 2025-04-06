import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-8 pb-12">
            {/* Hero Section */}
            <section className="flex w-full justify-center bg-gradient-to-b from-secondary/20 to-background py-20">
                <div className="container max-w-4xl flex-col space-y-6 text-center">
                    <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent">
                        404 - {t('notfound.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground">{t('notfound.description')}</p>
                    <Button asChild>
                        <Link to="/" className="gap-2">
                            {t('home')}
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
