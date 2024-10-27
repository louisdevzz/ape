'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import Image from 'next/image';

import { Page } from '@/components/Page';
import Home from '@/components/Home';

export default function PageIndex() {
  const t = useTranslations('i18n');

  return (
    <Page>
      <Home />
    </Page>
  );
}
