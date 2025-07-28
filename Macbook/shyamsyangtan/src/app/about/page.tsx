export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Me</h1>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              <button className="py-4 px-1 border-b-2 border-red-500 font-medium text-sm text-gray-900 whitespace-nowrap">
                About Me
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap">
                Me as a Teacher
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap">
                My lessons & teaching style
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap">
                Resume & Certificates
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
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
            <div className="mb-6">
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

            {/* My Creations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">My creations</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">📚</span>
                  <span className="text-gray-700">Vocabulary (4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">📝</span>
                  <span className="text-gray-700">Quiz (90)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
