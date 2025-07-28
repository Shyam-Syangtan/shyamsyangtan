export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Shyam Syangtan
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Welcome to my portfolio
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              This is a clean Next.js portfolio website ready for deployment on Vercel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
