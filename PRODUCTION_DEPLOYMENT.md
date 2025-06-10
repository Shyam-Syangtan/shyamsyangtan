# 🚀 Production Deployment - GitHub Pages Only

## 📋 **STEP-BY-STEP DEPLOYMENT**

### **Step 1: GitHub Repository Setup**
1. Create new GitHub repository (e.g., `indian-language-tutors`)
2. Upload all your project files
3. Commit and push to `main` branch

### **Step 2: Enable GitHub Pages**
1. Go to repository **Settings**
2. Scroll to **Pages** section
3. Source: **Deploy from a branch**
4. Branch: **main**
5. Folder: **/ (root)**
6. Click **Save**

Your site will be available at:
```
https://yourusername.github.io/your-repo-name
```

### **Step 3: Update Supabase Configuration**

**In Supabase Dashboard → Authentication → URL Configuration:**

**Site URL:**
```
https://yourusername.github.io/your-repo-name
```

**Redirect URLs:**
```
https://yourusername.github.io/your-repo-name/index.html
https://yourusername.github.io/your-repo-name/find-tutors.html
```

### **Step 4: Update Google OAuth**

**In Google Cloud Console → APIs & Credentials:**

**Authorized JavaScript origins:**
```
https://yourusername.github.io
```

**Authorized redirect URIs:**
```
https://your-supabase-url.supabase.co/auth/v1/callback
```

### **Step 5: Replace Placeholders**
Replace these in your URLs:
- `yourusername` → Your actual GitHub username
- `your-repo-name` → Your actual repository name
- `your-supabase-url` → Your actual Supabase project URL

---

## ✅ **EXAMPLE WITH REAL VALUES**

If your GitHub username is `john-doe` and repository is `tutoring-app`:

**GitHub Pages URL:**
```
https://john-doe.github.io/tutoring-app
```

**Supabase Redirect URLs:**
```
https://john-doe.github.io/tutoring-app/index.html
https://john-doe.github.io/tutoring-app/find-tutors.html
```

**Google OAuth JavaScript Origins:**
```
https://john-doe.github.io
```

---

## 🧪 **TESTING CHECKLIST**

After deployment, test:
- [ ] Site loads at GitHub Pages URL
- [ ] Google login works
- [ ] Redirects to find-tutors.html after login
- [ ] Profile dropdown appears
- [ ] Tutor names display correctly
- [ ] Individual tutor profiles load
- [ ] All navigation works

---

## 🚨 **COMMON ISSUES**

### **Issue: 404 Page Not Found**
- Check repository name matches URL
- Ensure files are in root directory
- Wait 5-10 minutes for GitHub Pages to deploy

### **Issue: OAuth Login Fails**
- Verify redirect URLs match exactly
- Check Google OAuth configuration
- Clear browser cache and cookies

### **Issue: Blank Page**
- Check browser console for errors
- Verify all script files are loading
- Check Supabase configuration

---

## 🔒 **SECURITY NOTES**

- Supabase anon key is safe to expose (designed for client-side)
- Never commit service role keys
- Use Supabase RLS for data protection
- All authentication handled by Supabase + Google

---

**Your tutoring platform is ready for production! 🎉**
