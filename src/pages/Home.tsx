import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import { Lock, Wallet, BarChart, Cloud, Download, PieChart } from 'lucide-react';

export default function Product() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-8 pb-12">
            {/* Hero Section */}
            <section className="flex w-full justify-center bg-gradient-to-b from-secondary/20 to-background py-20">
                <div className="container max-w-4xl flex-col space-y-6 text-center">
                    <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent">
                        {t('product.hero.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground">{t('product.hero.subtitle')}</p>
                    <div className="flex flex-col items-center gap-2">
                        <Button size="lg" className="gap-2" disabled>
                            <Download className="h-4 w-4" />
                            {t('product.download')}
                        </Button>
                        <p className="text-sm text-muted-foreground">** {t('product.comingSoon')}</p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container max-w-6xl space-y-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="space-y-4 rounded-lg border p-6 transition-colors hover:bg-accent/50">
                        <Lock className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-semibold">{t('product.features.security.title')}</h3>
                        <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                            {t('product.features.security.items', { returnObjects: true }).map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4 rounded-lg border p-6 transition-colors hover:bg-accent/50">
                        <PieChart className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-semibold">{t('product.features.plugins.title')}</h3>
                        <p className="text-muted-foreground">{t('product.features.plugins.description')}</p>
                    </div>

                    <div className="space-y-4 rounded-lg border p-6 transition-colors hover:bg-accent/50">
                        <BarChart className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-semibold">{t('product.features.openness.title')}</h3>
                        <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                            {t('product.features.openness.items', { returnObjects: true }).map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Key Features */}
                <div className="rounded-xl border p-8">
                    <h2 className="mb-6 text-center text-3xl font-bold">{t('product.features.keyFeatures.title')}</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border p-4 text-center">
                            <Wallet className="mx-auto h-10 w-10 text-primary" />
                            <h3 className="mt-2 text-xl font-medium">{t('product.features.keyFeatures.budgetManagement.title')}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {t('product.features.keyFeatures.budgetManagement.description')}
                            </p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                            <BarChart className="mx-auto h-10 w-10 text-primary" />
                            <h3 className="mt-2 text-xl font-medium">{t('product.features.keyFeatures.financialAnalysis.title')}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {t('product.features.keyFeatures.financialAnalysis.description')}
                            </p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                            <PieChart className="mx-auto h-10 w-10 text-primary" />
                            <h3 className="mt-2 text-xl font-medium">{t('product.features.keyFeatures.categories.title')}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{t('product.features.keyFeatures.categories.description')}</p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                            <Cloud className="mx-auto h-10 w-10 text-primary" />
                            <h3 className="mt-2 text-xl font-medium">{t('product.features.keyFeatures.dataExport.title')}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{t('product.features.keyFeatures.dataExport.description')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
