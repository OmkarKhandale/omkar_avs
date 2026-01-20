## AVS In-So-Tech – BFSI Landing Page

A modern, high-performance BFSI software company landing page built with Node.js, Express, and a vanilla HTML/CSS/JS frontend. The layout is inspired by the original AVS design, but upgraded for better UX, responsiveness, accessibility, and interactivity.

### Folder Structure

- **server/** – Express server and future API routes  
  - `index.js` – Express app that serves static assets from `public/` and exposes a `/api/health` endpoint.  
- **public/** – Static frontend served by Express  
  - `index.html` – Landing page markup with all sections (hero, trust strip, about, services, products, CTA, contact, footer).  
  - **css/**  
    - `main.css` – Layout, typography, responsive grid, and component styling.  
    - `animations.css` – Reusable animation utilities and keyframes (scroll reveal, hero network pulse).  
  - **js/**  
    - `main.js` – Navbar behavior, smooth scrolling focus handling, active link highlighting, product filters, value card interactions, footer year.  
    - `counter.js` – IntersectionObserver-powered animated counters for trust metrics.  
    - `animations.js` – Scroll reveal animations using IntersectionObserver.  
  - **assets/** – Images and icons (add your own branding assets here).  
- `package.json` – Node project metadata and scripts.  
- `vercel.json` – Configuration for Vercel serverless deployment using the Express entrypoint.  
- `README.md` – This documentation.

### Running the Project Locally

1. **Install dependencies**

```bash
npm install
```

2. **Start the development server**

```bash
npm run dev
```

3. **Open the app**

Visit `http://localhost:3000` in your browser. The Express server serves the static frontend from the `public/` directory.

### Deploying on Vercel

1. **Push your project to a Git repository** (GitHub, GitLab, Bitbucket, etc.).  
2. In the Vercel dashboard, **create a new project** and select this repository.  
3. When asked for settings:
   - **Root directory**: project root (where `package.json` and `vercel.json` live).  
   - **Build command**: `npm install` (Vercel will run this automatically; no additional build step is required).  
   - **Output directory**: not required (Express server handles routing).  
4. Vercel will use `vercel.json` to route requests through the serverless Express function defined in `server/index.js`.

### Environment & Future APIs

- The current app does not require environment variables by default.  
- For production features like a contact form, authentication, or integration with banking systems:
  - Add API routes under `server/routes/` or extend the `/api` router in `server/index.js`.  
  - Use environment variables (e.g., `CONTACT_INBOX_EMAIL`, `SMTP_URL`, `DB_URL`) and configure them in the Vercel project settings.  
  - Keep secrets out of source control; rely on Vercel’s encrypted environment variable support.

