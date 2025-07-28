# Shyam Syangtan - Personal Portfolio Website

A professional portfolio website for language teaching services, built with Next.js and Tailwind CSS.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional Layout**: Clean, modern design matching the reference provided
- **Interactive Components**: Contact buttons, navigation, and hover effects
- **SEO Optimized**: Proper meta tags and structured content
- **Fast Performance**: Built with Next.js for optimal loading speeds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shyam-Syangtan/shyamsyangtan.git
   cd shyamsyangtan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── public/
│   ├── images/          # Your profile pictures and images
│   └── videos/          # Video files (optional)
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── page.tsx     # Home page
│   │   ├── layout.tsx   # Root layout
│   │   ├── ebooks/      # Ebooks page
│   │   └── contact/     # Contact page
│   └── components/      # Reusable components
│       ├── Header.tsx
│       ├── ProfileSection.tsx
│       ├── VideoSection.tsx
│       ├── ContactSection.tsx
│       └── LessonSection.tsx
├── ASSET_SETUP_GUIDE.md # Guide for adding your content
└── DEPLOYMENT_GUIDE.md  # Deployment instructions
```

## 🎨 Customization

### 1. Add Your Profile Picture
- Place your photo in `public/images/profile.jpg`
- Recommended size: 400x400 pixels

### 2. Update Your Information
Edit the content in `src/app/page.tsx`:
- Name and description
- Contact details (email, WhatsApp)
- Lesson pricing
- Languages taught

### 3. Add Your YouTube Video
Replace the video ID in the VideoSection component with your actual YouTube video ID.

📖 **For detailed customization instructions, see [ASSET_SETUP_GUIDE.md](./ASSET_SETUP_GUIDE.md)**

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. **Push to GitHub** (already connected)
2. **Automatic deployment** via Vercel
3. **Custom domain** setup (optional)

📖 **For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vercel](https://vercel.com/)** - Deployment platform

## 📱 Pages

- **Home** (`/`) - Main portfolio page with profile, video, contact, and pricing
- **Ebooks** (`/ebooks`) - Educational resources (placeholder)
- **Contact** (`/contact`) - Dedicated contact page with additional information

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📞 Support

If you need help with customization or deployment:
1. Check the guides: `ASSET_SETUP_GUIDE.md` and `DEPLOYMENT_GUIDE.md`
2. Review the component files for examples
3. Test changes locally before deploying

## 📄 License

This project is created for personal portfolio use.

---

**Ready to make it yours?** Follow the [Asset Setup Guide](./ASSET_SETUP_GUIDE.md) to add your personal content!
