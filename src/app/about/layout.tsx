import { Metadata } from 'next';
import { generateMetadata, generateEducationalOrganizationStructuredData } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: "About Shyam Syangtan - TEFL Certified Nepali Language Tutor",
  description: "Meet Shyam Syangtan, a TEFL certified language tutor from Delhi, India. Specializing in Nepali, English, and Hindi with personalized teaching methods and cultural exchange focus.",
  keywords: [
    "about Shyam Syangtan",
    "TEFL certified tutor",
    "Nepali teacher background",
    "language tutor experience",
    "Delhi language teacher",
    "multilingual tutor",
    "teaching credentials",
    "language education"
  ],
  canonicalUrl: "https://shyamsyangtan.vercel.app/about"
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationStructuredData = generateEducationalOrganizationStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData)
        }}
      />
      {children}
    </>
  );
}
