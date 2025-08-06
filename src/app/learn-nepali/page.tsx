'use client';

import { useState } from 'react';

export default function LearnNepaliPage() {
  const [activeSection, setActiveSection] = useState('conversations');

  const sections = [
    { id: 'conversations', label: 'Conversations', icon: '💬' },
    { id: 'grammar', label: 'Grammar', icon: '📚' },
    { id: 'vocabulary', label: 'Vocabulary', icon: '📖' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">


        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex items-center space-x-1 sm:space-x-2 ${
                    activeSection === section.id
                      ? 'border-blue-500 text-black'
                      : 'border-transparent text-black hover:text-blue-600 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base sm:text-lg">{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {activeSection === 'conversations' && (
              <div>

                {/* Conversation Lessons */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Basic Greetings */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-xl font-semibold text-black mb-4">1. Basic Greetings & Introductions</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h4 className="font-medium text-black mb-2">English</h4>
                          <div className="bg-gray-50 p-3 sm:p-4 rounded">
                            <p><strong>A:</strong> Hello! How are you?</p>
                            <p><strong>B:</strong> I'm fine, thank you. And you?</p>
                            <p><strong>A:</strong> I'm good too. What's your name?</p>
                            <p><strong>B:</strong> My name is Ram. Nice to meet you.</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-black mb-2">Nepali</h4>
                          <div className="bg-blue-50 p-3 sm:p-4 rounded">
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
                    <h3 className="text-xl font-semibold text-black mb-4">2. At a Restaurant</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h4 className="font-medium text-black mb-2">English</h4>
                          <div className="bg-gray-50 p-3 sm:p-4 rounded">
                            <p><strong>Waiter:</strong> What would you like to order?</p>
                            <p><strong>Customer:</strong> I would like dal bhat, please.</p>
                            <p><strong>Waiter:</strong> Would you like some tea?</p>
                            <p><strong>Customer:</strong> Yes, one cup of tea, please.</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-black mb-2">Nepali</h4>
                          <div className="bg-blue-50 p-3 sm:p-4 rounded">
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
                    <h3 className="text-xl font-semibold text-black mb-4">3. Asking for Directions</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h4 className="font-medium text-black mb-2">English</h4>
                          <div className="bg-gray-50 p-3 sm:p-4 rounded">
                            <p><strong>Tourist:</strong> Excuse me, where is the bus station?</p>
                            <p><strong>Local:</strong> Go straight, then turn right.</p>
                            <p><strong>Tourist:</strong> How far is it?</p>
                            <p><strong>Local:</strong> It's about 10 minutes walk.</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-black mb-2">Nepali</h4>
                          <div className="bg-blue-50 p-3 sm:p-4 rounded">
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


                {/* Grammar Topics */}
                <div className="space-y-8">
                  {/* Basic Sentence Structure */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-4">1. Basic Sentence Structure (SOV)</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-black mb-3">English vs Nepali Word Order</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-black">English (SVO):</p>
                            <p className="font-medium">I <span className="text-blue-600">(Subject)</span> eat <span className="text-green-600">(Verb)</span> rice <span className="text-red-600">(Object)</span></p>
                          </div>
                          <div>
                            <p className="text-sm text-black">Nepali (SOV):</p>
                            <p className="font-medium">म <span className="text-blue-600">(Subject)</span> भात <span className="text-red-600">(Object)</span> खान्छु <span className="text-green-600">(Verb)</span></p>
                            <p className="text-sm text-black">Ma bhat khanchu</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h5 className="font-medium text-black mb-2">More Examples:</h5>
                          <div className="space-y-2 text-sm">
                            <div className="bg-blue-50 p-2 rounded">
                              <p><strong>English:</strong> She reads books</p>
                              <p><strong>Nepali:</strong> उनी किताब पढ्छिन्</p>
                              <p className="text-black">Uni kitab padhchin</p>
                            </div>
                            <div className="bg-blue-50 p-2 rounded">
                              <p><strong>English:</strong> We drink water</p>
                              <p><strong>Nepali:</strong> हामी पानी पिउँछौं</p>
                              <p className="text-black">Hami pani piuncha</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-black mb-2">Key Points:</h5>
                          <ul className="text-sm text-black space-y-1">
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
                    <h3 className="text-xl font-semibold text-black mb-4">2. Personal Pronouns</h3>
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
                    <h3 className="text-xl font-semibold text-black mb-4">3. Basic Verb Conjugation</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-black mb-3">Present Tense - "To Eat" (खानु - Khanu)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <h5 className="text-sm font-medium text-black mb-2">Singular</h5>
                            <div className="space-y-1 text-sm">
                              <p><strong>म खान्छु</strong> - Ma khanchu (I eat)</p>
                              <p><strong>तिमी खान्छौ</strong> - Timi khanchau (You eat - informal)</p>
                              <p><strong>तपाईं खानुहुन्छ</strong> - Tapai khanuhuncha (You eat - formal)</p>
                              <p><strong>उनी खान्छिन्/खान्छन्</strong> - Uni khanchin/khanchan (He/She eats)</p>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-black mb-2">Plural</h5>
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
                    <h3 className="text-xl font-semibold text-black mb-4">4. Numbers (संख्या)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="font-medium text-black mb-3">1-10</h4>
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
                        <h4 className="font-medium text-black mb-3">6-10</h4>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm text-green-700">
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
                    <h3 className="text-xl font-semibold text-black mb-4">5. Forming Questions</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-black mb-3">Question Words</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
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

            {activeSection === 'vocabulary' && (
              <div>



                {/* Vocabulary Categories */}
                <div className="space-y-8">
                  {/* Family Members */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-4">👨‍👩‍👧‍👦 Family Members (परिवार)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Father</span>
                            <span className="text-blue-600">बुवा (Buwa)</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Mother</span>
                            <span className="text-blue-600">आमा (Aama)</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Brother</span>
                            <span className="text-blue-600">दाजु/भाइ (Daju/Bhai)</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Sister</span>
                            <span className="text-blue-600">दिदी/बहिनी (Didi/Bahini)</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Grandfather</span>
                            <span className="text-blue-600">हजुरबुवा (Hajurbuwa)</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Grandmother</span>
                            <span className="text-blue-600">हजुरआमा (Hajuraama)</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Son</span>
                            <span className="text-blue-600">छोरा (Chhora)</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Daughter</span>
                            <span className="text-blue-600">छोरी (Chhori)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Example:</strong> मेरो बुवाको नाम राम हो। (Mero buwako naam Ram ho.) - My father's name is Ram.
                      </p>
                    </div>
                  </div>

                  {/* Food & Drinks */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-4">🍽️ Food & Drinks (खाना र पेय)</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-black mb-2">Staple Foods</h4>
                        <div className="space-y-2 text-sm">
                          <div className="bg-orange-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Rice</span>
                              <span className="text-orange-600">भात (Bhat)</span>
                            </div>
                          </div>
                          <div className="bg-orange-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Lentils</span>
                              <span className="text-orange-600">दाल (Dal)</span>
                            </div>
                          </div>
                          <div className="bg-orange-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Bread</span>
                              <span className="text-orange-600">रोटी (Roti)</span>
                            </div>
                          </div>
                          <div className="bg-orange-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Vegetables</span>
                              <span className="text-orange-600">तरकारी (Tarkari)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-black mb-2">Fruits</h4>
                        <div className="space-y-2 text-sm">
                          <div className="bg-red-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Apple</span>
                              <span className="text-red-600">स्याउ (Syau)</span>
                            </div>
                          </div>
                          <div className="bg-red-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Banana</span>
                              <span className="text-red-600">केरा (Kera)</span>
                            </div>
                          </div>
                          <div className="bg-red-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Orange</span>
                              <span className="text-red-600">सुन्तला (Suntala)</span>
                            </div>
                          </div>
                          <div className="bg-red-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Mango</span>
                              <span className="text-red-600">आँप (Aamp)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-black mb-2">Drinks</h4>
                        <div className="space-y-2 text-sm">
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Water</span>
                              <span className="text-blue-600">पानी (Pani)</span>
                            </div>
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Tea</span>
                              <span className="text-blue-600">चिया (Chiya)</span>
                            </div>
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Milk</span>
                              <span className="text-blue-600">दूध (Dudh)</span>
                            </div>
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="flex justify-between">
                              <span>Coffee</span>
                              <span className="text-blue-600">कफी (Coffee)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Example:</strong> म चिया खान्छु। (Ma chiya khanchu.) - I drink tea.
                      </p>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-4">🎨 Colors (रंगहरू)</h3>
                    <div className="grid md:grid-cols-4 gap-3">
                      <div className="bg-red-100 border-2 border-red-300 p-3 rounded-lg text-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                        <p className="font-medium">Red</p>
                        <p className="text-sm text-red-700">रातो (Rato)</p>
                      </div>
                      <div className="bg-blue-100 border-2 border-blue-300 p-3 rounded-lg text-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="font-medium">Blue</p>
                        <p className="text-sm text-blue-700">नीलो (Nilo)</p>
                      </div>
                      <div className="bg-green-100 border-2 border-green-300 p-3 rounded-lg text-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                        <p className="font-medium">Green</p>
                        <p className="text-sm text-green-700">हरियो (Hariyo)</p>
                      </div>
                      <div className="bg-yellow-100 border-2 border-yellow-300 p-3 rounded-lg text-center">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                        <p className="font-medium">Yellow</p>
                        <p className="text-sm text-yellow-700">पहेंलो (Pahelo)</p>
                      </div>
                      <div className="bg-purple-100 border-2 border-purple-300 p-3 rounded-lg text-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
                        <p className="font-medium">Purple</p>
                        <p className="text-sm text-purple-700">बैजनी (Baijani)</p>
                      </div>
                      <div className="bg-pink-100 border-2 border-pink-300 p-3 rounded-lg text-center">
                        <div className="w-8 h-8 bg-pink-500 rounded-full mx-auto mb-2"></div>
                        <p className="font-medium">Pink</p>
                        <p className="text-sm text-pink-700">गुलाबी (Gulabi)</p>
                      </div>
                      <div className="bg-gray-100 border-2 border-gray-300 p-3 rounded-lg text-center">
                        <div className="w-8 h-8 bg-black rounded-full mx-auto mb-2"></div>
                        <p className="font-medium">Black</p>
                        <p className="text-sm text-black">कालो (Kalo)</p>
                      </div>
                      <div className="bg-gray-50 border-2 border-gray-300 p-3 rounded-lg text-center">
                        <div className="w-8 h-8 bg-white border border-gray-400 rounded-full mx-auto mb-2"></div>
                        <p className="font-medium">White</p>
                        <p className="text-sm text-black">सेतो (Seto)</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Example:</strong> मेरो मनपर्ने रंग नीलो हो। (Mero manparne rang nilo ho.) - My favorite color is blue.
                      </p>
                    </div>
                  </div>

                  {/* Common Verbs */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-4">⚡ Common Verbs (क्रियाहरू)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">To eat</span>
                            <span className="text-indigo-600">खानु (Khanu)</span>
                          </div>
                          <p className="text-xs text-indigo-700">म खान्छु (Ma khanchu) - I eat</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">To drink</span>
                            <span className="text-indigo-600">पिउनु (Piunu)</span>
                          </div>
                          <p className="text-xs text-indigo-700">म पिउँछु (Ma piunchu) - I drink</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">To go</span>
                            <span className="text-indigo-600">जानु (Janu)</span>
                          </div>
                          <p className="text-xs text-indigo-700">म जान्छु (Ma janchu) - I go</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">To come</span>
                            <span className="text-indigo-600">आउनु (Aunu)</span>
                          </div>
                          <p className="text-xs text-indigo-700">म आउँछु (Ma aunchu) - I come</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">To see</span>
                            <span className="text-indigo-600">हेर्नु (Hernu)</span>
                          </div>
                          <p className="text-xs text-indigo-700">म हेर्छु (Ma herchu) - I see</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">To speak</span>
                            <span className="text-indigo-600">बोल्नु (Bolnu)</span>
                          </div>
                          <p className="text-xs text-indigo-700">म बोल्छु (Ma bolchu) - I speak</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">To read</span>
                            <span className="text-indigo-600">पढ्नु (Padhnu)</span>
                          </div>
                          <p className="text-xs text-indigo-700">म पढ्छु (Ma padhchu) - I read</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">To write</span>
                            <span className="text-indigo-600">लेख्नु (Lekhnu)</span>
                          </div>
                          <p className="text-xs text-indigo-700">म लेख्छु (Ma lekhchu) - I write</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vocabulary Tips */}
                <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">💡 Vocabulary Learning Tips</h3>
                  <ul className="text-green-800 space-y-2">
                    <li>• Learn 5-10 new words daily and review them regularly</li>
                    <li>• Practice using new vocabulary in simple sentences</li>
                    <li>• Group related words together (like family members or colors)</li>
                    <li>• Use flashcards or spaced repetition apps for better retention</li>
                    <li>• Try to use new words in conversations as soon as possible</li>
                    <li>• Focus on high-frequency words that you'll use most often</li>
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
