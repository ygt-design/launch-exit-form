# FormExit

Minimal, contemporary forms for seller and buyer waitlists. Built with React, Vite, and styled-components.

## Setup (Formspree-only)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root and define env vars:
   ```bash
   # Client (exposed). Forms post to Formspree and you receive emails without domain setup.
   VITE_FORMSPREE_SELLER_ID=
   VITE_FORMSPREE_BUYER_ID=
   VITE_PUBLIC_BASE_URL=
   ```
3. Start dev server:
   ```bash
   npm install
   npm run dev
   ```

## Notes

- Do not commit secrets. `.env` is gitignored. Use `VITE_` prefix for any variable that must be available in the browser.
- No backend required; submissions go directly to Formspree.
