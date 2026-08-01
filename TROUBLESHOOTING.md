# Troubleshooting Guide

## Common Errors and Solutions

### Error: PGRST116 - Cannot coerce the result to a single JSON object

**Full Error:**
```
Supabase error: {
  code: 'PGRST116',
  details: 'The result contains 0 rows',
  hint: null,
  message: 'Cannot coerce the result to a single JSON object'
}
```

**What it means:** The database table exists but has no data (0 rows).

**Solution:**

This has been **fixed** in the updated code. The server now uses:
- `maybeSingle()` instead of `single()` - handles 0 rows gracefully
- `upsert()` instead of `update()` - inserts if row doesn't exist

**Steps to resolve:**

1. **Pull the latest code changes**
   - `server.js` now uses `maybeSingle()` and `upsert()`
   - `migrate-to-supabase.js` now uses `maybeSingle()`

2. **Restart your server:**
   ```bash
   npm start
   ```

3. **Two options to populate data:**

   **Option A: Run migration script**
   ```bash
   node migrate-to-supabase.js
   ```
   This will insert data from `portfolio-data.json` into Supabase.

   **Option B: Use the portfolio directly**
   - Open `http://localhost:3000`
   - Click Edit button
   - Make any change
   - Save it
   - The first save will create the row automatically (via upsert)

---

## Other Common Issues

### Server won't start

**Error:** `Missing SUPABASE_URL environment variable`

**Solution:**
1. Check `.env` file exists in project root
2. Verify it contains:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-key-here
   PORT=3000
   ```
3. Restart server

---

### Database connection fails

**Error:** Various connection errors

**Solutions:**
1. **Check credentials:**
   - Go to Supabase Dashboard → Settings → API
   - Verify URL and service_role key match `.env`
   - Make sure you're using **service_role** key, not anon key

2. **Check project status:**
   - Ensure Supabase project is active (not paused)
   - Free tier projects pause after inactivity

3. **Check network:**
   - Verify internet connection
   - Check if firewall blocks Supabase

---

### Table doesn't exist

**Error:** `relation 'portfolio' does not exist`

**Solution:**
1. Go to Supabase SQL Editor
2. Run the SQL script from `supabase-setup.sql`
3. Verify table created in Table Editor

---

### Data not saving

**Symptoms:** Edit works but changes don't persist

**Solutions:**

1. **Check browser console (F12):**
   - Look for API errors
   - Check network tab for failed requests

2. **Check server console:**
   - Look for Supabase errors
   - Verify requests are reaching server

3. **Check Supabase:**
   - Go to Table Editor
   - Refresh the portfolio table
   - See if `updated_at` changes

4. **Verify permissions:**
   - Check Row Level Security policies
   - Ensure "Allow all operations" policy exists

---

### Migration script fails

**Error:** Various migration errors

**Solutions:**

1. **File not found:**
   ```
   Error: ENOENT: no such file or directory, open 'portfolio-data.json'
   ```
   - Ensure `portfolio-data.json` exists
   - Run script from project root directory

2. **Invalid JSON:**
   ```
   SyntaxError: Unexpected token
   ```
   - Check `portfolio-data.json` is valid JSON
   - Use a JSON validator

3. **Connection error:**
   - Check `.env` credentials
   - Verify Supabase project is accessible

---

### Port already in use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solutions:**

1. **Change port:**
   Edit `.env`:
   ```env
   PORT=3001
   ```

2. **Kill existing process:**
   
   **Windows:**
   ```bash
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```
   
   **Mac/Linux:**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

---

## Debug Mode

### Enable detailed logging:

Add to `server.js` after `const app = express();`:

```javascript
// Debug logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
```

This logs every request to help diagnose issues.

---

## Verification Checklist

Use this to verify everything is working:

- [ ] `.env` file exists with correct values
- [ ] `npm install` completed without errors
- [ ] Supabase table created (check Table Editor)
- [ ] Migration ran successfully OR first edit saved
- [ ] Server starts without errors
- [ ] Portfolio loads at `http://localhost:3000`
- [ ] Edit button works
- [ ] Can modify fields
- [ ] Changes save (see "Saved!" message)
- [ ] Refresh page shows saved changes
- [ ] Supabase Table Editor shows updated data

---

## Getting Help

If you're still stuck:

1. **Check server console** - Look for error messages
2. **Check browser console** (F12) - Look for JavaScript errors
3. **Check Supabase logs** - Dashboard → Logs
4. **Verify all steps** - Re-read setup instructions
5. **Check this guide** - Search for your specific error

---

## Quick Fixes

### Fresh start:

1. **Drop and recreate table:**
   ```sql
   DROP TABLE IF EXISTS portfolio CASCADE;
   ```
   Then run `supabase-setup.sql` again

2. **Clear and remigrate:**
   ```bash
   node migrate-to-supabase.js
   ```

3. **Restart everything:**
   ```bash
   # Stop server (Ctrl+C)
   npm start
   ```

---

## Contact

If you've tried everything and still have issues:
- Review all documentation files
- Check Supabase documentation
- Verify Node.js version (should be v14+)
