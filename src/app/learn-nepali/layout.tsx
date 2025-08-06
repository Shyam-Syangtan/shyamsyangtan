import { Metadata } from 'next';
import { generateMetadata, generateCourseStructuredData } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: "Learn Nepali Online - Free Lessons & Vocabulary",
  description: "Master Nepali language through interactive conversations, comprehensive grammar lessons, and essential vocabulary. Learn from TEFL certified tutor Shyam Syangtan with structured courses and real-world examples.",
  keywords: [
    "learn Nepali online",
    "Nepali lessons",
    "Nepali vocabulary", 
    "Nepali grammar",
    "Nepali conversations",
    "free Nepali course",
    "Devanagari script",
    "Nepali pronunciation",
    "beginner Nepali"
  ],
  canonicalUrl: "https://shyamsyangtan.vercel.app/learn-nepali"
});

export default function LearnNepaliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseStructuredData = generateCourseStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseStructuredData)
        }}
      />
      {children}
    </>
  );
}
