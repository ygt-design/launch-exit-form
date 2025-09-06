import React, { useEffect, useRef, useState } from "react";
import buyerData from "../data/buyer.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// Inline feedback, no modal

const Form = styled.form`
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
  font-size: 24px;
  margin: 0;
  color: var(--primary);
`;

const Card = styled.div.attrs({ className: "card" })`
  border-color: rgba(255, 0, 168, 0.35);
  position: relative;
  &:before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 8px;
    background: var(--primary);
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
  }
`;

const ThemeScope = styled.div`
  /* Override primary locally to magenta */
  --primary: #FF00A8;
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
`;

const LabelText = styled.span`
  transition: opacity 160ms ease;
`;

const { buyerTypes, dealSizes, timelines, categories } = buyerData;

export default function BuyerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", buyerType: "", dealSize: "", timeline: "", categories: [] });
  const [touched, setTouched] = useState({});
  const [modalState, setModalState] = useState({ status: "idle", message: "" });

  const emailRef = useRef(null);
  const buyerTypeRef = useRef(null);
  const dealSizeRef = useRef(null);
  const timelineRef = useRef(null);

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
      return { ...prev, categories: next };
    });
    setTouched(prev => ({ ...prev, categories: true }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const isValid = form.email && form.buyerType && form.dealSize && form.timeline && form.categories.length > 0;
    if (!isValid) {
      setTouched({ email: true, buyerType: true, dealSize: true, timeline: true, categories: true });
      if (!form.email && emailRef.current) emailRef.current.focus();
      else if (!form.buyerType && buyerTypeRef.current) buyerTypeRef.current.focus();
      else if (!form.dealSize && dealSizeRef.current) dealSizeRef.current.focus();
      else if (!form.timeline && timelineRef.current) timelineRef.current.focus();
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
    form.categories.forEach((c) => fd.append("categories[]", c));
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
    <div className="container">
      <ThemeScope>
      <div className="stack">
        <div>
          <Title className="title">Acquire proven SaaS, without any surprises.</Title>
          <p className="subtitle" style={{ margin: "6px 0 0" }}>Unlock premium access to vetted micro-SaaS deals. Carefully reviewed listings with transparent, verified metrics.</p>
        </div>
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
              <div className="checkbox-group">
                {categories.map(c => {
                  const id = `cat-${c}`;
                  const checked = form.categories.includes(c);
                  return (
                    <label key={c} htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <input id={id} type="checkbox" className="checkbox" checked={checked} onChange={() => toggleCategory(c)} />
                      <span>{c}</span>
                    </label>
                  );
                })}
              </div>
              {touched.categories && form.categories.length === 0 && <span className="error-text">Select at least one category.</span>}
            </Section>
            <div>
              <SubmitButton
                type="submit"
                aria-busy={modalState.status === 'loading'}
                disabled={modalState.status === 'loading' || !(form.email && form.buyerType && form.dealSize && form.timeline && form.categories.length > 0)}
              >
                {modalState.status === 'loading' && (<Spinner aria-hidden="true" />)}
                <LabelText style={{ opacity: modalState.status === 'loading' ? 0 : 1 }}>
                  {modalState.status === 'success' ? 'Success! Redirecting…' : 'Join as a Buyer'}
                </LabelText>
              </SubmitButton>
              {modalState.status === 'error' && (
                <div className="error-text" style={{ marginTop: 8 }}>{modalState.message}</div>
              )}
            </div>
          </Form>
        </Card>
      </div>
      </ThemeScope>
    </div>
    </>
  );
}
 
