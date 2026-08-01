# Editable Portfolio - With Supabase Database

An elegant, editable portfolio website for educators with **permanent cloud database storage**.

## ✨ Features

- **Live Editing**: Click-to-edit any field directly in the browser
- **Automatic Saving**: Changes save immediately to Supabase database
- **Permanent Storage**: Data persists forever, survives all deployments
- **Cloud Database**: PostgreSQL database powered by Supabase
- **Beautiful Design**: Minimalist, elegant UI with smooth animations
- **Platform Independent**: Works on any hosting platform (Render, Vercel, Railway, etc.)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a `.env` file:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=3000
```

Get credentials from [Supabase Dashboard](https://app.supabase.com) → Settings → API

### 3. Set Up Database

In Supabase SQL Editor, run the SQL from `supabase-setup.sql`

### 4. Migrate Your Data

```bash
node migrate-to-supabase.js
```

### 5. Start the Server

```bash
npm start
```

The server will run at `http://localhost:3000`

### 6. Edit Your Portfolio

1. Open `http://localhost:3000` in your browser
2. Click the **"✏️ Edit"** button (top-right)
3. Click any field to edit
4. Press **Enter** or click outside to save
5. Changes automatically save to Supabase ✅

## 💾 How It Works

### Automatic Save
Every time you edit a field:
1. You type new information and press Enter
2. Data saves to **localStorage** (browser backup)
3. Data saves to **Supabase database** (permanent cloud storage)
4. "Saved!" indicator appears briefly
5. Done! Your data is now permanently saved in the cloud

### Data Persistence
- **Survives page refresh** ✅
- **Survives browser restart** ✅
- **Survives server restart** ✅
- **Survives redeployment** ✅
- **Survives platform migration** ✅
- **Works across different devices** ✅
- **Automatic cloud backups** ✅

## 📁 File Structure

```
portfolio/
├── config/
│   └── supabase.js          # Supabase client
├── portfolio.html           # Main website
├── server.js               # Express server (Supabase integration)
├── package.json            # Dependencies
├── .env                    # Environment variables (create this)
├── supabase-setup.sql      # Database setup
├── migrate-to-supabase.js  # Migration script
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
- Express.js server
- Supabase PostgreSQL integration
- `GET /api/portfolio-data` - Loads current data
- `POST /api/portfolio-data` - Saves new data
- `PATCH /api/portfolio/*` - Updates specific sections

### Database (Supabase)
- **Table**: `portfolio`
- **Storage**: JSONB column for flexible data structure
- **Backup**: Automatic via Supabase
- **Scaling**: Handled by PostgreSQL

### Data Flow
```
Edit Field → Save to localStorage → POST to Server → Save to Supabase Database
                  ↓                                              ↓
            Browser Backup                           Permanent Cloud Storage
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

## 🔧 API Endpoints

### GET `/api/portfolio-data`
Returns complete portfolio JSON

### POST `/api/portfolio-data`
Saves complete portfolio JSON

### PATCH `/api/portfolio/personal`
Updates personal section only

### PATCH `/api/portfolio/education`
Updates education array only

### PATCH `/api/portfolio/skills`
Updates skills array only

### PATCH `/api/portfolio/works`
Updates works array only

### PATCH `/api/portfolio/contact`
Updates contact section only

## 🛠️ Troubleshooting

### "Missing SUPABASE_URL environment variable"
**Solution**: Create `.env` file with correct credentials

### "Failed to read portfolio data"
**Solution**: Run `supabase-setup.sql` in Supabase SQL Editor

### "relation 'portfolio' does not exist"
**Solution**: You haven't created the database table yet - run the SQL setup

### Changes don't persist after deployment
**Solution**: Add environment variables to your hosting platform

## 📤 Deployment

### Render / Railway / Fly.io

1. Push code to Git repository
2. Create new web service
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PORT` (optional)
4. Deploy!

### Environment Variables in Platform

All platforms support environment variables:
- **Render**: Environment → Add variables
- **Railway**: Variables tab
- **Fly.io**: `fly secrets set`
- **Vercel**: Project Settings → Environment Variables

## 📚 Documentation

- **QUICKSTART.md** - 5-minute setup guide
- **SUPABASE_MIGRATION.md** - Comprehensive migration guide
- **MIGRATION_SUMMARY.md** - Technical overview

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
Edit `.env`:
```env
PORT=3000
```

## 🔒 Privacy & Security

- ✅ All data stored in secure Supabase cloud
- ✅ Service role key never exposed to frontend
- ✅ Row Level Security enabled
- ✅ Automatic encrypted backups
- ✅ No external tracking or analytics

## 💡 Why Supabase?

- **Permanent**: Data never disappears
- **Scalable**: PostgreSQL database
- **Reliable**: 99.9% uptime
- **Secure**: Enterprise-grade security
- **Free Tier**: Generous free tier available
- **Backups**: Automatic daily backups
- **Fast**: Global CDN and edge functions

## 📄 License

MIT License - Feel free to use and modify for your needs.

---

**Made with ❤️ for educators**

**Now with permanent cloud storage powered by Supabase** ☁️
