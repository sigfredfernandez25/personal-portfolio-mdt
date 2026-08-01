# Quick Reference

## Essential Commands

```bash
# Install dependencies
npm install

# Run migration (one time)
node migrate-to-supabase.js

# Start server
npm start

# Development mode (auto-restart)
npm run dev
```

---

## Files You Need to Edit

### 1. `.env` (Required)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3000
```

### 2. Supabase SQL Editor (One time)
- Copy/paste contents of `supabase-setup.sql`
- Run it

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/portfolio-data` | Get all data |
| POST | `/api/portfolio-data` | Save all data |
| PATCH | `/api/portfolio/personal` | Update personal only |
| PATCH | `/api/portfolio/education` | Update education only |
| PATCH | `/api/portfolio/skills` | Update skills only |
| PATCH | `/api/portfolio/works` | Update works only |
| PATCH | `/api/portfolio/contact` | Update contact only |

---

## Database Info

**Table:** `portfolio`

**Columns:**
- `id` - Always 1 (primary key)
- `portfolio_data` - JSONB with all portfolio data
- `updated_at` - Timestamp of last update

**Location:** Your Supabase project

---

## Common Tasks

### View your data in Supabase:
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Click `portfolio` table
4. Click the row to expand `portfolio_data`

### Test the API:
```bash
# Get data
curl http://localhost:3000/api/portfolio-data

# Save data
curl -X POST http://localhost:3000/api/portfolio-data \
  -H "Content-Type: application/json" \
  -d @portfolio-data.json
```

### Edit portfolio:
1. Open `http://localhost:3000`
2. Click ✏️ Edit button
3. Click any field
4. Type changes
5. Press Enter or click outside

---

## Troubleshooting One-Liners

```bash
# Check if .env is loaded
node -e "require('dotenv').config(); console.log(process.env.SUPABASE_URL)"

# Test Supabase connection
node -e "require('./config/supabase')"

# Check if table exists (in Supabase SQL Editor)
SELECT * FROM portfolio;

# View server logs
npm start
# Then check console output
```

---

## File Structure

```
portfolio/
├── config/supabase.js          # DB connection
├── server.js                   # API server
├── portfolio.html              # Frontend (unchanged)
├── .env                        # Your credentials
├── migrate-to-supabase.js      # Data migration
└── supabase-setup.sql          # DB schema
```

---

## Environment Variables by Platform

**Local (.env file):**
```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

**Render:**
- Dashboard → Environment → Add Variable

**Railway:**
- Project → Variables → New Variable

**Vercel:**
- Project Settings → Environment Variables

**Fly.io:**
```bash
fly secrets set SUPABASE_URL=...
fly secrets set SUPABASE_SERVICE_ROLE_KEY=...
```

---

## Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] Using service_role key (not anon key)
- [ ] Service role key never in frontend code
- [ ] Row Level Security enabled in Supabase
- [ ] Environment variables set in production platform

---

## Documentation Files

- **SETUP_INSTRUCTIONS.md** - Complete setup guide
- **QUICKSTART.md** - 5-minute guide
- **TROUBLESHOOTING.md** - Error solutions
- **ARCHITECTURE.md** - System design
- **MIGRATION_SUMMARY.md** - What changed
- **This file** - Quick reference

---

## Support Resources

- Supabase Docs: https://supabase.com/docs
- Express Docs: https://expressjs.com
- Node.js Docs: https://nodejs.org/docs

---

## Version Info

- Node.js: v14+ required
- Express: v4.18.2
- Supabase JS: v2.111.0
- PostgreSQL: 15+ (via Supabase)
