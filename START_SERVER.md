# 🚀 How to Run Your Portfolio with Permanent Saving

## Quick Start (3 Steps)

### Step 1: Install Node.js (One-time only)
Download and install Node.js from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- Follow the installer instructions

### Step 2: Install Dependencies (One-time only)
Open Command Prompt in your portfolio folder and run:
```bash
npm install
```

This installs the required packages (express and cors).

### Step 3: Start the Server
Run this command:
```bash
npm start
```

You'll see:
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ✅ Portfolio Server Running!                           ║
║                                                          ║
║  🌐 URL: http://localhost:3000                          ║
║                                                          ║
║  📝 Features:                                            ║
║     - Edit content directly in browser                   ║
║     - Changes save automatically to JSON file            ║
║     - Data persists permanently                          ║
║                                                          ║
║  💡 Press Ctrl+C to stop the server                     ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### Step 4: Open Your Portfolio
Open your browser and go to:
```
http://localhost:3000
```

---

## ✅ How It Works

### Without Server (Direct File Opening)
- ❌ Can't save to JSON file
- ✅ Saves to browser localStorage (temporary)
- ✅ Works for viewing

### With Server (Recommended)
- ✅ Saves to `portfolio-data.json` permanently
- ✅ Data persists forever
- ✅ Edit and update anytime
- ✅ Professional setup

---

## 📝 Editing Your Portfolio

1. **Start the server**: `npm start`
2. **Open browser**: Go to `http://localhost:3000`
3. **Click "✏️ Edit"** button (top-right)
4. **Click any placeholder** field (like `[Your Email]`)
5. **Type your information**
6. **Press Enter** or click outside
7. **Done!** Data is saved to `portfolio-data.json` automatically

---

## 💾 Where is Data Saved?

When you edit a field, it's saved in TWO places:

1. **Browser localStorage** (temporary backup)
2. **`portfolio-data.json` file** (PERMANENT) ✅

You can open `portfolio-data.json` to see all your data:
```json
{
  "fullName": "Maria Delly Tango-an",
  "email": "maria@example.com",
  "phone": "+63 912 345 6789",
  ...
}
```

---

## 🔄 Updating Your Information

You can edit your portfolio as many times as you want:

1. Start the server: `npm start`
2. Go to `http://localhost:3000`
3. Click "✏️ Edit"
4. Update any field
5. Changes automatically save to JSON file
6. Repeat anytime!

**Every change overwrites the previous value** - your JSON file always has the latest data.

---

## 🛑 Stopping the Server

When you're done editing:
1. Go to Command Prompt where server is running
2. Press `Ctrl + C`
3. Server stops

Your data is safely saved in `portfolio-data.json`!

---

## 📁 Files Structure

```
your-portfolio/
├── portfolio.html          (Your website)
├── portfolio-data.json     (Your saved data) ✅
├── server.js              (Server code)
├── package.json           (Dependencies)
├── image/                 (Your images)
│   └── mdt.jpg
└── works/                 (Your worksheets)
    └── ...
```

---

## 🔍 Viewing Your Portfolio

### For Editing (with saving)
1. Run `npm start`
2. Visit `http://localhost:3000`
3. Click "✏️ Edit" and make changes
4. All saves to JSON file

### For Viewing Only
- Double-click `portfolio.html`
- Or drag it to your browser
- Data loads from localStorage (if available)

---

## 💡 Common Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies (first time only) |
| `npm start` | Start the server |
| `Ctrl + C` | Stop the server |

---

## ❓ Troubleshooting

### "npm is not recognized"
**Solution:** Node.js is not installed. Download from https://nodejs.org/

### "Cannot find module 'express'"
**Solution:** Run `npm install` first

### "Port 3000 is already in use"
**Solution:** 
1. Stop any other server running on port 3000
2. Or change PORT in `server.js` to 3001

### Changes not saving to JSON
**Solution:**
1. Make sure server is running (`npm start`)
2. Access via `http://localhost:3000` (not by opening file directly)
3. Check browser console (F12) for error messages

---

## 🎯 Summary

### To Edit and Save Permanently:
1. ✅ Run `npm start`
2. ✅ Go to `http://localhost:3000`
3. ✅ Edit content
4. ✅ Data saves to `portfolio-data.json` automatically

### To View Only:
1. ✅ Open `portfolio.html` directly
2. ✅ Data loads from localStorage (if available)

**Your portfolio data is now permanent and can be updated unlimited times!** 🎉
