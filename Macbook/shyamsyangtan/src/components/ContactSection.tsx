'use client';

interface ContactSectionProps {
  email?: string;
  whatsapp?: string;
  italki?: string;
}

export default function ContactSection({
  email = "shyamsyangtan01@gmail.com",
  whatsapp = "+91 90342 79958",
  italki = "https://www.italki.com/en/teacher/9627036"
}: ContactSectionProps) {
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = whatsapp.replace(/\s+/g, '').replace(/\+/g, '');
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleITalkiClick = () => {
    window.open(italki, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
      
      <div className="space-y-4">
        {/* Email */}
        <div 
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors group"
          onClick={handleEmailClick}
        >
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
              Email
            </div>
            <div className="text-sm text-blue-600 group-hover:text-blue-700">
              {email}
            </div>
          </div>
          <div className="flex-shrink-0">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>

        {/* WhatsApp */}
        <div 
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-colors group"
          onClick={handleWhatsAppClick}
        >
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 group-hover:text-green-700">
              WhatsApp
            </div>
            <div className="text-sm text-green-600 group-hover:text-green-700">
              {whatsapp}
            </div>
          </div>
          <div className="flex-shrink-0">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>

        {/* iTalki */}
        <div
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors group"
          onClick={handleITalkiClick}
        >
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
              iTalki Profile
            </div>
            <div className="text-sm text-blue-600 group-hover:text-blue-700">
              Book lessons on iTalki
            </div>
          </div>
          <div className="flex-shrink-0">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Please contact me directly to schedule lessons and arrange payment
        </p>
      </div>
    </div>
  );
}
