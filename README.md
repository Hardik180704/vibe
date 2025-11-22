<div align="center">
  <img src="/public/logo.svg" alt="Vibe Logo" width="80" height="80">
  
  # ✨ Vibe
  
  ### Build Stunning Applications by Chatting with AI
  
  <p>
    <strong>No coding required. Just your imagination. Unlimited possibilities.</strong>
  </p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
  [![tRPC](https://img.shields.io/badge/tRPC-11.4.3-2596BE?style=flat-square&logo=trpc)](https://trpc.io/)
  [![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Vibe** is an AI-powered web application builder that allows users to create stunning websites and applications through natural conversation. Simply describe what you want to build, and Vibe's AI agents will generate, preview, and deploy your project in real-time.

Built with modern web technologies and powered by advanced AI models, Vibe eliminates the complexity of traditional web development while maintaining professional quality and full customization capabilities.

### What Makes Vibe Special?

- 🤖 **AI-Driven Development**: Leverage GPT-4 and AI agents to write code from natural language descriptions
- 🔄 **Real-Time Previews**: See your application come to life instantly in isolated sandboxes
- 💾 **Project Management**: Organize and manage multiple projects with persistent storage
- 🎨 **Beautiful UI/UX**: Modern, responsive design with smooth animations powered by Framer Motion
- 🔐 **Secure Authentication**: Enterprise-grade authentication with Clerk
- ⚡ **Serverless Architecture**: Built on Next.js 15 with App Router for optimal performance

---

## ✨ Key Features

### 🎯 Core Functionality

- **Conversational AI Interface**: Describe your project in plain English and watch it materialize
- **Multi-Project Support**: Create and manage unlimited projects simultaneously
- **Live Code Execution**: Real-time code generation and execution in secure E2B sandboxes
- **File Management**: Browse, edit, and manage generated files with an intuitive file explorer
- **Code Visualization**: Syntax-highlighted code viewer with PrismJS integration
- **Responsive Design**: Fully responsive interface that works seamlessly across all devices

### 🛠️ Technical Features

- **Type-Safe API**: End-to-end type safety with tRPC
- **Database ORM**: Prisma for robust database management
- **Event-Driven Architecture**: Inngest for reliable background job processing
- **Real-Time Updates**: Tanstack Query for optimistic UI updates
- **Theme Support**: Dark/Light mode with next-themes
- **Component Library**: Comprehensive UI components built on Radix UI
- **Animation System**: Smooth, performant animations with Framer Motion

### 🚀 AI Capabilities

- **Intelligent Code Generation**: Multi-agent system for context-aware code creation
- **Error Handling**: Automatic error detection and recovery
- **Iterative Refinement**: Continuous improvement through conversation
- **Framework Support**: Optimized for Next.js 15.3.3 development

---

## 📸 Screenshots

### Home Page
*The landing page with AI-powered project creation*

![Home Page](./screenshots/home.png)

### Project Dashboard
*Manage all your projects in one place*

![Project Dashboard](./screenshots/dashboard.png)

### Live Preview
*Real-time preview of your generated application*

![Live Preview](./screenshots/preview.png)

### Code Editor
*View and explore generated code with syntax highlighting*

![Code Editor](./screenshots/code-editor.png)

### File Explorer
*Navigate through your project's file structure*

![File Explorer](./screenshots/file-explorer.png)

### Chat Interface
*Converse with AI to build and refine your application*

![Chat Interface](./screenshots/chat.png)

> **Note**: Add your screenshots to the `screenshots` folder in the root directory. Recommended dimensions: 1920x1080px

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15.3.4](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D visualization
- **State Management**: [Tanstack Query](https://tanstack.com/query) - Async state management
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) - Performant form validation

### Backend

- **API Layer**: [tRPC 11](https://trpc.io/) - End-to-end typesafe APIs
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM**: [Prisma 6](https://www.prisma.io/) - Next-generation Node.js ORM
- **Authentication**: [Clerk](https://clerk.com/) - User authentication and management
- **Background Jobs**: [Inngest](https://www.inngest.com/) - Reliable event-driven workflows

### AI & Code Execution

- **AI Model**: [OpenAI GPT-4](https://openai.com/) - Advanced language model
- **Agent Framework**: [Inngest Agent Kit](https://www.inngest.com/docs/agent-kit) - AI agent orchestration
- **Sandbox Environment**: [E2B Code Interpreter](https://e2b.dev/) - Secure code execution sandboxes

### Development Tools

- **Package Manager**: npm/yarn/pnpm/bun
- **Code Quality**: ESLint - Linting and code quality
- **Schema Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation

---

## 🏗️ Architecture

Vibe follows a modern, scalable architecture designed for performance and maintainability:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Next.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ React Pages  │  │ UI Components│  │  tRPC Client │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer (tRPC)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Routers    │  │  Procedures  │  │  Middleware  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────┐   ┌──────────────────────┐
│   Database (Prisma)  │   │  Inngest Functions   │
│  ┌────────────────┐  │   │  ┌────────────────┐  │
│  │   PostgreSQL   │  │   │  │  AI Agent Kit  │  │
│  └────────────────┘  │   │  └────────────────┘  │
└──────────────────────┘   └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │   E2B Sandboxes      │
                           │  (Code Execution)    │
                           └──────────────────────┘
```

### Key Components

1. **Frontend Layer**: React components with Server/Client component separation
2. **API Layer**: Type-safe tRPC procedures for data fetching and mutations
3. **Agent Layer**: AI-powered code generation using multi-agent orchestration
4. **Execution Layer**: Isolated E2B sandboxes for secure code execution
5. **Data Layer**: Prisma ORM with PostgreSQL for persistent storage

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **npm** / **yarn** / **pnpm** / **bun**
- **PostgreSQL** database (local or cloud)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Hardik180704/vibe.git
cd vibe
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then configure your environment variables (see [Environment Variables](#-environment-variables) section).

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vibe?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# OpenAI
OPENAI_API_KEY=sk-...

# E2B Code Interpreter
E2B_API_KEY=e2b_...

# Inngest
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting API Keys

- **Clerk**: Sign up at [clerk.com](https://clerk.com)
- **OpenAI**: Get your API key from [platform.openai.com](https://platform.openai.com)
- **E2B**: Sign up at [e2b.dev](https://e2b.dev)
- **Inngest**: Create an account at [inngest.com](https://www.inngest.com)

---

## 💾 Database Setup

Vibe uses PostgreSQL with Prisma ORM. The schema includes:

### Models

- **Project**: Stores user projects with metadata
- **Message**: Chat messages with AI (user/assistant roles)
- **Fragment**: Generated code artifacts with sandbox URLs

### Migrations

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Reset database (development only)
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy

# Open Prisma Studio for database GUI
npx prisma studio
```

---

## 📁 Project Structure

```
vibe/
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma         # Prisma schema definition
│   └── migrations/           # Database migrations
├── public/                   # Static assets
│   └── logo.svg             # Application logo
├── sandbox-templates/        # E2B sandbox configurations
│   └── nextjs/              # Next.js sandbox template
├── screenshots/             # Application screenshots
├── src/
│   ├── app/                 # Next.js 15 App Router
│   │   ├── (home)/         # Home page route group
│   │   ├── api/            # API routes
│   │   │   ├── inngest/   # Inngest webhook endpoint
│   │   │   └── trpc/      # tRPC API endpoint
│   │   └── projects/       # Projects pages
│   ├── components/          # Reusable React components
│   │   ├── ui/             # UI component library
│   │   ├── animated/       # Animated components
│   │   └── code-view/      # Code visualization components
│   ├── hooks/              # Custom React hooks
│   ├── inngest/            # Inngest functions and client
│   │   ├── client.ts      # Inngest client configuration
│   │   ├── functions.ts   # AI agent functions
│   │   └── utils.ts       # Inngest utilities
│   ├── lib/                # Utility libraries
│   │   ├── db.ts          # Prisma client instance
│   │   └── utils.ts       # General utilities
│   ├── modules/            # Feature modules
│   │   ├── home/          # Home module
│   │   ├── messages/      # Messages module
│   │   └── projects/      # Projects module
│   ├── trpc/              # tRPC configuration
│   │   ├── init.ts       # tRPC initialization
│   │   ├── client.tsx    # Client-side tRPC
│   │   └── routers/      # API routers
│   ├── middleware.ts      # Next.js middleware (auth)
│   ├── prompt.ts         # AI system prompts
│   └── types.ts          # TypeScript type definitions
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── components.json       # shadcn/ui configuration
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

---

## 🤖 How It Works

### 1. Project Creation
Users create a new project by providing a natural language description of what they want to build.

### 2. AI Processing
The request is sent to an Inngest function that:
- Creates an isolated E2B sandbox environment
- Retrieves conversation history from the database
- Initializes AI agent network with custom tools

### 3. Code Generation
The AI agent:
- Analyzes the user's requirements
- Generates appropriate code files
- Executes terminal commands as needed
- Iteratively refines the solution

### 4. Sandbox Execution
Generated code runs in a secure E2B sandbox:
- Next.js 15.3.3 environment
- 30-minute timeout
- Isolated from main application
- Live preview URL generation

### 5. Result Delivery
The system:
- Saves generated files to database
- Creates a fragment with sandbox URL
- Generates user-friendly response
- Updates UI in real-time

---

## 👨‍💻 Development

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Generate Prisma client
npm run postinstall
```

### Development Workflow

1. **Feature Development**
   - Create a new branch: `git checkout -b feature/your-feature`
   - Make your changes
   - Test thoroughly
   - Commit with clear messages

2. **Database Changes**
   - Update `prisma/schema.prisma`
   - Run `npx prisma migrate dev --name your_change`
   - Generate client: `npx prisma generate`

3. **API Changes**
   - Add/modify procedures in `src/trpc/routers/`
   - Types are automatically inferred
   - Test with tRPC client

4. **UI Components**
   - Use existing components from `src/components/ui/`
   - Follow Radix UI patterns
   - Ensure accessibility

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Follow existing patterns
- **Components**: Use functional components with hooks
- **Naming**: Descriptive, consistent naming conventions

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Configure environment variables
- Deploy

3. **Configure Database**
- Use Vercel Postgres or external PostgreSQL
- Update `DATABASE_URL` in environment variables
- Run migrations: `npx prisma migrate deploy`

### Environment Variables for Production

Ensure all environment variables are set in your hosting platform:
- Database connection string
- API keys (Clerk, OpenAI, E2B, Inngest)
- App URL (production domain)

### Post-Deployment

1. Run database migrations
2. Test authentication flow
3. Verify AI agent functionality
4. Check sandbox creation and execution

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check if the bug has already been reported
2. Create a detailed issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Discuss implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests if applicable
5. Submit a pull request

### Code Review Process

- All PRs require review before merging
- Ensure CI/CD checks pass
- Address review comments
- Squash commits before merge

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Hosting and deployment
- [Clerk](https://clerk.com/) - Authentication
- [OpenAI](https://openai.com/) - AI capabilities
- [E2B](https://e2b.dev/) - Code execution sandboxes
- [Inngest](https://www.inngest.com/) - Event-driven workflows
- [Prisma](https://www.prisma.io/) - Database toolkit
- [tRPC](https://trpc.io/) - Type-safe APIs

---

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/Hardik180704/vibe/wiki)
- **Issues**: [GitHub Issues](https://github.com/Hardik180704/vibe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Hardik180704/vibe/discussions)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Hardik180704">Hardik Sharma</a></p>
  <p>
    <a href="https://github.com/Hardik180704/vibe">⭐ Star this project</a>
  </p>
</div>
