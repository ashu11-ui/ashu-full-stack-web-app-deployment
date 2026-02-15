# Ashutosh's Portfolio Website

A full-stack portfolio website built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase** (PostgreSQL).

## Features

- Single-page responsive portfolio with Hero, About, Projects, Skills, and Contact sections
- Projects fetched dynamically from Supabase database
- Contact form that saves messages to the database via API
- Server-side API routes for data handling
- Modern dark theme with smooth animations

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, Next.js 15, TypeScript     |
| Styling   | Tailwind CSS 4                    |
| Backend   | Next.js API Routes                |
| Database  | Supabase (PostgreSQL)             |
| Hosting   | Vercel (recommended)              |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts    # POST/GET contact messages
│   │   └── projects/route.ts   # GET projects from DB
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Main portfolio page
└── lib/
    └── supabase.ts             # Supabase client config
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/portfolio-website.git
cd portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Database

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the following SQL in the Supabase SQL Editor:

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed sample projects
INSERT INTO projects (title, description, tech_stack, image_url, live_url, github_url, featured) VALUES
('E-Commerce Platform', 'A full-stack e-commerce application with product listings, cart, checkout, and payment processing.', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600', 'https://example.com', 'https://github.com', true),
('AI Chat Application', 'Real-time chat application powered by AI with natural language processing capabilities.', ARRAY['Next.js', 'TypeScript', 'OpenAI', 'WebSocket'], 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600', 'https://example.com', 'https://github.com', true),
('Weather Dashboard', 'A responsive weather dashboard with real-time data, forecasts, and interactive maps.', ARRAY['React', 'Tailwind CSS', 'Weather API', 'Chart.js'], 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600', 'https://example.com', 'https://github.com', false),
('Task Management App', 'A productivity app for managing tasks with drag-and-drop, labels, and team collaboration.', ARRAY['Next.js', 'Supabase', 'DnD Kit', 'Tailwind'], 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600', 'https://example.com', 'https://github.com', false);
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_connection_string
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Method | Endpoint        | Description                  |
|--------|-----------------|------------------------------|
| GET    | /api/projects   | Fetch all projects from DB   |
| POST   | /api/contact    | Submit a contact message     |
| GET    | /api/contact    | Retrieve all contact messages|

## Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variables in Vercel project settings
4. Deploy

## License

MIT
