'use client';

import { useState } from 'react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About Me' },
    { id: 'teacher', label: 'Me as a Teacher' },
    { id: 'lessons', label: 'My lessons & teaching style' },
    { id: 'resume', label: 'Resume & Certificates' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Me</h1>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <>
                {/* Basic Info */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">From India</p>
                  <p className="text-gray-600 mb-4">Living in Delhi, India (13:05 UTC+05:30)</p>
                  <p className="text-gray-500 text-sm">iTalki teacher since Aug 13, 2021</p>
                </div>

                {/* Interests */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Music', 'Sports & Fitness', 'Travel', 'Business & Finance', 'Tech'].map((interest) => (
                      <span key={interest} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* About Me Description */}
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    Namaste! I am Shyam, a language educator and multilingual enthusiast currently based in India, with roots
                    in Nepal. Fluent in English, Hindi, and Nepali, I am also actively expanding my proficiency in Thai and
                    Chinese. With several years of teaching experience, I specialize in helping students enhance their reading,
                    writing, speaking, and conversational skills through either structured or casual learning approaches,
                    tailored to individual preferences. Beyond teaching, I am passionate about travel, music, and content
                    creation, which I pursue through my YouTube and Instagram platforms. I look forward to the opportunity
                    to guide you on your language-learning journey and share in the joy of learning!
                  </p>
                </div>
              </>
            )}

            {activeTab === 'teacher' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Me as a Teacher</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    I have a true passion for languages. I find great joy in sharing my knowledge with others and helping them
                    develop their language skills. I am a patient listener and strive to create a comfortable learning
                    environment where my students can feel at ease and push themselves out of their comfort zones to
                    improve their language abilities. With fluency in three languages - English, Hindi, and Nepali - I understand
                    the challenges that come with learning a new language, and I am here to guide you through the process.
                    Whether you need assistance with reading, writing, speaking, or conversation practice, I am confident that
                    I can help you succeed.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My lessons & teaching style</h2>
                <div className="space-y-4 mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    - I specialize in conversation-based language lessons because chatting is one of the most effective ways to
                    learn a new language.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    - We'll cover various topics to help expand your vocabulary and improve fluency.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    - I also use a structured learning approach that includes personalized lesson plans, key grammar points,
                    and practical exercises to reinforce your learning.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    - Homework is given to help reinforce what we cover in class and ensure you're applying your learning. It's
                    manageable and relevant to your goals!
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    - I enjoy getting to know my students, building friendships, and creating a relaxed, engaging environment
                    where learning is fun and natural.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">My teaching material</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      PDF file
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Text Documents
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Presentation slides/PPT
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Audio files
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Image files
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Video files
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Flashcards
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Articles and news
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Quizzes
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Test templates and examples
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Graphs and charts
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Homework Assignments
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Resume & Certificates</h2>

                {/* Certificates */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Certificates</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>TEFL (Teaching English as a Foreign Language) - Teacher Record - 2023</strong>
                    </p>
                  </div>
                </div>

                {/* Teaching Experience */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Teaching experience</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">Language Tutor</p>
                        <p className="text-gray-600">ITALKI - New Delhi and NCR, India</p>
                      </div>
                      <span className="text-sm text-gray-500">2021 - Current</span>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">Other - Computer Science, Business Studies</p>
                        <p className="text-gray-600">Board of School Education Haryana, Bhiwani</p>
                        <p className="text-gray-500 text-sm">undefined</p>
                      </div>
                      <span className="text-sm text-gray-500">2019 - 2020</span>
                    </div>
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">Associate</p>
                        <p className="text-gray-600">Amazon India - New Delhi and NCR, India</p>
                      </div>
                      <span className="text-sm text-gray-500">2020 - 2021</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
