import React from 'react'

const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }

export const IconCog = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M10.325 4.317a1.8 1.8 0 0 1 3.35 0l.207.62a1.8 1.8 0 0 0 2.207 1.152l.632-.19a1.8 1.8 0 0 1 2.241 1.241l.172.62a1.8 1.8 0 0 0 1.707 1.3h.66a1.8 1.8 0 0 1 1.8 1.8v.6a1.8 1.8 0 0 1-1.8 1.8h-.66a1.8 1.8 0 0 0-1.707 1.3l-.172.62a1.8 1.8 0 0 1-2.241 1.241l-.632-.19a1.8 1.8 0 0 0-2.207 1.152l-.207.62a1.8 1.8 0 0 1-3.35 0l-.207-.62a1.8 1.8 0 0 0-2.207-1.152l-.632.19a1.8 1.8 0 0 1-2.241-1.241l-.172-.62A1.8 1.8 0 0 0 3 14.1H2.34A1.8 1.8 0 0 1 .54 12.3v-.6A1.8 1.8 0 0 1 2.34 9.9H3a1.8 1.8 0 0 0 1.707-1.3l.172-.62A1.8 1.8 0 0 1 7.12 6.74l.632.19a1.8 1.8 0 0 0 2.207-1.152l.207-.62Z"/>
    <circle cx="12" cy="12" r="3.2"/>
  </svg>
)

export const IconBriefcase = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M9 7V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v1"/>
    <rect x="3" y="7" width="18" height="13" rx="2"/>
    <path d="M3 12h18"/>
  </svg>
)

export const IconCoin = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <ellipse cx="12" cy="6" rx="8" ry="3"/>
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
  </svg>
)

export const IconChart = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M3 3v18h18"/>
    <path d="M7 15l4-4 3 3 5-7"/>
  </svg>
)

export const IconCart = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="20" r="1.6"/>
    <circle cx="17" cy="20" r="1.6"/>
    <path d="M3 4h2l2.5 11.5a2 2 0 0 0 2 1.5h7a2 2 0 0 0 2-1.5L21 8H7"/>
  </svg>
)

export const IconMail = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="M3 7l9 6 9-6"/>
  </svg>
)

export const IconBrain = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M8.5 8A2.5 2.5 0 1 1 6 5.5 3.5 3.5 0 0 0 2.5 9v2A3.5 3.5 0 0 0 6 14.5V16a3 3 0 0 0 3 3h1V5H9a2.5 2.5 0 0 0-.5 3Z"/>
    <path d="M15.5 8A2.5 2.5 0 1 0 18 5.5 3.5 3.5 0 0 1 21.5 9v2A3.5 3.5 0 0 1 18 14.5V16a3 3 0 0 1-3 3h-1V5h1a2.5 2.5 0 0 1 .5 3Z"/>
  </svg>
)

export const IconInvoice = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M7 3h8l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/>
    <path d="M7 7h7"/>
    <path d="M7 11h7"/>
    <path d="M7 15h5"/>
  </svg>
)

export const IconPackage = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M21 7.5L12 3 3 7.5v9L12 21l9-4.5v-9Z"/>
    <path d="M3 7.5l9 4.5 9-4.5"/>
    <path d="M12 12v9"/>
  </svg>
)

export const IconTicket = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M4 8a2 2 0 1 0 0 4v4h16v-4a2 2 0 1 0 0-4V8H4v0Z"/>
    <path d="M9 8v8"/>
    <path d="M15 8v8"/>
  </svg>
)

export const IconNote = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M6 3h9l6 6v12a0 0 0 0 1 0 0H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/>
    <path d="M15 3v6h6"/>
  </svg>
)

export const IconStatus = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9"/>
    <path d="M8 12l2.5 2.5L16 9"/>
  </svg>
)

export const IconGlobe = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9"/>
    <path d="M3 12h18"/>
    <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z"/>
  </svg>
)

export const IconFlask = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <path d="M10 2h4"/>
    <path d="M9 2v3l-5.5 9.5A3 3 0 0 0 6 20h12a3 3 0 0 0 2.5-5.5L15 5V2"/>
    <path d="M8 12h8"/>
  </svg>
)

export const IconLock = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8">
    <rect x="5" y="10" width="14" height="10" rx="2"/>
    <path d="M8 10V8a4 4 0 1 1 8 0v2"/>
  </svg>
)

export const IconEye = () => (
  <svg {...common} stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12c2.8-4.2 6.6-6.3 10-6.3S19.2 7.8 22 12c-2.8 4.2-6.6 6.3-10 6.3S4.8 16.2 2 12Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

export const emojiIconMap = {
  '⚙️': <IconCog />,
  '💼': <IconBriefcase />,
  '🪙': <IconCoin />,
  '📊': <IconChart />,
  '🛒': <IconCart />,
  '📮': <IconMail />,
  '🧠': <IconBrain />,
  '🧾': <IconInvoice />,
  '📦': <IconPackage />,
  '🎟️': <IconTicket />,
  '📝': <IconNote />,
  '🧑‍💻': <IconStatus />,
  '🌐': <IconGlobe />,
  '📈': <IconChart />,
  '🔒': <IconLock />,
}

export const resolveIconFromEmoji = (emoji) => {
  return emojiIconMap[emoji] || <IconCog />
}


