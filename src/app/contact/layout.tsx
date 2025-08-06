import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: "Contact Shyam Syangtan - Book Your Nepali Language Lessons",
  description: "Get in touch with Shyam Syangtan to book personalized Nepali language lessons. Contact a TEFL certified tutor for online language learning and cultural exchange.",
  keywords: [
    "contact Nepali tutor",
    "book language lessons",
    "Nepali teacher contact",
    "online tutoring inquiry",
    "language learning consultation",
    "schedule lessons",
    "tutor availability"
  ],
  canonicalUrl: "https://shyamsyangtan.vercel.app/contact"
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
