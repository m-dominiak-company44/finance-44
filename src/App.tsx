import { useEffect } from 'react';
import { Link, Routes, Route, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './components/theme-toggle';
import { LanguageToggle } from './components/language-toggle';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import { MyNavLink } from './components/my-nav-link';
import { Footer } from './components/footer';

function PageHandler() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    // A new page starts at the top, not where the previous one was scrolled to.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    switch (page) {
        case 'privacy':
            return <PrivacyPolicy />;
        case 'terms':
            return <TermsOfUse />;
        default:
            return <Home />;
    }
}

function App() {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
                    <Link to="" className="flex items-center gap-2.5 font-semibold tracking-tight">
                        <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="size-8" />
                        Finance 44
                    </Link>

                    <nav className="order-last flex w-full flex-wrap justify-center gap-1 md:order-none md:w-auto">
                        <MyNavLink to="" label={t('home')} />
                        <MyNavLink to="?page=privacy" label={t('privacy-policy')} />
                        <MyNavLink to="?page=terms" label={t('terms-of-use')} />
                    </nav>

                    <div className="flex items-center gap-1">
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<PageHandler />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
