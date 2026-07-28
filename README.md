# Editable Portfolio - With Automatic JSON Persistence

An elegant, editable portfolio website for educators with **automatic data saving** to JSON files.

## ✨ Features

- **Live Editing**: Click-to-edit any field directly in the browser
- **Automatic Saving**: Changes save immediately to `portfolio-data.json`
- **Persistent Storage**: Data survives browser restarts and cache clearing
- **No Database Required**: Simple file-based storage
- **Beautiful Design**: Minimalist, elegant UI with smooth animations

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

The server will run at `http://localhost:3000`

### 3. Edit Your Portfolio

1. Open `http://localhost:3000` in your browser
2. Click the **"✏️ Edit"** button (top-right)
3. Click any placeholder field like `[Your Email]`
4. Type your information
5. Press **Enter** or click outside to save
6. Changes automatically save to `portfolio-data.json` ✅

## 💾 How It Works

### Automatic Save
Every time you edit a field:
1. You type new information and press Enter
2. Data saves to **localStorage** (browser backup)
3. Data saves to **portfolio-data.json** (permanent file)
4. "Saved!" indicator appears briefly
5. Done! Your data is now permanently saved

### Data Persistence
- **Survives page refresh** ✅
- **Survives browser restart** ✅
- **Survives cache clearing** ✅
- **Can be backed up** (just copy `portfolio-data.json`) ✅
- **Works across different devices** (copy the JSON file) ✅

## 📁 File Structure

```
portfolio/
├── portfolio.html           # Main website (single-page app)
├── portfolio-data.json      # Your data (auto-updated when you edit)
├── server.js               # Express server
├── package.json            # Dependencies
├── image/                  # Profile images
│   └── mdt.jpg
└── works/                  # Worksheets & materials
    ├── *.pdf
    └── *.png
```

## 🎯 Technical Details

### Frontend (portfolio.html)
- Displays your portfolio with all content
- Inline editing system for quick updates
- Fetches data from server API on load
- Posts updates to server API on each edit

### Backend (server.js)
- Express.js server on port 3000
- `GET /api/portfolio-data` - Loads current data
- `POST /api/portfolio-data` - Saves new data
- Validates data structure before saving

### Data Flow
```
Edit Field → Save to localStorage → POST to Server → Update portfolio-data.json
                  ↓                                              ↓
            Browser Backup                              Permanent Storage
```

## 📝 Editable Fields (36 Total)

### Personal Info (7 fields)
- Name, Age, Address, Email, Phone, Nationality, Teaching Philosophy

### Education (9 fields)
- Section description
- College, Senior High, High School, Elementary (each: Years, Institution, Description)

### Skills (7 fields)
- Skills intro + 6 skill descriptions

### Works (1 field)
- Works section description

### Contact (6 fields)
- Contact message + Email, Phone, Address, Facebook, LinkedIn

### Footer (1 field)
- Closing message

## 🔧 Server Requirements

### To Edit with Automatic Saving:
✅ Server must be running (`npm start`)
✅ Access via `http://localhost:3000`
✅ Changes auto-save to `portfolio-data.json`

### View Only (Without Server):
- Open `portfolio.html` directly in browser
- Data loads from localStorage if available
- No permanent saving to JSON file

## 🛠️ Troubleshooting

### "Failed to save to server" error
**Solution**: Make sure the server is running with `npm start`

### Changes don't persist after closing browser
**Solution**: Run with the server (`npm start`) instead of opening the file directly

### Data not loading
**Solution**: 
1. Check that `portfolio-data.json` exists
2. Verify server is running
3. Check browser console (F12) for errors

### Port 3000 already in use
**Solution**: Change the PORT in `server.js` or stop other processes using port 3000

## 📤 Backup Strategy

**Recommended Approach:**

1. **Regular backups**: Copy `portfolio-data.json` to a safe location
2. **Cloud storage**: Store copies in Google Drive, Dropbox, etc.
3. **Version control**: Use git to track changes over time
4. **Multiple locations**: Keep backups on external drives

To backup:
```bash
# Copy the JSON file to a backup location
copy portfolio-data.json backup/portfolio-data-2024-01-15.json
```

To restore:
```bash
# Replace current file with backup
copy backup/portfolio-data-2024-01-15.json portfolio-data.json
```

## 🎨 Customization

### Update Colors
Edit CSS variables in `portfolio.html`:
```css
:root {
    --primary-white: #FFFFFF;
    --secondary-rose: #F8F1F1;
    --accent-blush: #F4EAEA;
    --text-dark: #333333;
    --border-color: #ECECEC;
}
```

### Change Server Port
Edit `server.js`:
```javascript
const PORT = 3000; // Change to desired port
```

## 📚 Documentation

See additional guides:
- `EDITABLE_FIELDS_GUIDE.md` - Complete list of editable fields
- `START_SERVER.md` - Server setup guide

## 🔒 Privacy

- ✅ All data stored locally on your computer
- ✅ No external servers or databases
- ✅ Complete control over your data
- ✅ No tracking or analytics

## 📄 License

MIT License - Feel free to use and modify for your needs.

---

**Made with ❤️ for educators**
