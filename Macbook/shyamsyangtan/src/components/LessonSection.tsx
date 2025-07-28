interface LessonOption {
  duration: number;
  price: number;
}

interface PaymentMethod {
  name: string;
  description: string;
  icon: string;
}

interface LessonSectionProps {
  lessonOptions?: LessonOption[];
  paymentMethods?: PaymentMethod[];
}

export default function LessonSection({
  lessonOptions = [
    { duration: 30, price: 8 },
    { duration: 45, price: 12 },
    { duration: 60, price: 16 }
  ],
  paymentMethods = [
    { name: "PayPal", description: "For international students", icon: "paypal" },
    { name: "Google Pay", description: "Fast and secure payments", icon: "googlepay" },
    { name: "UPI", description: "Instant bank transfers (India)", icon: "upi" },
    { name: "Bank Transfer", description: "Direct bank transfer available", icon: "bank" }
  ]
}: LessonSectionProps) {
  return (
    <div className="space-y-6">
      {/* Lesson Duration & Pricing */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lesson Duration & Pricing
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lessonOptions.map((option, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg p-4 text-center hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                {option.duration} min
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-2">
                ${option.price}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                per lesson
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Accepted Payment Methods
          </span>
        </h2>
        
        <div className="space-y-3">
          {paymentMethods.map((method, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {method.icon === 'paypal' && (
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.926-.79l.04-.207 .776-4.906.05-.266a.926.926 0 0 1 .926-.79h.582c3.64 0 6.493-1.473 7.32-5.738.345-1.787.166-3.278-.81-4.386z"/>
                  </svg>
                )}
                {method.icon === 'googlepay' && (
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.007 2.001c5.518 0 9.998 4.48 9.998 9.998s-4.48 9.998-9.998 9.998S2.009 17.517 2.009 11.999 6.489 2.001 12.007 2.001zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.498-3.808 8.498-8.498-3.808-8.498-8.498-8.498zm-1.186 6.51h4.31c.083 0 .15.067.15.15v.6c0 .083-.067.15-.15.15h-4.31c-.083 0-.15-.067-.15-.15v-.6c0-.083.067-.15.15-.15zm0 1.8h4.31c.083 0 .15.067.15.15v.6c0 .083-.067.15-.15.15h-4.31c-.083 0-.15-.067-.15-.15v-.6c0-.083.067-.15.15-.15z"/>
                  </svg>
                )}
                {method.icon === 'upi' && (
                  <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
                {method.icon === 'bank' && (
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{method.name}</div>
                <div className="text-sm text-gray-600">{method.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
