# Supabase Migration Guide

This guide explains how to migrate your portfolio from JSON file storage to Supabase PostgreSQL database.

## ✨ What Changed?

**Before:** Portfolio data stored in `portfolio-data.json` file
**After:** Portfolio data stored in Supabase PostgreSQL database

**Important:** The frontend remains completely unchanged. The API contract is identical.

---

## 📋 Prerequisites

1. **Supabase Account**
   - Sign up at [https://supabase.com](https://supabase.com)
   - Create a new project

2. **Node.js Dependencies**
   ```bash
   npm install
   ```

---

## 🚀 Migration Steps

### Step 1: Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy these values:
   - **Project URL** (looks like: `https://xxx.supabase.co`)
   - **service_role key** (secret key - keep it private!)

### Step 2: Configure Environment Variables

Create or update the `.env` file in the project root:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=3000
```

⚠️ **Important:** Never commit `.env` to version control!

### Step 3: Set Up Database Table

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the contents of `supabase-setup.sql`
4. Paste and **Run** the SQL script

This creates:
- `portfolio` table with columns:
  - `id` (primary key)
  - `portfolio_data` (JSONB - stores the entire portfolio)
  - `updated_at` (timestamp)

### Step 4: Migrate Existing Data

Run the migration script to transfer data from `portfolio-data.json` to Supabase:

```bash
node migrate-to-supabase.js
```

You should see output like:
```
🚀 Starting migration...
✅ Successfully read portfolio data
✅ Successfully inserted into Supabase
✨ Migration completed!
```

### Step 5: Test the Server

Start your server:

```bash
npm start
```

Open your browser:
```
http://localhost:3000
```

**Test editing:**
1. Click the **✏️ Edit** button
2. Click any field to edit
3. Press Enter or click outside to save
4. Changes should save to Supabase!

---

## 🔧 API Endpoints

All endpoints remain unchanged from the original implementation:

### GET `/api/portfolio-data`
- Returns the complete portfolio JSON
- Response format is identical to the file-based version

### POST `/api/portfolio-data`
- Saves the entire portfolio
- Request body: Complete portfolio JSON
- Response: `{ success: true }`

### PATCH `/api/portfolio/personal`
- Updates only the personal section
- Request body: Partial or complete personal data

### PATCH `/api/portfolio/education`
- Updates only the education array
- Request body: Complete education array

### PATCH `/api/portfolio/skills`
- Updates only the skills array
- Request body: Complete skills array

### PATCH `/api/portfolio/works`
- Updates only the works array
- Request body: Complete works array

### PATCH `/api/portfolio/contact`
- Updates only the contact section
- Request body: Partial or complete contact data

---

## 🗄️ Database Structure

**Table:** `portfolio`

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGSERIAL | Primary key (always 1) |
| `portfolio_data` | JSONB | Complete portfolio JSON |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

**Sample `portfolio_data` structure:**
```json
{
  "personal": { ... },
  "education": [ ... ],
  "skills": [ ... ],
  "works": [ ... ],
  "contact": { ... }
}
```

---

## ✅ Benefits of Supabase Migration

1. **Persistent Storage**
   - Data survives server restarts
   - Data survives redeployments on platforms like Render, Vercel, etc.

2. **Scalability**
   - PostgreSQL database backend
   - Can handle concurrent edits

3. **Backup & Recovery**
   - Automatic backups via Supabase
   - Point-in-time recovery

4. **Real-time Capabilities**
   - Can add real-time subscriptions later
   - Multi-user support possible

5. **No File System Dependencies**
   - Works on ephemeral file systems (Docker, serverless)
   - No need for write permissions

---

## 🔍 Verification

### Check if migration succeeded:

1. **In Supabase Dashboard:**
   - Go to **Table Editor**
   - Open `portfolio` table
   - You should see one row with `id = 1`
   - Click to view `portfolio_data` (JSONB column)

2. **Via API:**
   ```bash
   curl http://localhost:3000/api/portfolio-data
   ```
   Should return your complete portfolio JSON

3. **Test editing:**
   - Open the portfolio in browser
   - Edit a field
   - Refresh Supabase table to see changes

---

## 🛠️ Troubleshooting

### Error: "Missing SUPABASE_URL environment variable"
- Ensure `.env` file exists in project root
- Check that variable names are correct (no typos)
- Restart the server after adding `.env`

### Error: "Failed to read portfolio data"
- Run `supabase-setup.sql` in Supabase SQL Editor
- Check that the `portfolio` table exists
- Verify your service role key is correct

### Error: "relation 'portfolio' does not exist"
- You haven't run the SQL setup script yet
- Go to Supabase SQL Editor and run `supabase-setup.sql`

### Error: "Failed to save portfolio data"
- Check Supabase dashboard for error logs
- Verify your service role key (not anon key)
- Check network connectivity to Supabase

### Data not persisting after deployment
- Ensure environment variables are set in your hosting platform
- Verify the deployment includes `.env` or has env vars configured
- Check server logs for connection errors

---

## 🔐 Security Notes

1. **Service Role Key:**
   - Only used on the backend
   - Never exposed to frontend
   - Keep it secret, keep it safe

2. **Row Level Security (RLS):**
   - Enabled by default in the SQL setup
   - Current policy allows all operations
   - Customize policies in Supabase dashboard for production

3. **Environment Variables:**
   - Never commit `.env` to Git
   - Use platform-specific env var management in production
   - Rotate keys if accidentally exposed

---

## 📁 Project Structure

```
portfolio/
├── config/
│   └── supabase.js           # Supabase client configuration
├── server.js                 # Express server (modified for Supabase)
├── portfolio.html            # Frontend (unchanged)
├── portfolio-data.json       # Old data (keep as backup)
├── migrate-to-supabase.js    # Migration script
├── supabase-setup.sql        # Database setup SQL
├── .env                      # Environment variables (create this)
├── .gitignore                # Ignores .env and node_modules
└── package.json              # Dependencies (updated)
```

---

## 🚢 Deployment

### Render / Railway / Fly.io

1. Push code to Git repository
2. Create new web service
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PORT` (optional, usually auto-detected)
4. Deploy!

### Vercel / Netlify (with serverless functions)

1. Convert `server.js` endpoints to serverless functions
2. Add environment variables in platform dashboard
3. Deploy

---

## 🔄 Reverting to JSON (if needed)

If you need to revert to file-based storage:

1. Keep `portfolio-data.json` as your data source
2. Replace `server.js` with the original version
3. Remove Supabase dependencies from `package.json`
4. Delete `.env` file

---

## 📞 Support

If you encounter issues:

1. Check the Supabase logs in the dashboard
2. Check server console for error messages
3. Verify environment variables are loaded correctly
4. Test Supabase connection separately

---

## 📝 Summary

- ✅ Database table created in Supabase
- ✅ Data migrated from JSON to PostgreSQL
- ✅ API endpoints remain unchanged
- ✅ Frontend works without modifications
- ✅ Data persists permanently
- ✅ Ready for production deployment

**You're all set! Your portfolio now uses Supabase as its permanent database.** 🎉
