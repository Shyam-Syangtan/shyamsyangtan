'use client';

import { useState } from 'react';

export default function LearnNepaliPage() {
  const [activeSection, setActiveSection] = useState('conversations');

  const sections = [
    { id: 'conversations', label: 'Conversations', icon: '💬' },
    { id: 'grammar', label: 'Grammar', icon: '📚' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learn Nepali</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the beautiful Nepali language through practical conversations and essential grammar. 
            Start your journey to fluency with structured lessons and real-world examples.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeSection === 'conversations' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Nepali Conversations</h2>
                
                {/* Introduction */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Why Learn Through Conversations?</h3>
                  <p className="text-blue-800">
                    Conversations are the heart of language learning. They help you understand context, 
                    cultural nuances, and practical usage of words and phrases in real-life situations.
                  </p>
                </div>

                {/* Conversation Lessons */}
                <div className="space-y-8">
                  {/* Basic Greetings */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Basic Greetings & Introductions</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">English</h4>
                          <div className="bg-gray-50 p-3 rounded">
                            <p><strong>A:</strong> Hello! How are you?</p>
                            <p><strong>B:</strong> I'm fine, thank you. And you?</p>
                            <p><strong>A:</strong> I'm good too. What's your name?</p>
                            <p><strong>B:</strong> My name is Ram. Nice to meet you.</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Nepali</h4>
                          <div className="bg-blue-50 p-3 rounded">
                            <p><strong>A:</strong> नमस्ते! तपाईं कस्तो हुनुहुन्छ?</p>
                            <p><strong>B:</strong> म ठिक छु, धन्यवाद। अनि तपाईं?</p>
                            <p><strong>A:</strong> म पनि ठिक छु। तपाईंको नाम के हो?</p>
                            <p><strong>B:</strong> मेरो नाम राम हो। तपाईंलाई भेटेर खुशी लाग्यो।</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h5 className="font-medium text-yellow-800 mb-2">Key Phrases:</h5>
                        <ul className="text-yellow-700 space-y-1">
                          <li><strong>नमस्ते (Namaste)</strong> - Hello/Goodbye</li>
                          <li><strong>तपाईं कस्तो हुनुहुन्छ? (Tapai kasto hunuhuncha?)</strong> - How are you?</li>
                          <li><strong>मेरो नाम... हो (Mero naam... ho)</strong> - My name is...</li>
                          <li><strong>धन्यवाद (Dhanyabad)</strong> - Thank you</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* At a Restaurant */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. At a Restaurant</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">English</h4>
                          <div className="bg-gray-50 p-3 rounded">
                            <p><strong>Waiter:</strong> What would you like to order?</p>
                            <p><strong>Customer:</strong> I would like dal bhat, please.</p>
                            <p><strong>Waiter:</strong> Would you like some tea?</p>
                            <p><strong>Customer:</strong> Yes, one cup of tea, please.</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Nepali</h4>
                          <div className="bg-blue-50 p-3 rounded">
                            <p><strong>वेटर:</strong> तपाईं के अर्डर गर्नुहुन्छ?</p>
                            <p><strong>ग्राहक:</strong> मलाई दालभात चाहिन्छ।</p>
                            <p><strong>वेटर:</strong> चिया खानुहुन्छ?</p>
                            <p><strong>ग्राहक:</strong> हो, एक कप चिया दिनुहोस्।</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h5 className="font-medium text-yellow-800 mb-2">Key Phrases:</h5>
                        <ul className="text-yellow-700 space-y-1">
                          <li><strong>के अर्डर गर्नुहुन्छ? (Ke order garnuhuncha?)</strong> - What would you like to order?</li>
                          <li><strong>मलाई... चाहिन्छ (Malai... chahicha)</strong> - I need/want...</li>
                          <li><strong>दालभात (Dal bhat)</strong> - Traditional Nepali meal</li>
                          <li><strong>चिया (Chiya)</strong> - Tea</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Asking for Directions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Asking for Directions</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">English</h4>
                          <div className="bg-gray-50 p-3 rounded">
                            <p><strong>Tourist:</strong> Excuse me, where is the bus station?</p>
                            <p><strong>Local:</strong> Go straight, then turn right.</p>
                            <p><strong>Tourist:</strong> How far is it?</p>
                            <p><strong>Local:</strong> It's about 10 minutes walk.</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Nepali</h4>
                          <div className="bg-blue-50 p-3 rounded">
                            <p><strong>पर्यटक:</strong> माफ गर्नुहोस्, बस स्टेशन कहाँ छ?</p>
                            <p><strong>स्थानीय:</strong> सिधा जानुहोस्, त्यसपछि दायाँ मोड्नुहोस्।</p>
                            <p><strong>पर्यटक:</strong> कति टाढा छ?</p>
                            <p><strong>स्थानीय:</strong> करिब १० मिनेट हिँड्दा पुगिन्छ।</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h5 className="font-medium text-yellow-800 mb-2">Key Phrases:</h5>
                        <ul className="text-yellow-700 space-y-1">
                          <li><strong>माफ गर्नुहोस् (Maaf garnuhos)</strong> - Excuse me</li>
                          <li><strong>कहाँ छ? (Kaha cha?)</strong> - Where is?</li>
                          <li><strong>सिधा जानुहोस् (Sidha januhoos)</strong> - Go straight</li>
                          <li><strong>दायाँ/बायाँ (Daya/Baya)</strong> - Right/Left</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practice Tips */}
                <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">💡 Practice Tips</h3>
                  <ul className="text-green-800 space-y-2">
                    <li>• Practice these conversations with a partner or in front of a mirror</li>
                    <li>• Focus on pronunciation - listen to native speakers when possible</li>
                    <li>• Start with basic conversations and gradually add more complex vocabulary</li>
                    <li>• Don't worry about perfect grammar initially - focus on communication</li>
                    <li>• Use gestures and context to help convey meaning</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'grammar' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Nepali Grammar</h2>
                
                {/* Introduction */}
                <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Understanding Nepali Grammar</h3>
                  <p className="text-purple-800">
                    Nepali grammar follows a Subject-Object-Verb (SOV) structure, different from English. 
                    Understanding these fundamental rules will help you construct proper sentences and communicate effectively.
                  </p>
                </div>

                {/* Grammar Topics */}
                <div className="space-y-8">
                  {/* Basic Sentence Structure */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Basic Sentence Structure (SOV)</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">English vs Nepali Word Order</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">English (SVO):</p>
                            <p className="font-medium">I <span className="text-blue-600">(Subject)</span> eat <span className="text-green-600">(Verb)</span> rice <span className="text-red-600">(Object)</span></p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Nepali (SOV):</p>
                            <p className="font-medium">म <span className="text-blue-600">(Subject)</span> भात <span className="text-red-600">(Object)</span> खान्छु <span className="text-green-600">(Verb)</span></p>
                            <p className="text-sm text-gray-500">Ma bhat khanchu</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">More Examples:</h5>
                          <div className="space-y-2 text-sm">
                            <div className="bg-blue-50 p-2 rounded">
                              <p><strong>English:</strong> She reads books</p>
                              <p><strong>Nepali:</strong> उनी किताब पढ्छिन्</p>
                              <p className="text-gray-600">Uni kitab padhchin</p>
                            </div>
                            <div className="bg-blue-50 p-2 rounded">
                              <p><strong>English:</strong> We drink water</p>
                              <p><strong>Nepali:</strong> हामी पानी पिउँछौं</p>
                              <p className="text-gray-600">Hami pani piuncha</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">Key Points:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Verb always comes at the end</li>
                            <li>• Object comes before the verb</li>
                            <li>• Subject can sometimes be omitted</li>
                            <li>• Adjectives come before nouns</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pronouns */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Personal Pronouns</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">English</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Nepali</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Pronunciation</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Usage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">I</td>
                            <td className="border border-gray-300 px-4 py-2">म</td>
                            <td className="border border-gray-300 px-4 py-2">Ma</td>
                            <td className="border border-gray-300 px-4 py-2">First person singular</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">You (informal)</td>
                            <td className="border border-gray-300 px-4 py-2">तिमी</td>
                            <td className="border border-gray-300 px-4 py-2">Timi</td>
                            <td className="border border-gray-300 px-4 py-2">Close friends, family</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">You (formal)</td>
                            <td className="border border-gray-300 px-4 py-2">तपाईं</td>
                            <td className="border border-gray-300 px-4 py-2">Tapai</td>
                            <td className="border border-gray-300 px-4 py-2">Respectful, strangers</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">He/She</td>
                            <td className="border border-gray-300 px-4 py-2">उनी</td>
                            <td className="border border-gray-300 px-4 py-2">Uni</td>
                            <td className="border border-gray-300 px-4 py-2">Third person (respectful)</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">We</td>
                            <td className="border border-gray-300 px-4 py-2">हामी</td>
                            <td className="border border-gray-300 px-4 py-2">Hami</td>
                            <td className="border border-gray-300 px-4 py-2">First person plural</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">They</td>
                            <td className="border border-gray-300 px-4 py-2">उनीहरू</td>
                            <td className="border border-gray-300 px-4 py-2">Uniharu</td>
                            <td className="border border-gray-300 px-4 py-2">Third person plural</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-medium text-yellow-800 mb-2">Important Note:</h5>
                      <p className="text-yellow-700 text-sm">
                        Nepali has different levels of formality. Always use "तपाईं (Tapai)" when speaking to elders, 
                        strangers, or in formal situations. Use "तिमी (Timi)" only with close friends and family.
                      </p>
                    </div>
                  </div>

                  {/* Verb Conjugation */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Basic Verb Conjugation</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">Present Tense - "To Eat" (खानु - Khanu)</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Singular</h5>
                            <div className="space-y-1 text-sm">
                              <p><strong>म खान्छु</strong> - Ma khanchu (I eat)</p>
                              <p><strong>तिमी खान्छौ</strong> - Timi khanchau (You eat - informal)</p>
                              <p><strong>तपाईं खानुहुन्छ</strong> - Tapai khanuhuncha (You eat - formal)</p>
                              <p><strong>उनी खान्छिन्/खान्छन्</strong> - Uni khanchin/khanchan (He/She eats)</p>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Plural</h5>
                            <div className="space-y-1 text-sm">
                              <p><strong>हामी खान्छौं</strong> - Hami khanchaun (We eat)</p>
                              <p><strong>तिमीहरू खान्छौ</strong> - Timiharu khanchau (You all eat)</p>
                              <p><strong>उनीहरू खान्छन्</strong> - Uniharu khanchan (They eat)</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-3">Common Verbs in Present Tense</h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p><strong>जानु (Janu)</strong> - To go</p>
                            <p>म जान्छु (Ma janchu)</p>
                          </div>
                          <div>
                            <p><strong>आउनु (Aunu)</strong> - To come</p>
                            <p>म आउँछु (Ma aunchu)</p>
                          </div>
                          <div>
                            <p><strong>बोल्नु (Bolnu)</strong> - To speak</p>
                            <p>म बोल्छु (Ma bolchu)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Numbers */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Numbers (संख्या)</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">1-10</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>१ (1)</span>
                            <span>एक (Ek)</span>
                          </div>
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>२ (2)</span>
                            <span>दुई (Dui)</span>
                          </div>
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>३ (3)</span>
                            <span>तीन (Teen)</span>
                          </div>
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>४ (4)</span>
                            <span>चार (Char)</span>
                          </div>
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>५ (5)</span>
                            <span>पाँच (Panch)</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">6-10</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>६ (6)</span>
                            <span>छ (Cha)</span>
                          </div>
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>७ (7)</span>
                            <span>सात (Saat)</span>
                          </div>
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>८ (8)</span>
                            <span>आठ (Aath)</span>
                          </div>
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>९ (9)</span>
                            <span>नौ (Nau)</span>
                          </div>
                          <div className="flex justify-between bg-gray-50 p-2 rounded">
                            <span>१० (10)</span>
                            <span>दश (Das)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">Larger Numbers:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <p><strong>२० (20)</strong> - बीस (Bees)</p>
                          <p><strong>५० (50)</strong> - पचास (Pachaas)</p>
                          <p><strong>१०० (100)</strong> - एक सय (Ek saya)</p>
                        </div>
                        <div>
                          <p><strong>१००० (1000)</strong> - एक हजार (Ek hajar)</p>
                          <p><strong>१०००० (10000)</strong> - दश हजार (Das hajar)</p>
                          <p><strong>१००००० (100000)</strong> - एक लाख (Ek lakh)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question Formation */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Forming Questions</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">Question Words</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <p><strong>के (Ke)</strong> - What</p>
                            <p><strong>कहाँ (Kaha)</strong> - Where</p>
                            <p><strong>कहिले (Kahile)</strong> - When</p>
                            <p><strong>किन (Kina)</strong> - Why</p>
                          </div>
                          <div className="space-y-2">
                            <p><strong>को (Ko)</strong> - Who</p>
                            <p><strong>कसरी (Kasari)</strong> - How</p>
                            <p><strong>कति (Kati)</strong> - How much/many</p>
                            <p><strong>कुन (Kun)</strong> - Which</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-3">Example Questions</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p><strong>तपाईंको नाम के हो?</strong></p>
                            <p className="text-blue-600">Tapaiko naam ke ho? (What is your name?)</p>
                          </div>
                          <div>
                            <p><strong>तपाईं कहाँ जानुहुन्छ?</strong></p>
                            <p className="text-blue-600">Tapai kaha januhuncha? (Where are you going?)</p>
                          </div>
                          <div>
                            <p><strong>यो कति हो?</strong></p>
                            <p className="text-blue-600">Yo kati ho? (How much is this?)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Tips */}
                <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">📖 Grammar Study Tips</h3>
                  <ul className="text-purple-800 space-y-2">
                    <li>• Start with basic sentence structure - remember SOV (Subject-Object-Verb)</li>
                    <li>• Practice verb conjugations daily with common verbs</li>
                    <li>• Learn formal vs informal speech patterns early</li>
                    <li>• Master numbers and question words for practical conversations</li>
                    <li>• Don't worry about perfect grammar initially - focus on communication</li>
                    <li>• Practice writing simple sentences using the patterns you learn</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
