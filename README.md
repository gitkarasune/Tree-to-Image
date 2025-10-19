# Tree to Image Generator

Convert file structures and project hierarchies into beautiful, shareable images with professional styling and customization options.

### Installation

```
# Clone the repository
git clone https://github.com/yourusername/treexy.git
cd treexy
```

### Install dependencies
```npm install```

### Add required packages
```npm install framer-motion @vercel/postgres moment lucide-react```

### Set up environment variables
```cp .env.example .env.local ```

### Run database migrations
```npm run db:init```

### Start development server
```npm run dev```

### Environment Variables

```env
DATABASE_URL="" 
NEXT_PUBLIC_APP_URL=""
GOOGLE_API_KEY=""
CLERK_SECRET_KEY="" 
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
```

### Database Setup

```
# Run the initialization script to create the history table:

bash
npm run db:init
```

### Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Animations**: Framer Motion
- **Database**: Vercel Postgres
- **Icons**: Lucide React/React Icons
- **Code Highlighting**: Highlight.js
- **Date/Time**: Moment.js

### License

MIT

### Contributing

<b>Contributions are welcome! Please feel free to submit a Pull Request.</b>

