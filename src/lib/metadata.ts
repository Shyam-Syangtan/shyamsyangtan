import { Metadata } from 'next';

const siteUrl = 'https://shyamsyangtan.vercel.app';
const siteName = 'Shyam Syangtan - Nepali Language Tutor';

interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/images/og-default.jpg',
  canonicalUrl,
  noIndex = false
}: MetadataConfig): Metadata {
  const fullTitle = title.includes('Shyam Syangtan') ? title : `${title} | ${siteName}`;
  const fullCanonicalUrl = canonicalUrl || siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  
  const defaultKeywords = [
    'Nepali language learning',
    'English to Nepali',
    'language tutor',
    'online Nepali classes',
    'Shyam Syangtan',
    'TEFL certified',
    'conversation practice',
    'Nepali grammar',
    'language exchange'
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: 'Shyam Syangtan' }],
    creator: 'Shyam Syangtan',
    publisher: 'Shyam Syangtan',
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullCanonicalUrl,
      siteName,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullOgImage],
    },

    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}

// Structured data generators
export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shyam Syangtan",
    "jobTitle": "Nepali Language Tutor",
    "description": "TEFL certified Nepali language tutor with expertise in English, Hindi, and Nepali languages",
    "url": siteUrl,
    "image": `${siteUrl}/images/shyam-profile.jpg`,
    "sameAs": [
      "https://www.italki.com/teacher/shyam-syangtan"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language", 
        "name": "Nepali",
        "alternateName": "ne"
      },
      {
        "@type": "Language",
        "name": "Hindi", 
        "alternateName": "hi"
      }
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "TEFL (Teaching English as a Foreign Language)",
      "dateCreated": "2023"
    },
    "workLocation": {
      "@type": "Place",
      "name": "Delhi, India"
    }
  };
}

export function generateEducationalOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteName,
    "description": "Online Nepali language learning platform offering personalized tutoring and comprehensive language courses",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Nepali", "Hindi"]
    },
    "offers": {
      "@type": "Offer",
      "name": "Nepali Language Tutoring",
      "description": "Personalized Nepali language lessons with TEFL certified instructor"
    }
  };
}

export function generateCourseStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Learn Nepali Online",
    "description": "Comprehensive Nepali language course covering conversations, grammar, and vocabulary",
    "provider": {
      "@type": "Person",
      "name": "Shyam Syangtan"
    },
    "teaches": "Nepali Language",
    "courseMode": "online",
    "inLanguage": "en",
    "about": {
      "@type": "Thing",
      "name": "Nepali Language"
    },
    "educationalLevel": "Beginner to Advanced",
    "timeRequired": "P3M",
    "url": `${siteUrl}/learn-nepali`
  };
}
