import { useTranslation } from 'react-i18next';
import { CloudUpload, EyeOff, HardDrive, SlidersHorizontal } from 'lucide-react';
import { LegalPage, type LegalHighlight, type LegalSection } from '~/components/legal-page';
import { PRIVACY_UPDATED } from '~/lib/legal';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <LegalPage
            title={t('privacy.title')}
            subtitle={t('privacy.subtitle')}
            updated={PRIVACY_UPDATED}
            highlights={t('privacy.highlights', { returnObjects: true }) as unknown as LegalHighlight[]}
            highlightIcons={[HardDrive, EyeOff, CloudUpload, SlidersHorizontal]}
            sections={t('privacy.sections', { returnObjects: true }) as unknown as LegalSection[]}
            related={{ page: 'terms', title: t('terms-of-use'), description: t('terms.relatedDescription') }}
        />
    );
}
