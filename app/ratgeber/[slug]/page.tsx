import { notFound } from 'next/navigation';
import { GuideArticle } from '@/components/guide/GuideArticle';
import { GUIDES, getGuide } from '@/lib/guides';
import { guideMetadata } from '@/lib/guides/seo';

/* Nur die registrierten Ratgeber werden gebaut; alles andere ist 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const guide = getGuide((await params).slug);
  return guide ? guideMetadata(guide) : {};
}

export default async function GuidePage({ params }: PageProps) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
