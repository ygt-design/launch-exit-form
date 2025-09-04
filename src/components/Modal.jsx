import React from "react";
import styled, { keyframes } from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Dialog = styled.div`
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: #111315;
  padding: 20px;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
`;

const spinner = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spinner} 0.8s linear infinite;
`;

export default function Modal({ open, title, children, footer, onClose }) {
  if (!open) return null;
  return (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        {title ? <Title className="title">{title}</Title> : null}
        <div className="stack" style={{ gap: 12 }}>
          {children}
        </div>
        {footer ? (
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            {footer}
          </div>
        ) : null}
      </Dialog>
    </Overlay>
  );
}

export function LoadingRow({ text = "Submitting…" }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Spinner aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

Modal.propTypes = {
  open: () => {},
  title: () => {},
  children: () => {},
  footer: () => {},
  onClose: () => {},
};

LoadingRow.propTypes = {
  text: () => {},
};


