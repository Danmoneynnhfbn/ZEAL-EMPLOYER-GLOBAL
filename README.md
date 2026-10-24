# Zeal Employer Global

Zeal Employer Global (ZEG) is a responsive career services website for job seekers, graduates, career changers, and professionals pursuing their next move.

## Tech stack

React, Vite, Tailwind CSS, Framer Motion, React Router, and Lenis.

## Run locally

Requires Node.js LTS and npm. Install dependencies, copy the example environment file, then configure the site URL and Web3Forms access key:

```bash
npm install
Copy-Item .env.example .env
# Set VITE_WEB3FORMS_KEY and VITE_SITE_URL in .env
npm run dev
```

`VITE_SITE_URL` should be the canonical HTTPS URL for the deployed site. The Web3Forms key is required for form submissions; do not commit `.env`.

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Site content

Service descriptions, service selector options, trust principles, process details, and FAQ copy are maintained in `src/data/content.js`. Launch-only verification items are kept in `PRIVATE_NOTES.md`.
