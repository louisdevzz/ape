'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';


export default function PageTasks() {
    const t = useTranslations('i18n');

    return (
        <Page>
            <div className="text-white min-h-screen overflow-y-auto">
                Tasks
            </div>
        </Page>
    );
}
