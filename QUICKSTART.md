# Quick Start - Supabase Migration

## 🚀 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

**Get your credentials:**
- Go to [Supabase Dashboard](https://app.supabase.com)
- Select your project
- Go to **Settings** → **API**
- Copy:
  - `Project URL`
  - `service_role` secret key

### 3. Configure Environment Variables

Update `.env` file:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=3000
```

### 4. Create Database Table

In Supabase SQL Editor, run:
```bash
# Copy and paste contents of supabase-setup.sql
```

### 5. Migrate Your Data
```bash
node migrate-to-supabase.js
```

### 6. Start Server
```bash
npm start
```

### 7. Test It!

Open browser: `http://localhost:3000`

✅ Click Edit → Change a field → It saves to Supabase!

---

## ✅ What Changed?

| Before | After |
|--------|-------|
| `portfolio-data.json` file | Supabase PostgreSQL database |
| Data lost on redeploy | Data persists permanently |
| File system required | Works on any platform |

**Frontend:** No changes needed! 🎉

---

## 📚 Need More Details?

Read the full guide: `SUPABASE_MIGRATION.md`

---

## 🆘 Quick Troubleshooting

**Server won't start?**
→ Check `.env` has correct values

**"Table doesn't exist" error?**
→ Run `supabase-setup.sql` in Supabase

**Data not saving?**
→ Verify service role key (not anon key)

**Migration failed?**
→ Check `portfolio-data.json` exists and is valid JSON
