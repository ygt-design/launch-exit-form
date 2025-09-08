import React from 'react'
import styled from 'styled-components'
import Marquee from 'react-fast-marquee'

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative;
  --fade-size: 400px;
  margin-bottom: -10px;

  @media (min-width: 1024px) {
    margin-bottom: -20px;
    &::before, &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--fade-size);
      pointer-events: none;
      z-index: 2;
    }
    &::before { left: 0; background: linear-gradient(to right, var(--background) 0%, var(--background) 25%, transparent 100%); }
    &::after { right: 0; background: linear-gradient(to left, var(--background) 0%, var(--background) 25%, transparent 100%); }
  }
`
const Strip = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 0;

  @media (min-width: 768px) { gap: 28px; padding: 14px 0; }
  @media (min-width: 1024px) { gap: 40px; padding: 16px 0; }
`

const Phrase = styled.span`
  color: var(--muted);
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.01em;
`

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  display: inline-block;

  @media (min-width: 768px) { width: 8px; height: 8px; }
  @media (min-width: 1024px) { width: 10px; height: 10px; }
`

export default function TextCarousel() {
  const phrases = [
    'Exclusive Perks for Early Sellers & Buyers',
    'LaunchExit — Premium‑vetted micro‑SaaS • Transparent metrics • Human review',
  ]

  return (
    <Wrapper aria-label="text carousel">
      <Marquee gradient={false} speed={12} pauseOnHover={false} direction="right" autoFill>
        {phrases.map((t, i) => (
          <div key={i} style={{ display: 'inline-block', marginRight: 24 }}>
            <Strip>
              <Phrase>{t}</Phrase>
              <Dot aria-hidden="true" />
            </Strip>
          </div>
        ))}
      </Marquee>
    </Wrapper>
  )
}


