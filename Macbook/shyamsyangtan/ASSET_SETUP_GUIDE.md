# Asset Setup Guide for Your Personal Portfolio

This guide will help you add your personal content (images, videos, etc.) to your Next.js portfolio website.

## 📁 Folder Structure

Your project has the following structure for assets:

```
public/
├── images/          # Place all your images here
├── videos/          # Place any video files here (optional)
├── favicon.ico      # Website icon (already exists)
└── ...other files
```

## 🖼️ Adding Your Profile Picture

### Step 1: Prepare Your Image
- **Recommended size**: 400x400 pixels or larger (square format)
- **Supported formats**: JPG, PNG, WebP
- **File size**: Keep under 2MB for best performance

### Step 2: Add the Image
1. Save your profile picture as `profile.jpg` or `profile.png`
2. Place it in the `public/images/` folder
3. The website will automatically use it!

**Current path expected**: `/public/images/profile.jpg`

If you use a different filename, update the `profileImage` prop in `src/app/page.tsx`:
```tsx
<ProfileSection profileImage="/images/your-filename.jpg" />
```

## 🎥 Adding YouTube Videos

### Step 1: Get Your YouTube Video ID
1. Go to your YouTube video
2. Copy the video URL (e.g., `https://www.youtube.com/watch?v=YOUR_VIDEO_ID`)
3. Extract the video ID (the part after `v=`)

### Step 2: Update the Video Component
In `src/app/page.tsx`, update the VideoSection component:
```tsx
<VideoSection 
  videoId="YOUR_ACTUAL_VIDEO_ID"
  title="Your Custom Title"
  description="Your custom description"
/>
```

### Example:
If your video URL is `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, then:
```tsx
<VideoSection videoId="dQw4w9WgXcQ" />
```

## ✏️ Customizing Your Information

### Personal Details
Edit the following in `src/app/page.tsx`:

```tsx
<ProfileSection 
  name="Your Full Name"
  rating={4.9}
  languages={["English", "Hindi", "Nepali"]}
  description="Your personal description here..."
  lessonsCount={4000}
  location="Your City, Country"
  profileImage="/images/profile.jpg"
/>
```

### Contact Information
Update your contact details:
```tsx
<ContactSection 
  email="your.email@gmail.com"
  whatsapp="+91 YOUR_PHONE_NUMBER"
/>
```

### Lesson Pricing
Customize your pricing in the LessonSection component:
```tsx
<LessonSection 
  lessonOptions={[
    { duration: 30, price: 8 },
    { duration: 45, price: 12 },
    { duration: 60, price: 16 }
  ]}
/>
```

## 🎨 Adding More Images

### For additional images (testimonials, certificates, etc.):
1. Place images in `public/images/`
2. Reference them in your components using `/images/filename.jpg`

### Example usage in components:
```tsx
<img src="/images/certificate.jpg" alt="Teaching Certificate" />
```

## 🚀 Testing Your Changes

After making changes:
1. Save all files
2. The development server will automatically reload
3. Check `http://localhost:3000` to see your changes

## 📱 Image Optimization Tips

### For best performance:
- **Profile pictures**: 400x400px, under 500KB
- **Other images**: Optimize for web (use tools like TinyPNG)
- **Format recommendations**: 
  - Photos: JPG
  - Graphics/logos: PNG
  - Modern browsers: WebP

## 🔧 Common Issues & Solutions

### Profile image not showing?
1. Check the file path: `public/images/profile.jpg`
2. Ensure the filename matches exactly (case-sensitive)
3. Clear browser cache and refresh

### Video not loading?
1. Verify the YouTube video ID is correct
2. Ensure the video is public (not private/unlisted)
3. Check your internet connection

### Changes not appearing?
1. Save all files
2. Check the terminal for any errors
3. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)

## 📝 Next Steps

1. **Add your profile picture** to `public/images/profile.jpg`
2. **Update your YouTube video ID** in the VideoSection
3. **Customize your personal information** in the ProfileSection
4. **Update contact details** in the ContactSection
5. **Adjust pricing** if needed in the LessonSection

## 🆘 Need Help?

If you encounter any issues:
1. Check the browser console for errors (F12 → Console)
2. Verify all file paths are correct
3. Ensure all required files are in the right locations

Your website is now ready for customization! 🎉
