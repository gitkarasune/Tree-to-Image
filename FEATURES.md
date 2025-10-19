# TreeViz Pro - Complete Feature Guide

## 10 Advanced Features Implementation Guide

### 1. Collaborative Editing with WebSockets

**What it does**: Multiple users can edit tree structures in real-time with live updates.

**Setup Steps**:
1. Install Socket.io: `npm install socket.io socket.io-client`
2. Create WebSocket server in `lib/socket-server.ts`
3. Connect client in components using Socket.io client
4. Emit events on tree changes: `socket.emit('tree-update', generationId, treeStructure)`
5. Listen for updates: `socket.on('tree-updated', (tree) => updateUI(tree))`

**Key Files**:
- `lib/socket-server.ts` - Server setup
- `components/collaborative-editor.tsx` - Client component
- `app/api/collaborate/route.ts` - API endpoint

**Problem Solved**: Teams can work together on documentation and project planning without manual syncing.

---

### 2. AI-Powered Tree Generation

**What it does**: Generate project structures from natural language descriptions using Google Gemini.

**Setup Steps**:
1. Get Google API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env.local`: `GOOGLE_API_KEY=your_key_here`
3. Install: `npm install @google/generative-ai`
4. Create API route in `app/api/ai-generate/route.ts`
5. Call from frontend: `POST /api/ai-generate` with prompt

**Example Usage**:
\`\`\`typescript
const response = await fetch('/api/ai-generate', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Create a Next.js project structure' })
})
const { tree } = await response.json()
\`\`\`

**Problem Solved**: Eliminates manual tree creation for complex projects, saves hours of work.

---

### 3. Import from GitHub

**What it does**: Auto-generate tree structures from actual GitHub repositories.

**Setup Steps**:
1. Install Octokit: `npm install @octokit/rest`
2. Create API route in `app/api/github-import/route.ts`
3. User provides: GitHub token, owner, repo name
4. API fetches repo structure and converts to tree format
5. Returns formatted tree for editing

**Example Usage**:
\`\`\`typescript
const response = await fetch('/api/github-import', {
  method: 'POST',
  body: JSON.stringify({
    owner: 'vercel',
    repo: 'next.js',
    token: 'github_token'
  })
})
const { tree } = await response.json()
\`\`\`

**Problem Solved**: No more manual copying of repository structures, instant visualization.

---

### 4. Advanced Syntax Highlighting

**What it does**: Support 100+ programming languages with proper syntax coloring.

**Setup Steps**:
1. Install: `npm install highlight.js`
2. Import styles: `import 'highlight.js/styles/atom-one-dark.css'`
3. Use in editor component:
\`\`\`typescript
import hljs from 'highlight.js'
const highlighted = hljs.highlight(code, { language: 'typescript' }).value
\`\`\`
4. Apply to tree structure display
5. Detect language from file extensions

**Supported Languages**: JavaScript, TypeScript, Python, Java, C++, Go, Rust, and 100+ more.

**Problem Solved**: Makes trees visually appealing and language-specific for better documentation.

---

### 5. Batch Export & Watermarking

**What it does**: Export multiple trees at once with custom watermarks and branding.

**Setup Steps**:
1. Install Sharp: `npm install sharp`
2. Create API route in `app/api/batch-export/route.ts`
3. Process images with watermarks:
\`\`\`typescript
const image = sharp(buffer)
  .composite([{ input: watermarkBuffer, gravity: 'southeast' }])
  .webp()
\`\`\`
4. Support formats: PNG, JPG, WebP, PDF
5. Return batch as ZIP or individual downloads

**Problem Solved**: Teams can brand multiple exports at once, perfect for presentations and reports.

---

### 6. Tree Comparison Tool

**What it does**: Compare two project structures side-by-side with visual diff highlighting.

**Setup Steps**:
1. Install: `npm install diff-match-patch`
2. Create API route in `app/api/compare/route.ts`
3. Use DiffMatchPatch to generate diffs:
\`\`\`typescript
const dmp = new DiffMatchPatch()
const diffs = dmp.diff_main(versionA, versionB)
dmp.diff_cleanupSemantic(diffs)
\`\`\`
4. Display with color coding (red for removed, green for added)
5. Store comparisons in database

**Problem Solved**: Visualize changes between project versions, track evolution over time.

---

### 7. Custom Theme Builder

**What it does**: Create and save custom color themes for personalized branding.

**Setup Steps**:
1. Create theme schema in Prisma: `CustomTheme` model
2. Store user preferences: colors, fonts, sizes
3. API endpoints for CRUD operations
4. Apply themes dynamically to generated images
5. Save as presets for reuse

**Database Schema**:
\`\`\`prisma
model CustomTheme {
  id String @id @default(cuid())
  userId String
  name String
  primaryColor String
  accentColor String
  backgroundColor String
  fontSize Int
  fontFamily String
  isDefault Boolean @default(false)
}
\`\`\`

**Problem Solved**: Users can match brand colors and preferences, consistent visual identity.

---

### 8. Analytics Dashboard

**What it does**: Track popular templates, export formats, and user behavior patterns.

**Setup Steps**:
1. Install: `npm install @vercel/analytics`
2. Create analytics API in `app/api/analytics/route.ts`
3. Log events on key actions:
\`\`\`typescript
await fetch('/api/analytics', {
  method: 'POST',
  body: JSON.stringify({
    eventType: 'tree_generated',
    userId: user.id,
    metadata: { format: 'png', templateUsed: 'nextjs' }
  })
})
\`\`\`
4. Create dashboard to visualize trends
5. Track: generations, exports, templates used, user retention

**Problem Solved**: Provides insights for product improvements and user engagement metrics.

---

### 9. PDF Report Generation

**What it does**: Generate comprehensive PDF reports with tree structure plus metadata.

**Setup Steps**:
1. Install: `npm install pdfkit`
2. Create API route in `app/api/pdf-report/route.ts`
3. Generate PDF with tree and metadata:
\`\`\`typescript
const doc = new PDFDocument()
doc.fontSize(24).text('Tree Structure Report')
doc.fontSize(12).text(treeStructure)
doc.pipe(response)
doc.end()
\`\`\`
4. Include: title, description, timestamp, author
5. Support custom branding and headers

**Problem Solved**: Create professional documentation for presentations and client deliverables.

---

### 10. Version Control & Diff Viewer

**What it does**: Track changes to tree structures over time with full version history.

**Setup Steps**:
1. Install: `npm install simple-git`
2. Create version tracking in database:
\`\`\`prisma
model TreeVersion {
  id String @id @default(cuid())
  generationId String
  versionNumber Int
  treeStructure String
  changeDescription String
  createdAt DateTime @default(now())
}
\`\`\`
3. On each update, create new version entry
4. Implement rollback functionality
5. Show version history with timestamps

**Example Usage**:
\`\`\`typescript
const version = await prisma.treeVersion.create({
  data: {
    generationId,
    versionNumber: currentVersion + 1,
    treeStructure: newTree,
    changeDescription: 'Updated component structure'
  }
})
\`\`\`

**Problem Solved**: Enables version history and rollback capabilities, track evolution of projects.

---

## Database Setup (Vercel Postgres)

### 1. Connect Vercel Postgres
\`\`\`bash
npm install @vercel/postgres @prisma/client
npx prisma init
\`\`\`

### 2. Set Environment Variables
\`\`\`
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_API_KEY=your_google_key
CLERK_SECRET_KEY=your_clerk_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
\`\`\`

### 3. Run Migrations
\`\`\`bash
npx prisma db push
npx prisma generate
\`\`\`

### 4. Access Database Studio
\`\`\`bash
npx prisma studio
\`\`\`

---

## Real-Time Features

All features support real-time updates through:
- WebSocket connections for live collaboration
- Server-sent events for notifications
- Optimistic UI updates for instant feedback
- Database subscriptions for multi-user sync

---

## Authentication (Clerk + Google)

- Users can sign in with Google only
- After 3 generations, unauthenticated users are prompted to sign in
- All premium features require authentication
- User data is securely stored in Vercel Postgres

---

## Performance Optimizations

- Image generation is cached
- Database queries use indexes
- WebSocket connections are pooled
- PDF generation is streamed
- Batch exports use worker threads

---

## Troubleshooting

**WebSocket not connecting**: Check CORS settings in `lib/socket-server.ts`
**AI generation failing**: Verify Google API key and rate limits
**GitHub import errors**: Check token permissions and repository access
**PDF generation slow**: Use streaming for large documents
**Database connection issues**: Verify DATABASE_URL and network access

---

## Future Enhancements

- Real-time collaborative cursors
- AI-powered code generation from trees
- Mobile app with offline support
- Advanced filtering and search
- Custom domain support
- Team workspaces
- API for third-party integrations
