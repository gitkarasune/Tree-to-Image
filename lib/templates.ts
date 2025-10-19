export interface Template {
  id: string
  name: string
  description: string
  tags: string[]
  popular: boolean
  template: string
}

export const TEMPLATES: Template[] = [
  {
    id: "nextjs-app",
    name: "Next.js App Router",
    description: "Modern Next.js with App Router",
    tags: ["Next.js", "React", "TypeScript"],
    popular: true,
    template: `- app
  - api
    - route.ts
  - layout.tsx
  - page.tsx
- components
  - ui
    - button.tsx
    - card.tsx
  - header.tsx
  - footer.tsx
- lib
  - utils.ts
- public
  - images
- styles
  - globals.css
- package.json
- tsconfig.json`,
  },
  {
    id: "nextjs-pages",
    name: "Next.js Pages Router",
    description: "Traditional Next.js with Pages Router",
    tags: ["Next.js", "React"],
    popular: false,
    template: `- pages
  - api
    - hello.ts
  - _app.tsx
  - _document.tsx
  - index.tsx
- components
  - Header.tsx
  - Footer.tsx
- public
  - images
- styles
  - globals.css
- package.json`,
  },

  {
    id: "react-vite",
    name: "React + Vite",
    description: "Fast React development with Vite",
    tags: ["React", "Vite", "TypeScript"],
    popular: true,
    template: `- src
  - components
    - App.tsx
    - Header.tsx
  - pages
    - Home.tsx
  - hooks
    - useAuth.ts
  - utils
    - api.ts
  - main.tsx
- public
  - vite.svg
- index.html
- vite.config.ts
- package.json`,
  },
  {
    id: "react-cra",
    name: "React Create App",
    description: "Standard Create React App",
    tags: ["React", "CRA"],
    popular: false,
    template: `- src
  - components
    - App.tsx
    - App.css
  - pages
  - App.test.tsx
  - index.tsx
- public
  - index.html
  - favicon.ico
- package.json
- tsconfig.json`,
  },

  {
    id: "mern-stack",
    name: "MERN Stack",
    description: "MongoDB, Express, React, Node.js",
    tags: ["MERN", "Full Stack", "MongoDB"],
    popular: true,
    template: `- client
  - src
    - components
    - pages
    - App.tsx
  - package.json
- server
  - routes
  - models
  - controllers
  - middleware
  - server.js
  - package.json
- .env
- README.md`,
  },
  {
    id: "pern-stack",
    name: "PERN Stack",
    description: "PostgreSQL, Express, React, Node.js",
    tags: ["PERN", "Full Stack", "PostgreSQL"],
    popular: true,
    template: `- client
  - src
    - components
    - pages
    - App.tsx
  - package.json
- server
  - routes
  - db
  - controllers
  - middleware
  - server.js
  - package.json
- .env
- README.md`,
  },
  {
    id: "mean-stack",
    name: "MEAN Stack",
    description: "MongoDB, Express, Angular, Node.js",
    tags: ["MEAN", "Full Stack", "Angular"],
    popular: false,
    template: `- src
  - app
    - components
    - services
    - models
  - assets
  - environments
  - main.ts
- server
  - routes
  - models
  - controllers
- angular.json
- package.json`,
  },

  {
    id: "vue-3",
    name: "Vue 3 + Vite",
    description: "Vue 3 with Vite and TypeScript",
    tags: ["Vue", "Vite", "TypeScript"],
    popular: true,
    template: `- src
  - components
    - HelloWorld.vue
    - Header.vue
  - views
    - Home.vue
  - App.vue
  - main.ts
- public
- index.html
- vite.config.ts
- package.json`,
  },
  {
    id: "nuxt-3",
    name: "Nuxt 3",
    description: "Full-featured Vue framework",
    tags: ["Nuxt", "Vue", "SSR"],
    popular: true,
    template: `- app
  - components
    - Header.vue
  - layouts
    - default.vue
  - pages
    - index.vue
- server
  - api
- public
- nuxt.config.ts
- package.json`,
  },

  {
    id: "angular",
    name: "Angular Project",
    description: "Angular with TypeScript",
    tags: ["Angular", "TypeScript"],
    popular: false,
    template: `- src
  - app
    - components
      - header
      - footer
    - services
    - models
    - app.component.ts
  - assets
  - environments
  - main.ts
- angular.json
- package.json
- tsconfig.json`,
  },

  {
    id: "python-package",
    name: "Python Package",
    description: "Standard Python package",
    tags: ["Python", "Package"],
    popular: false,
    template: `- src
  - mypackage
    - __init__.py
    - main.py
    - utils.py
    - models
      - __init__.py
  - tests
    - test_main.py
- docs
- setup.py
- requirements.txt
- README.md`,
  },
  {
    id: "django",
    name: "Django Project",
    description: "Django web framework",
    tags: ["Django", "Python", "Web"],
    popular: true,
    template: `- myproject
  - manage.py
  - myproject
    - __init__.py
    - settings.py
    - urls.py
    - wsgi.py
  - myapp
    - migrations
    - models.py
    - views.py
    - urls.py
    - templates
- static
- media
- requirements.txt`,
  },
  {
    id: "flask",
    name: "Flask App",
    description: "Lightweight Flask application",
    tags: ["Flask", "Python", "Web"],
    popular: true,
    template: `- app
  - __init__.py
  - routes.py
  - models.py
  - templates
    - base.html
    - index.html
  - static
    - css
    - js
- tests
- config.py
- requirements.txt
- run.py`,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    description: "Modern Python API framework",
    tags: ["FastAPI", "Python", "API"],
    popular: true,
    template: `- app
  - __init__.py
  - main.py
  - api
    - routes.py
    - dependencies.py
  - models
    - schemas.py
    - database.py
  - core
    - config.py
- tests
- requirements.txt
- docker-compose.yml`,
  },

  {
    id: "react-native",
    name: "React Native",
    description: "Cross-platform mobile app",
    tags: ["React Native", "Mobile"],
    popular: true,
    template: `- src
  - screens
    - HomeScreen.tsx
    - DetailsScreen.tsx
  - components
    - Header.tsx
    - Button.tsx
  - navigation
    - RootNavigator.tsx
  - utils
    - api.ts
- app.json
- package.json
- tsconfig.json`,
  },
  {
    id: "flutter",
    name: "Flutter App",
    description: "Flutter mobile application",
    tags: ["Flutter", "Dart", "Mobile"],
    popular: true,
    template: `- lib
  - main.dart
  - screens
    - home_screen.dart
  - widgets
    - custom_button.dart
  - models
    - user.dart
  - services
    - api_service.dart
- test
  - widget_test.dart
- pubspec.yaml
- README.md`,
  },
  {
    id: "swift-ios",
    name: "Swift iOS",
    description: "Native iOS application",
    tags: ["Swift", "iOS", "Mobile"],
    popular: false,
    template: `- MyApp
  - MyApp.swift
  - ContentView.swift
  - Models
    - User.swift
  - Views
    - HomeView.swift
  - Services
    - APIService.swift
- MyAppTests
- MyApp.xcodeproj`,
  },

  {
    id: "turborepo",
    name: "Turborepo",
    description: "Monorepo with Turborepo",
    tags: ["Monorepo", "Turborepo"],
    popular: true,
    template: `- packages
  - ui
    - src
      - components
      - hooks
    - package.json
  - api
    - src
      - routes
      - services
    - package.json
  - web
    - src
      - pages
      - components
    - package.json
- apps
  - admin
    - src
  - mobile
    - src
- turbo.json
- package.json`,
  },
  {
    id: "nx-monorepo",
    name: "Nx Monorepo",
    description: "Monorepo with Nx",
    tags: ["Monorepo", "Nx"],
    popular: true,
    template: `- apps
  - web
    - src
      - app
      - pages
  - api
    - src
      - app
      - routes
- libs
  - shared
    - ui
    - utils
  - api
    - core
- nx.json
- package.json`,
  },
  {
    id: "yarn-workspaces",
    name: "Yarn Workspaces",
    description: "Monorepo with Yarn Workspaces",
    tags: ["Monorepo", "Yarn"],
    popular: false,
    template: `- packages
  - web
    - src
    - package.json
  - api
    - src
    - package.json
  - shared
    - src
    - package.json
- package.json
- yarn.lock`,
  },

  {
    id: "svelte",
    name: "Svelte + Vite",
    description: "Svelte with Vite",
    tags: ["Svelte", "Vite"],
    popular: true,
    template: `- src
  - components
    - Header.svelte
    - Footer.svelte
  - pages
    - Home.svelte
  - App.svelte
  - main.ts
- public
- index.html
- vite.config.ts
- package.json`,
  },
  {
    id: "sveltekit",
    name: "SvelteKit",
    description: "Full-stack Svelte framework",
    tags: ["SvelteKit", "Svelte"],
    popular: true,
    template: `- src
  - routes
    - +page.svelte
    - +layout.svelte
  - lib
    - components
    - utils
- static
- svelte.config.js
- vite.config.ts
- package.json`,
  },
  {
    id: "remix",
    name: "Remix",
    description: "Full-stack React framework",
    tags: ["Remix", "React"],
    popular: true,
    template: `- app
  - routes
    - _index.tsx
    - about.tsx
  - components
    - Header.tsx
  - styles
    - globals.css
- public
- remix.config.js
- package.json`,
  },
  {
    id: "astro",
    name: "Astro",
    description: "Static site builder",
    tags: ["Astro", "Static"],
    popular: true,
    template: `- src
  - components
    - Header.astro
  - layouts
    - Layout.astro
  - pages
    - index.astro
  - styles
    - global.css
- public
- astro.config.mjs
- package.json`,
  },
  {
    id: "gatsby",
    name: "Gatsby",
    description: "React-based static site generator",
    tags: ["Gatsby", "React", "Static"],
    popular: false,
    template: `- src
  - components
    - Header.tsx
  - pages
    - index.tsx
  - images
- content
  - blog
- gatsby-config.js
- package.json`,
  },
  {
    id: "hugo",
    name: "Hugo",
    description: "Static site generator",
    tags: ["Hugo", "Static"],
    popular: false,
    template: `- content
  - posts
    - first-post.md
  - pages
    - about.md
- layouts
  - _default
    - baseof.html
- static
  - images
- config.toml
- README.md`,
  },
]
