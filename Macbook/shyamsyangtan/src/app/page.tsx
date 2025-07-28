import ProfileSection from '@/components/ProfileSection';
import VideoSection from '@/components/VideoSection';
import ContactSection from '@/components/ContactSection';
import LessonSection from '@/components/LessonSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Section */}
        <ProfileSection />

        {/* Video Section */}
        <VideoSection
          videoId="bElFGv0Ku40"
          title="Introduction Video"
        />

        {/* Two Column Layout for Contact and Lesson Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactSection />
          <LessonSection />
        </div>
      </main>
    </div>
  );
}
