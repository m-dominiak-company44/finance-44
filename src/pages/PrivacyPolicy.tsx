import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Privacy() {
    const { t } = useTranslation();
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        setCurrentDate(`${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`);
    }, []);

    return (
        <div className="flex flex-col items-center gap-8 pb-12">
            {/* Hero Section */}
            <section className="flex w-full justify-center bg-gradient-to-b from-secondary/20 to-background py-20">
                <div className="container max-w-4xl flex-col space-y-6 text-center">
                    <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent">
                        {t('privacy.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground">{t('privacy.subtitle')}</p>
                </div>
            </section>

            {/* Policy Content */}
            <div className="container max-w-6xl space-y-8 text-lg">
                <div className="prose max-w-none rounded-lg border p-8">
                    <h2 className="mb-6 text-center text-3xl font-bold">{t('privacy.policy.title')}</h2>
                    <h3 className="mb-6 text-center text-2xl font-bold">{t('privacy.policy.appName')}</h3>

                    <p className="mb-4">{t('privacy.policy.lastUpdated', { date: currentDate })}</p>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.introduction.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.introduction.content')}</p>
                    <p className="mb-4 font-bold">{t('privacy.policy.introduction.important')}</p>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.dataController.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.dataController.content')}</p>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.dataTypes.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.dataTypes.intro')}</p>
                    <p className="mb-4">{t('privacy.policy.dataTypes.userEntered')}</p>
                    <ul className="mb-4 list-disc pl-8">
                        {t('privacy.policy.dataTypes.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.processingPurposes.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.processingPurposes.intro')}</p>
                    <ul className="mb-4 list-disc pl-8">
                        {t('privacy.policy.processingPurposes.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.legalBasis.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.legalBasis.intro')}</p>
                    <ul className="mb-4 list-disc pl-8">
                        {t('privacy.policy.legalBasis.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.retention.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.retention.intro')}</p>
                    <ul className="mb-4 list-disc pl-8">
                        {t('privacy.policy.retention.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.storage.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.storage.content')}</p>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.rights.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.rights.intro')}</p>
                    <ul className="mb-4 list-disc pl-8">
                        {t('privacy.policy.rights.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.security.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.security.intro')}</p>
                    <ul className="mb-4 list-disc pl-8">
                        {t('privacy.policy.security.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.changes.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.changes.content')}</p>

                    <h4 className="mb-4 mt-8 text-xl font-semibold">{t('privacy.policy.contact.title')}</h4>
                    <p className="mb-4">{t('privacy.policy.contact.content')}</p>

                    <p className="mb-4 mt-8">{t('privacy.policy.confirmation')}</p>
                </div>
            </div>
        </div>
    );
}
