'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';


export default function PageLeaderboard() {
    const t = useTranslations('i18n');

    return (
        <Page>
            <div className="text-white background">
                Leaderboard
            </div>
        </Page>
    );
}
