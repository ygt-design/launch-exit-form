import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #0b0b0c;
    --foreground: #f3f4f6;
    --muted: #9ca3af;
    --border: #27272a;
    --accent: #ffffff;
    --primary: #FF4C00;
    --primary-gradient: linear-gradient(90deg, #FF4C00 0%, #FF4C00 20%, #FF7A00 100%);
    --radius: 10px;
    --container: 720px;
    --error: #ef4444;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root { height: 100%; }

  html, body {
    margin: 0;
    padding: 0;
    background: var(--background);
    color: var(--foreground);
    overflow-x: hidden;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  a { color: inherit; text-decoration: none; }

  button, input, select, textarea { font: inherit; color: inherit; }
  button { cursor: pointer; }

  .container {
    width: 100%;

    max-width: var(--container);
    margin: 0 auto;
    padding: 48px 20px;
  }

  .stack { display: flex; flex-direction: column; gap: 16px; }
  .title { font-weight: 600; letter-spacing: -0.02em; }
  .subtitle { color: var(--muted); }

  .card { border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; background: #111315; }

  .control { display: flex; flex-direction: column; gap: 8px; }
  .label { font-size: 14px; }

  .input, .select, .checkbox { border: 1px solid var(--border); border-radius: var(--radius); background: #111315; color: var(--foreground); }
  .input, .select { height: 44px; padding: 0 12px; }
  .input[aria-invalid="true"], .select[aria-invalid="true"], .checkbox[aria-invalid="true"] { border-color: var(--error); }
  .error-text { color: var(--error); font-size: 12px; margin-top: 4px; }

  .checkbox-group { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 12px; }

  .button { height: 44px; border: 1px solid var(--border); border-radius: var(--radius); background: #ffffff; color: #111111; padding: 0 16px; }
  .button.secondary { background: transparent; color: #ffffff; border-color: var(--border); }
  .button.primary { background: var(--primary-gradient); color: #ffffff; border-color: transparent; transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease; }
  .button.primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(255, 122, 0, 0.35); filter: brightness(1.02); }
  .button.primary:active { transform: translateY(0); box-shadow: 0 2px 8px rgba(255, 122, 0, 0.25); filter: brightness(0.98); }
  .button:disabled { opacity: 0.6; cursor: not-allowed; }

  .sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; padding: 0; }

  @media (max-width: 480px) { .container { padding: 32px 16px; } }
`;
