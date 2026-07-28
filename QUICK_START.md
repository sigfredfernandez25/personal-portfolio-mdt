# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install
```bash
npm install
```

### Step 2: Start Server
```bash
npm start
```

### Step 3: Edit Your Portfolio
1. Open `http://localhost:3000` in your browser
2. Click **"✏️ Edit"** button (top-right corner)
3. Click any `[placeholder]` field
4. Type your information
5. Press **Enter** - Done! ✅

**Your changes automatically save to `portfolio-data.json`**

---

## 💡 How It Works

### Every time you edit a field:
```
1. Type your info
2. Press Enter
3. ✅ Saved to portfolio-data.json
4. ✅ Saved to localStorage (backup)
5. "Saved!" indicator appears
```

### Data persists:
- ✅ After page refresh
- ✅ After browser restart  
- ✅ After computer restart
- ✅ Forever (stored in JSON file)

---

## 📝 What Can You Edit?

36 fields total:

**Personal**
- Name, Age, Email, Phone, Address, Nationality, Teaching Philosophy

**Education**
- College, Senior High, High School, Elementary (institution, years, description)

**Skills**
- 6 skill descriptions

**Contact**
- Social links, contact message

**More**
- Section descriptions, footer message

---

## 💾 Your Data File

All your information is stored in:
```
portfolio-data.json
```

### To backup:
- Copy `portfolio-data.json` to a safe place
- That's it!

### To restore:
- Replace `portfolio-data.json` with your backup
- Refresh the page

---

## 🎯 Tips

1. **Always run the server** (`npm start`) to save changes permanently
2. **Backup regularly** - copy `portfolio-data.json` to cloud storage
3. **Press Enter or click outside** to save each field
4. **Watch for "Saved!" indicator** to confirm save
5. **Check browser console (F12)** if you see errors

---

## ❓ Troubleshooting

### Changes not saving?
→ Make sure server is running (`npm start`)

### Can't access portfolio?
→ Go to `http://localhost:3000` (not file://)

### Port 3000 busy?
→ Change PORT in `server.js` to 3001

### Data disappeared?
→ Check `portfolio-data.json` exists and has content

---

## ✨ That's It!

You now have a fully functional, auto-saving portfolio. Edit away! 🎉

Need more details? See `README.md`
