import { useTranslation } from 'react-i18next';
import { DatabaseBackup, Gift, HandCoins, Scale } from 'lucide-react';
import { LegalPage, type LegalHighlight, type LegalSection } from '~/components/legal-page';
import { TERMS_UPDATED } from '~/lib/legal';

export default function TermsOfUse() {
    const { t } = useTranslation();

    return (
        <LegalPage
            title={t('terms.title')}
            subtitle={t('terms.subtitle')}
            updated={TERMS_UPDATED}
            highlights={t('terms.highlights', { returnObjects: true }) as unknown as LegalHighlight[]}
            highlightIcons={[Gift, HandCoins, DatabaseBackup, Scale]}
            sections={t('terms.sections', { returnObjects: true }) as unknown as LegalSection[]}
            related={{ page: 'privacy', title: t('privacy-policy'), description: t('privacy.relatedDescription') }}
        />
    );
}
