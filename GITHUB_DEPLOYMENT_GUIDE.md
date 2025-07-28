# 🚀 GitHub Deployment Guide - TutorConnect

## 📋 **OVERVIEW**
This guide covers deploying your TutorConnect app to GitHub Pages and configuring it for production.

---

## 🔧 **BACKEND CHANGES (Supabase)**

### **1. Update Redirect URLs**
In Supabase Dashboard → Authentication → URL Configuration:

**Add these to "Redirect URLs" (Production Only):**
```
https://yourusername.github.io/your-repo-name/index.html
https://yourusername.github.io/your-repo-name/find-tutors.html
```

**Replace:**
- `yourusername` with your GitHub username
- `your-repo-name` with your repository name

### **2. Update Google OAuth**
In Google Cloud Console → APIs & Credentials:

**Add to "Authorized redirect URIs":**
```
https://your-supabase-url.supabase.co/auth/v1/callback
```

**Add to "Authorized JavaScript origins":**
```
https://yourusername.github.io
```

### **3. Site URL Configuration**
In Supabase Dashboard → Authentication → URL Configuration:

**Set "Site URL" to:**
```
https://yourusername.github.io/your-repo-name
```

---

## 💻 **CODE CHANGES**

### **1. Update Supabase Configuration**
You'll need to make your Supabase credentials environment-specific.

### **2. Fix Relative Paths**
GitHub Pages serves from a subdirectory, so you may need to update paths.

### **3. Add GitHub Pages Configuration**
Create necessary files for GitHub Pages deployment.

---

## 📁 **DEPLOYMENT STEPS**

### **Step 1: Prepare Repository**
1. Create new GitHub repository
2. Clone to local machine
3. Copy all your project files
4. Commit and push

### **Step 2: Enable GitHub Pages**
1. Go to repository Settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Select "/ (root)" folder
6. Click "Save"

### **Step 3: Update Configuration**
Update your Supabase settings with the new GitHub Pages URL.

### **Step 4: Test Deployment**
Visit your GitHub Pages URL and test all functionality.

---

## 🔒 **SECURITY CONSIDERATIONS**

### **Environment Variables**
- Supabase URL and anon key are safe to expose (they're designed for client-side use)
- Never commit service role keys or private keys
- Use Supabase RLS (Row Level Security) for data protection

### **Domain Security**
- Configure CORS properly in Supabase
- Set up proper redirect URL validation
- Use HTTPS only in production

---

## 🧪 **TESTING CHECKLIST**

After deployment, test:
- [ ] Landing page loads correctly
- [ ] Google OAuth login works
- [ ] Redirects to find-tutors.html after login
- [ ] Profile dropdown appears and works
- [ ] Tutor cards display with correct names
- [ ] Individual tutor profiles load
- [ ] All navigation links work
- [ ] Mobile responsiveness

---

## 🚨 **COMMON ISSUES & FIXES**

### **Issue: 404 on GitHub Pages**
- Check file names match exactly (case-sensitive)
- Ensure index.html is in root directory
- Verify GitHub Pages is enabled

### **Issue: OAuth Redirect Fails**
- Double-check redirect URLs in both Supabase and Google Console
- Ensure URLs match exactly (including https://)
- Clear browser cache and cookies

### **Issue: Supabase Connection Fails**
- Verify Supabase URL and anon key are correct
- Check CORS settings in Supabase
- Ensure site URL is configured properly

---

## 📝 **NEXT STEPS**

1. **Custom Domain** (Optional)
   - Purchase domain
   - Configure DNS
   - Update all redirect URLs

2. **Performance Optimization**
   - Minify CSS/JS
   - Optimize images
   - Add caching headers

3. **Monitoring**
   - Set up error tracking
   - Monitor Supabase usage
   - Track user analytics

---

## 🔗 **USEFUL LINKS**

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

---

**Ready to deploy your tutoring platform! 🎉**
