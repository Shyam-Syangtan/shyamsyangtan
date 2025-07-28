'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProfileSectionProps {
  name?: string;
  rating?: number;
  languages?: string[];
  description?: string;
  lessonsCount?: number;
  location?: string;
  profileImage?: string;
}

export default function ProfileSection({
  name = "Shyam Syangtan",
  rating = 4.9,
  languages = ["English", "Hindi", "Nepali"],
  description = "Passionate language teacher from Delhi, India. Currently learning Chinese and always excited to share knowledge with students. Specializing in conversational fluency and cultural exchange.",
  lessonsCount = 4000,
  location = "Delhi, India",
  profileImage = "/images/profile.svg"
}: ProfileSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src={profileImage}
              alt={`${name} profile picture`}
              fill
              className="rounded-full object-cover"
              priority
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' font-family='Arial, sans-serif' font-size='14' fill='%236b7280'%3EProfile%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              {/* Name and Rating */}
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-900">{rating}</span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-2 mb-3">
                {languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{lessonsCount?.toLocaleString()}+ lessons taught</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="mt-4 md:mt-0 md:ml-6">
              <Link href="/contact">
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Contact
                </button>
              </Link>
              <button
                onClick={() => {
                  const videoSection = document.getElementById('intro-video');
                  if (videoSection) {
                    videoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full md:w-auto mt-2 md:mt-2 md:ml-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Intro video
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm mt-1">
              <a
                href="https://www.italki.com/en/teacher/9627036"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Also teaching on iTalki
              </a>
            </div>
            <div className="text-sm mt-1">
              <a
                href="https://www.italki.com/en/affshare?ref=shyamsyangtan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 underline"
              >
                Join iTalki here to get $10 extra credit!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
