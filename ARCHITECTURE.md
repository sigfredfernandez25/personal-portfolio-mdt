# Portfolio Architecture - Supabase Integration

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           portfolio.html (Frontend)                 │  │
│  │                                                     │  │
│  │  • Vanilla JavaScript                              │  │
│  │  • Tailwind CSS                                    │  │
│  │  • Click-to-edit functionality                     │  │
│  │  • LocalStorage backup                             │  │
│  │  • Fetch API for backend communication             │  │
│  └─────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           │ HTTP Requests                   │
│                           ▼                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                        SERVER SIDE                          │
├─────────────────────────────────────────────────────────────┤
│                           │                                 │
│  ┌────────────────────────▼────────────────────────────┐  │
│  │              Express.js Server                      │  │
│  │                  (server.js)                        │  │
│  │                                                     │  │
│  │  API Endpoints:                                    │  │
│  │  • GET  /api/portfolio-data                        │  │
│  │  • POST /api/portfolio-data                        │  │
│  │  • PATCH /api/portfolio/personal                   │  │
│  │  • PATCH /api/portfolio/education                  │  │
│  │  • PATCH /api/portfolio/skills                     │  │
│  │  • PATCH /api/portfolio/works                      │  │
│  │  • PATCH /api/portfolio/contact                    │  │
│  └─────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           │ Supabase Client                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           Supabase Client Module                    │  │
│  │           (config/supabase.js)                      │  │
│  │                                                     │  │
│  │  • Authentication with service role key            │  │
│  │  • Connection pooling                              │  │
│  │  • Error handling                                  │  │
│  └─────────────────────────────────────────────────────┘  │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE CLOUD                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           PostgreSQL Database                       │  │
│  │                                                     │  │
│  │  Table: portfolio                                  │  │
│  │  ├── id (BIGSERIAL PK)                            │  │
│  │  ├── portfolio_data (JSONB)                       │  │
│  │  └── updated_at (TIMESTAMPTZ)                     │  │
│  │                                                     │  │
│  │  Features:                                         │  │
│  │  • ACID transactions                               │  │
│  │  • Row Level Security                              │  │
│  │  • Automatic backups                               │  │
│  │  • Point-in-time recovery                          │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Read Operation (GET)

```
User opens browser
       │
       ▼
portfolio.html loads
       │
       ▼
JavaScript: fetch('/api/portfolio-data')
       │
       ▼
Express.js server receives request
       │
       ▼
Supabase client queries database
       │
       ▼
PostgreSQL returns data
       │
       ▼
Server sends JSON response
       │
       ▼
Frontend renders portfolio
       │
       ▼
User sees portfolio content
```

### Write Operation (POST/PATCH)

```
User clicks Edit → Modifies field → Saves
       │
       ▼
JavaScript: fetch('/api/portfolio-data', { method: 'POST', body: ... })
       │
       ▼
Express.js validates data structure
       │
       ▼
Supabase client updates database
       │
       ▼
PostgreSQL saves data + updates timestamp
       │
       ▼
Server responds: { success: true }
       │
       ▼
Frontend shows "Saved!" message
       │
       ▼
Data persists permanently in cloud
```

## 🏗️ Component Breakdown

### Frontend Layer
**File:** `portfolio.html`
- **Responsibility**: User interface and interaction
- **Technologies**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Communication**: Fetch API to backend
- **Storage**: LocalStorage for browser-side backup

### Backend Layer
**File:** `server.js`
- **Responsibility**: API endpoints and business logic
- **Technologies**: Node.js, Express.js
- **Authentication**: Service role key (backend only)
- **Error Handling**: Try-catch with meaningful status codes

### Database Connection Layer
**File:** `config/supabase.js`
- **Responsibility**: Database client configuration
- **Technologies**: @supabase/supabase-js
- **Security**: Environment variable based credentials
- **Reusability**: Single client instance for all endpoints

### Database Layer
**Platform:** Supabase (PostgreSQL)
- **Responsibility**: Persistent data storage
- **Schema**: Single table with JSONB column
- **Features**: RLS, backups, scaling
- **Access**: Via Supabase REST API

## 🔐 Security Architecture

```
┌─────────────────────────────────────────┐
│           Public Internet               │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Frontend (Browser)              │
│                                         │
│  • No sensitive credentials             │
│  • Public API calls only                │
│  • LocalStorage backup only             │
└─────────────────┬───────────────────────┘
                  │
                  │ HTTPS
                  ▼
┌─────────────────────────────────────────┐
│       Backend (Express Server)          │
│                                         │
│  • Service role key stored securely     │
│  • Environment variables (.env)         │
│  • Backend-only authentication          │
│  • Input validation                     │
└─────────────────┬───────────────────────┘
                  │
                  │ Authenticated HTTPS
                  ▼
┌─────────────────────────────────────────┐
│         Supabase Cloud                  │
│                                         │
│  • Row Level Security enabled           │
│  • Encrypted connections                │
│  • Automatic backups                    │
│  • Enterprise-grade security            │
└─────────────────────────────────────────┘
```

## 📦 File Organization

```
portfolio/
│
├── Frontend
│   └── portfolio.html              # Single-page application
│
├── Backend
│   ├── server.js                   # Express API server
│   └── config/
│       └── supabase.js             # Database client
│
├── Configuration
│   ├── .env                        # Environment variables (private)
│   ├── .env.example                # Template for .env
│   ├── .gitignore                  # Git ignore rules
│   └── package.json                # Dependencies
│
├── Database
│   └── supabase-setup.sql          # Database schema
│
├── Migration
│   └── migrate-to-supabase.js      # Data migration script
│
├── Documentation
│   ├── README.md                   # Original README
│   ├── README_UPDATED.md           # Updated with Supabase
│   ├── QUICKSTART.md               # Quick setup guide
│   ├── SUPABASE_MIGRATION.md       # Detailed migration guide
│   ├── MIGRATION_SUMMARY.md        # Technical summary
│   └── ARCHITECTURE.md             # This file
│
└── Assets
    ├── image/                      # Profile images
    └── works/                      # Portfolio materials
```

## 🔄 Request/Response Flow

### Example: Updating Personal Info

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Browser  │     │ Express  │     │ Supabase │     │PostgreSQL│
│          │     │ Server   │     │ Client   │     │ Database │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │                │
     │ POST /api/     │                │                │
     │ portfolio-data │                │                │
     ├───────────────>│                │                │
     │                │                │                │
     │                │ Validate data  │                │
     │                │ structure      │                │
     │                │                │                │
     │                │ Update query   │                │
     │                ├───────────────>│                │
     │                │                │                │
     │                │                │ SQL UPDATE     │
     │                │                ├───────────────>│
     │                │                │                │
     │                │                │ Row updated    │
     │                │                │<───────────────┤
     │                │                │                │
     │                │ Success        │                │
     │                │<───────────────┤                │
     │                │                │                │
     │ {success:true} │                │                │
     │<───────────────┤                │                │
     │                │                │                │
     │ Show "Saved!"  │                │                │
     │ message        │                │                │
     │                │                │                │
```

## 🚀 Deployment Architecture

### Development
```
Local Machine
├── Node.js server (localhost:3000)
├── .env file (local credentials)
└── → Connects to Supabase Cloud
```

### Production
```
Hosting Platform (Render/Railway/Vercel)
├── Node.js server (public URL)
├── Environment variables (platform settings)
└── → Connects to Supabase Cloud
```

## 💾 Data Storage Strategy

### Single Table Design

**Why one table?**
- Simplicity: Easy to manage
- Atomicity: Entire portfolio updates in one transaction
- Flexibility: JSONB allows schema evolution
- Performance: Single query for complete portfolio

**JSONB Column Structure:**
```json
{
  "personal": { /* 7 fields */ },
  "education": [ /* 4 objects */ ],
  "skills": [ /* 8 objects */ ],
  "works": [ /* 6 objects */ ],
  "contact": { /* 5 fields */ }
}
```

## 🔧 Environment Configuration

### Development (.env)
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=ey...
PORT=3000
```

### Production (Platform Variables)
- Set in hosting platform dashboard
- Same variable names
- Never in source code

## 📊 Performance Considerations

### Optimizations
1. **Single JSONB column**: Fast reads/writes
2. **Index on updated_at**: Query performance
3. **Connection pooling**: Handled by Supabase client
4. **CDN delivery**: Static assets via hosting platform
5. **Database location**: Choose region closest to users

### Scalability
- **Current**: Single row, low traffic
- **Future**: Can add multiple portfolios (multi-user)
- **Database**: PostgreSQL scales to millions of rows
- **Hosting**: Horizontal scaling available

## 🎯 Design Decisions

### Why Supabase?
- PostgreSQL (proven, reliable)
- Built-in authentication (if needed later)
- Real-time subscriptions (future feature)
- Generous free tier
- Excellent DX

### Why JSONB?
- Flexible schema
- No migrations needed for minor changes
- Fast queries with GIN indexes
- Native PostgreSQL support

### Why Single Table?
- Portfolio is a single logical entity
- Simpler queries
- Atomic updates
- Easier backup/restore

## ✅ Quality Assurance

### Backend Tests
- [x] Environment variables validation
- [x] Supabase connection check
- [x] GET endpoint returns correct format
- [x] POST endpoint validates data
- [x] PATCH endpoints update correctly
- [x] Error handling works

### Frontend Tests
- [x] Portfolio loads correctly
- [x] Edit mode toggles properly
- [x] Fields are editable
- [x] Data saves on edit
- [x] Changes persist after refresh
- [x] LocalStorage backup works

### Integration Tests
- [x] End-to-end save flow
- [x] Database reflects changes
- [x] Multiple rapid edits handled
- [x] Error messages display correctly

---

**Architecture Status: ✅ Production Ready**
