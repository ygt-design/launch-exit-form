import React, { useEffect, useRef, useState } from "react";
import buyerData from "../data/buyer.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// Inline feedback, no modal

const Form = styled.form.attrs({ id: "buyerForm" })`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  &.required::after { content: " *"; color: var(--primary); }
`;

const Select = styled.select.attrs({ className: "select" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 0, 168, 0.15);
  }
`;
const Input = styled.input.attrs({ className: "input" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 0, 168, 0.15);
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  color: var(--foreground);
  text-align: left;
`;

const Accent = styled.span`
  color: var(--primary);
`;

const Lead = styled.p`
  font-size: 1rem;
  color: var(--muted);
  margin: 6px 0 0;
  text-align: left;
`;

const HeaderWrap = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 50px 20px;

  @media (min-width: 1024px) {
    border-top: none;
    border-bottom: none;
  }
`;

const HeaderInner = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 20px;
`;

const Card = styled.div`
  border: none;
  border-radius: var(--radius);
  position: relative;
  background: transparent !important;
`;

const ThemeScope = styled.div`
  /* Override primary locally to magenta */
  --primary: #FF00A8;
  --primary-gradient: linear-gradient(90deg, #FF00A8 0%, #FF00A8 20%, #FF5BCD 100%);
  --primary-shadow-strong: rgba(255, 91, 205, 0.35);
  --primary-shadow-weak: rgba(255, 91, 205, 0.25);
`;

const Hero = styled.div`
  position: relative;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    left: -16vw;
    top: -60px;
    width: 72vw;
    max-width: 820px;
    height: 420px;
    background: radial-gradient(closest-side at 35% 50%, rgba(255, 0, 168, 0.55) 0%, rgba(255, 0, 168, 0.24) 30%, rgba(255, 0, 168, 0) 85%);
    filter: blur(100px);
    opacity: 0.9;
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: 480px) {
    &::before {
      left: -40vw;
      top: -65px;
      width: 150vw;
      max-width: none;
      height: 420px;
      filter: blur(60px);
    }
  }
`;

const Spinner = styled.span`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
  border-top-color: #ffffff;
  animation: spin 700ms linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const SubmitButton = styled.button.attrs({ className: "button primary" })`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;

  @media (max-width: 480px) { width: 100%; }
`;

const LabelText = styled.span`
  transition: opacity 160ms ease;
`;

const PageWrap = styled.div`
  padding-bottom: 140px;
`;

const CtaBar = styled.div`
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 1000;
  border-top: 1px solid var(--border);
  background: var(--background);
  padding: 20px 16px;
  
  @media (min-width: 1024px) { border-top: none; }
`;

const CtaInner = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 8px;
  align-items: start;
  justify-items: start;
`;

const CtaLabel = styled.div`
  font-size: .85rem;
  justify-self: start;
`;

const BackLink = styled.button`
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: .85rem;
  cursor: pointer;
  padding: 0;
  margin-top: 10px;
  &:hover { color: var(--foreground); }
`;

// Contemporary multi-select chip
const CategoryOption = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #111315;
  cursor: pointer;
  user-select: none;
  color: var(--foreground);
  font-size: 14px;
  transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease;
  
  &:hover { border-color: rgba(255, 0, 168, 0.35); }
  &:focus-within { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(255, 0, 168, 0.15); }
  
  &[data-checked="true"] {
    border-color: rgba(255, 0, 168, 0.65);
    background: #18101c;
    color: #ffffff;
  }
`;

const { buyerTypes, dealSizes, timelines, categories } = buyerData;

export default function BuyerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", buyerType: "", dealSize: "", timeline: "", categories: [], otherCategory: "" });
  const [touched, setTouched] = useState({});
  const [modalState, setModalState] = useState({ status: "idle", message: "" });

  const emailRef = useRef(null);
  const buyerTypeRef = useRef(null);
  const dealSizeRef = useRef(null);
  const timelineRef = useRef(null);
  const otherCategoryRef = useRef(null);

  // Draft load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("buyerFormDraft");
      if (saved) setForm(prev => ({ ...prev, ...JSON.parse(saved) }));
    } catch { /* ignore */ }
  }, []);

  // Draft persist
  useEffect(() => {
    try { localStorage.setItem("buyerFormDraft", JSON.stringify(form)); } catch { /* ignore */ }
  }, [form]);

  function update(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function markTouched(name) { setTouched(prev => ({ ...prev, [name]: true })); }

  function toggleCategory(value) {
    setForm(prev => {
      const exists = prev.categories.includes(value);
      const next = exists ? prev.categories.filter(v => v !== value) : [...prev.categories, value];
      const clearedOther = value === 'Other' && exists ? { otherCategory: '' } : {};
      return { ...prev, categories: next, ...clearedOther };
    });
    setTouched(prev => ({ ...prev, categories: true }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const includesOther = form.categories.includes('Other');
    const isValid = form.email && form.buyerType && form.dealSize && form.timeline && form.categories.length > 0 && (!includesOther || !!form.otherCategory);
    if (!isValid) {
      setTouched({ email: true, buyerType: true, dealSize: true, timeline: true, categories: true, ...(includesOther ? { otherCategory: true } : {}) });
      if (!form.email && emailRef.current) emailRef.current.focus();
      else if (!form.buyerType && buyerTypeRef.current) buyerTypeRef.current.focus();
      else if (!form.dealSize && dealSizeRef.current) dealSizeRef.current.focus();
      else if (!form.timeline && timelineRef.current) timelineRef.current.focus();
      else if (includesOther && !form.otherCategory && otherCategoryRef.current) otherCategoryRef.current.focus();
      return;
    }
    setModalState({ status: "loading", message: "Submitting your details" });
    const formspreeId = import.meta.env.VITE_FORMSPREE_BUYER_ID;
    if (!formspreeId) {
      setModalState({ status: "error", message: "Missing VITE_FORMSPREE_BUYER_ID in .env" });
      return;
    }
    const endpoint = `https://formspree.io/f/${formspreeId}`;
    const fd = new FormData();
    fd.append("email", form.email);
    fd.append("buyerType", form.buyerType);
    fd.append("dealSize", form.dealSize);
    fd.append("timeline", form.timeline);
    form.categories.forEach((c) => fd.append("categories[]", c === 'Other' ? form.otherCategory : c));
    fd.append("_replyto", form.email);
    fd.append("_subject", "FormExit — Buyer waitlist");
    fetch(endpoint, { method: "POST", headers: { "Accept": "application/json" }, body: fd })
      .then(async (r) => {
        if (!r.ok) {
          let msg = "Request failed";
          const ct = r.headers.get("content-type") || "";
          if (ct.includes("application/json")) {
            const data = await r.json();
            msg = (data.errors && data.errors.map(e => e.message).join(", ")) || data.error || msg;
          } else {
            const text = await r.text();
            msg = text || msg;
          }
          throw new Error(msg);
        }
        setModalState({ status: "success", message: "Submission received. Redirecting…" });
        try { localStorage.removeItem("buyerFormDraft"); } catch { /* ignore */ }
        setTimeout(() => navigate("/thanks?buyer=1"), 600);
      })
      .catch((err) => {
        setModalState({ status: "error", message: err?.message || "Something went wrong. Please try again." });
      });
  }

  return (
    <>
    <ThemeScope>
    <PageWrap>
    <div className="container">
      <div className="stack">
        <HeaderWrap>
          <HeaderInner>
            <Hero>
              <Title className="title">Acquire proven SaaS, <Accent>without any surprises.</Accent></Title>
              <Lead className="subtitle">Unlock premium access to vetted micro-SaaS deals. Carefully reviewed listings with transparent, verified metrics.</Lead>
            </Hero>
          </HeaderInner>
        </HeaderWrap>
        <Card>
          <Form onSubmit={onSubmit} noValidate>
            <Section className="control">
              <Label htmlFor="email" className="required">E‑mail</Label>
              <Input id="email" ref={emailRef} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required aria-invalid={touched.email && !form.email ? "true" : undefined} value={form.email} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
              {touched.email && !form.email && <span className="error-text">Please enter your email.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="buyerType" className="required">Buyer type</Label>
              <Select id="buyerType" ref={buyerTypeRef} name="buyerType" required aria-invalid={touched.buyerType && !form.buyerType ? "true" : undefined} value={form.buyerType} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select type</option>
                {buyerTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.buyerType && !form.buyerType && <span className="error-text">Please select a buyer type.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="dealSize" className="required">Target deal size</Label>
              <Select id="dealSize" ref={dealSizeRef} name="dealSize" required aria-invalid={touched.dealSize && !form.dealSize ? "true" : undefined} value={form.dealSize} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select size</option>
                {dealSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.dealSize && !form.dealSize && <span className="error-text">Please select a target deal size.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="timeline" className="required">Acquisition timeline</Label>
              <Select id="timeline" ref={timelineRef} name="timeline" required aria-invalid={touched.timeline && !form.timeline ? "true" : undefined} value={form.timeline} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select timeline</option>
                {timelines.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.timeline && !form.timeline && <span className="error-text">Please select a timeline.</span>}
            </Section>
            <Section className="control">
              <Label>Preferred categories</Label>
              <div className="checkbox-group" style={{ gap: 10 }}>
                {categories.map(c => {
                  const id = `cat-${c}`;
                  const checked = form.categories.includes(c);
                  return (
                    <CategoryOption key={c} htmlFor={id} data-checked={checked ? "true" : undefined}>
                      <input
                        id={id}
                        type="checkbox"
                        className="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(c)}
                        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
                      />
                      <span>{c}</span>
                    </CategoryOption>
                  );
                })}
              </div>
              {touched.categories && form.categories.length === 0 && <span className="error-text">Select at least one category.</span>}
              {form.categories.includes('Other') && (
                <div className="control" style={{ marginTop: 8 }}>
                  <Label htmlFor="otherCategory" className="required">Other category</Label>
                  <Input id="otherCategory" ref={otherCategoryRef} name="otherCategory" type="text" placeholder="Describe your category" required aria-invalid={touched.otherCategory && !form.otherCategory ? "true" : undefined} value={form.otherCategory} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  {touched.otherCategory && !form.otherCategory && <span className="error-text">Please enter your category.</span>}
                </div>
              )}
            </Section>
            {/* CTA moved to fixed bottom bar */}
          </Form>
        </Card>
      </div>
    </div>
    </PageWrap>
    <CtaBar role="region" aria-label="Buyer form actions">
      <CtaInner>
        <CtaLabel>Secure your early badge</CtaLabel>
        <SubmitButton
          type="submit"
          form="buyerForm"
          aria-busy={modalState.status === 'loading'}
          disabled={modalState.status === 'loading' || !(form.email && form.buyerType && form.dealSize && form.timeline && form.categories.length > 0)}
        >
          {modalState.status === 'loading' && (<Spinner aria-hidden="true" />)}
          <LabelText style={{ opacity: modalState.status === 'loading' ? 0 : 1 }}>
            {modalState.status === 'success' ? 'Success! Redirecting…' : 'Join as a Buyer'}
          </LabelText>
        </SubmitButton>
        {modalState.status === 'error' && (
          <div className="error-text" style={{ marginTop: 4 }}>{modalState.message}</div>
        )}
        <BackLink type="button" onClick={() => navigate('/')}>← Back to home</BackLink>
      </CtaInner>
    </CtaBar>
    </ThemeScope>
    </>
  );
}
 
