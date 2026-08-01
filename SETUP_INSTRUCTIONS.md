# 🚀 Complete Setup Instructions

## Overview

Your portfolio has been successfully migrated from JSON file storage to Supabase PostgreSQL database. Follow these steps to get everything running.

---

## ✅ What's Already Done

- [x] Backend code updated to use Supabase
- [x] Frontend remains unchanged (no modifications needed)
- [x] Database configuration files created
- [x] Migration script prepared
- [x] Environment template created
- [x] Comprehensive documentation written

---

## 📋 Setup Checklist

### Step 1: Install Dependencies ⚙️

```bash
npm install
```

This installs:
- `@supabase/supabase-js` - Supabase client
- `dotenv` - Environment variable management
- `express`, `cors` - Existing dependencies

---

### Step 2: Create Supabase Project 🌐

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - Project name: `portfolio` (or your choice)
   - Database password: (save this securely)
   - Region: Choose closest to your users
5. Wait for project to be created (~2 minutes)

---

### Step 3: Get API Credentials 🔑

1. In Supabase dashboard, go to **Settings** (gear icon)
2. Click **API** in the left sidebar
3. Copy these two values:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **service_role key** (NOT the anon public key):
   ```
   eyJhb...
   ```

⚠️ **Important**: Use the **service_role** secret key, not the anon public key!

---

### Step 4: Configure Environment Variables 📝

Your `.env` file already exists. Update it with your credentials:

```env
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
PORT=3000
```

**Replace:**
- `your-actual-project-id` with your Supabase project URL
- `your-actual-service-role-key-here` with your service role key

---

### Step 5: Create Database Table 🗄️

1. Open Supabase dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click **"New query"**
4. Copy and paste the entire contents of `supabase-setup.sql`
5. Click **"Run"** or press Ctrl+Enter
6. You should see: "Success. No rows returned"

**Verify:**
- Go to **Table Editor**
- You should see a table named `portfolio`
- It should have 3 columns: `id`, `portfolio_data`, `updated_at`

---

### Step 6: Migrate Your Data 📦

Run the migration script to transfer data from `portfolio-data.json` to Supabase:

```bash
node migrate-to-supabase.js
```

**Expected output:**
```
🚀 Starting migration from portfolio-data.json to Supabase...

📖 Reading data from portfolio-data.json...
✅ Successfully read portfolio data from JSON file

🔍 Checking if portfolio record exists in Supabase...
📝 Inserting new portfolio record...
✅ Successfully inserted portfolio data into Supabase

🔍 Verifying migration...
✅ Migration verified successfully!

📊 Summary:
   - Personal info: ✓
   - Education entries: 4
   - Skills: 8
   - Works: 6
   - Contact info: ✓

✨ Migration completed successfully!
💡 You can now start your server with: npm start
```

**Verify in Supabase:**
1. Go to **Table Editor**
2. Click on `portfolio` table
3. You should see 1 row with `id = 1`
4. Click to expand `portfolio_data` column
5. Verify your portfolio data is there

---

### Step 7: Start the Server 🚀

```bash
npm start
```

**Expected output:**
```
Portfolio server running at http://localhost:3000
Connected to Supabase database
You can now edit your portfolio content and save changes!
```

---

### Step 8: Test Everything ✅

1. **Open browser**: `http://localhost:3000`
2. **Click Edit button** (top-right corner)
3. **Edit a field**: Click any placeholder text
4. **Type new content**
5. **Press Enter** or click outside
6. **See "Saved!" message**
7. **Refresh the page**
8. **Verify changes persisted**

**Check Supabase:**
1. Go to Supabase **Table Editor**
2. View `portfolio` table
3. Click on the row to see updated data
4. Check `updated_at` timestamp changed

---

## 🎉 Success!

If all steps completed successfully:
- ✅ Server is running
- ✅ Portfolio loads in browser
- ✅ Edit mode works
- ✅ Data saves to Supabase
- ✅ Changes persist after refresh
- ✅ Data visible in Supabase dashboard

---

## 🚢 Deployment

Once everything works locally, deploy to production:

### Render / Railway / Fly.io

1. **Push to Git:**
   ```bash
   git add .
   git commit -m "Migrate to Supabase"
   git push
   ```

2. **Create web service** on your hosting platform

3. **Add environment variables:**
   - `SUPABASE_URL` = (your project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` = (your service role key)
   - `PORT` = 3000 (optional)

4. **Deploy!**

### Environment Variable Setup by Platform

**Render:**
- Dashboard → Environment → Add Environment Variable

**Railway:**
- Project → Variables → New Variable

**Fly.io:**
```bash
fly secrets set SUPABASE_URL=https://...
fly secrets set SUPABASE_SERVICE_ROLE_KEY=ey...
```

**Vercel:**
- Project Settings → Environment Variables

---

## 🔍 Troubleshooting

### "Missing SUPABASE_URL environment variable"

**Problem**: `.env` file not found or not configured

**Solution:**
1. Ensure `.env` file exists in project root
2. Check spelling of variable names (exact case matters)
3. Restart the server after editing `.env`

---

### "Failed to read portfolio data"

**Problem**: Database table doesn't exist

**Solution:**
1. Go to Supabase SQL Editor
2. Run `supabase-setup.sql` script
3. Verify table exists in Table Editor

---

### "relation 'portfolio' does not exist"

**Problem**: SQL setup script not run

**Solution:**
- Run the SQL setup script in Supabase SQL Editor
- Check for any SQL errors in the output

---

### Migration script fails

**Problem**: Connection or data issues

**Solution:**
1. Check `.env` credentials are correct
2. Verify `portfolio-data.json` exists
3. Check Supabase project is active
4. Try copy-pasting credentials again (no extra spaces)

---

### Data not saving

**Problem**: Wrong API key or permissions

**Solution:**
1. Verify you're using **service_role** key, not anon key
2. Check Row Level Security policies in Supabase
3. Look at server console for error messages

---

### Port 3000 already in use

**Problem**: Another process using port 3000

**Solution:**
1. Stop other servers
2. Or change PORT in `.env` to 3001, 8000, etc.

---

## 📚 Additional Documentation

- **QUICKSTART.md** - Quick 5-minute setup
- **SUPABASE_MIGRATION.md** - Detailed migration guide
- **ARCHITECTURE.md** - System architecture overview
- **MIGRATION_SUMMARY.md** - Technical details
- **README_UPDATED.md** - Updated project README

---

## 🔐 Security Notes

1. **Never commit `.env`** - It's in `.gitignore` by default
2. **Service role key is secret** - Never expose to frontend
3. **Rotate keys if exposed** - In Supabase Settings → API
4. **Use platform env vars** - In production, use hosting platform's environment variable management

---

## 💡 Tips

- **Keep `portfolio-data.json`** as backup (it's not deleted)
- **Test locally first** before deploying
- **Check Supabase logs** for debugging
- **Monitor usage** in Supabase dashboard (free tier limits)
- **Enable backups** in Supabase Settings (automatic in free tier)

---

## 📞 Need Help?

1. Check server console for error messages
2. Check browser console (F12) for frontend errors
3. Check Supabase logs in dashboard
4. Verify all environment variables are set correctly
5. Re-read the documentation files

---

## ✅ Final Checklist

Before deploying to production:

- [ ] Dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] `.env` file configured with correct credentials
- [ ] Database table created (`supabase-setup.sql`)
- [ ] Data migrated successfully
- [ ] Server starts without errors
- [ ] Portfolio loads in browser
- [ ] Edit mode works
- [ ] Data saves to Supabase
- [ ] Changes persist after refresh
- [ ] Tested on localhost thoroughly

Once all checked:
- [ ] Environment variables added to hosting platform
- [ ] Code pushed to Git repository
- [ ] Deployed to production
- [ ] Production site tested
- [ ] Data persists after deployment

---

## 🎊 You're Done!

Your portfolio now has permanent cloud storage. Data will persist forever, survive all deployments, and work on any platform.

**Happy editing!** ✏️☁️
