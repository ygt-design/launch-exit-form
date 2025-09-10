import React, { useEffect, useRef, useState } from "react";
import buyerData from "../data/buyer.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// Inline feedback, no modal

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  
  .control {
    transition: all 0.2s ease;
    
    &:focus-within {
      transform: translateY(-1px);
    }
  }
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
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
  }
`;
const Input = styled.input.attrs({ className: "input" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: var(--primary);
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 100%;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;


const ThemeScope = styled.div`
  /* Override primary locally to a more subtle blue-green */
  --primary: #00B4D8;
  --primary-gradient: linear-gradient(135deg, #00B4D8 0%, #0077B6 100%);
  --primary-shadow-strong: rgba(0, 180, 216, 0.25);
  --primary-shadow-weak: rgba(0, 180, 216, 0.15);
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
  width: 100%;
  
  @media (max-width: 480px) {
    min-width: auto;
  }
`;

const LabelText = styled.span`
  transition: opacity 160ms ease;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--primary-gradient);
  border-radius: 2px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
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
  
  &:hover { border-color: rgba(0, 180, 216, 0.35); }
  &:focus-within { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15); }
  
  &[data-checked="true"] {
    border-color: rgba(0, 180, 216, 0.65);
    background: #0a1a2e;
    color: #ffffff;
  }
`;

const { buyerTypes, dealSizes, timelines, categories } = buyerData;

export default function BuyerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", buyerType: "", dealSize: "", timeline: "", categories: [], otherCategory: "" });
  const [touched, setTouched] = useState({});
  const [modalState, setModalState] = useState({ status: "idle", message: "" });

  // Calculate form completion progress
  const calculateProgress = () => {
    const requiredFields = ['email', 'buyerType', 'dealSize', 'timeline'];
    const filledFields = requiredFields.filter(field => form[field] && form[field].trim() !== '');
    const categoriesFilled = form.categories.length > 0;
    const otherCategoryNeeded = form.categories.includes('Other');
    const otherCategoryFilled = !otherCategoryNeeded || (form.otherCategory && form.otherCategory.trim() !== '');
    
    const totalFields = requiredFields.length + 1 + (otherCategoryNeeded ? 1 : 0); // +1 for categories
    const filledTotal = filledFields.length + (categoriesFilled ? 1 : 0) + (otherCategoryFilled ? 1 : 0);
    
    return Math.round((filledTotal / totalFields) * 100);
  };

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
    <div className="container">
      <ThemeScope>
        <FormContainer>
          <div>
            <Title className="title">Acquire proven SaaS, without any surprises.</Title>
            <p className="subtitle" style={{ margin: "6px 0 0" }}>Unlock premium access to vetted micro-SaaS deals. Carefully reviewed listings with transparent, verified metrics.</p>
          </div>
          <Form onSubmit={onSubmit} noValidate>
            <ProgressBar>
              <ProgressFill progress={calculateProgress()} />
            </ProgressBar>
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
              <p className="subtitle" style={{ fontSize: 12, margin: "8px 0 0" }}>Your privacy matters to us. Takes about 30 seconds to complete.</p>
            </div>
          </Form>
        </FormContainer>
      </ThemeScope>
    </div>
  );
}
 
