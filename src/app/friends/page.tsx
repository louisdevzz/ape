'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';


export default function PageFriends() {
    const t = useTranslations('i18n');

    return (
        <Page>
            <div className="text-white background">
                Friends
            </div>
        </Page>
    );
}
