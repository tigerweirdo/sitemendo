import { notFound } from 'next/navigation';
import { GuideArticle } from '@/components/guide/GuideArticle';
import { counterpart, getGuide, guidesIn } from '@/lib/guides';
import { guideMetadata } from '@/lib/guides/seo';

/* Yalnız kayıtlı Türkçe rehberler derlenir; gerisi 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return guidesIn('tr').map(g => ({ slug: g.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const guide = getGuide((await params).slug, 'tr');
  return guide ? guideMetadata(guide, counterpart(guide)) : {};
}

export default async function GuidePage({ params }: PageProps) {
  const guide = getGuide((await params).slug, 'tr');
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
