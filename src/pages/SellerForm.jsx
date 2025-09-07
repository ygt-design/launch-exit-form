import React, { useEffect, useRef, useState } from "react";
import sellerData from "../data/seller.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  &.required::after {
    content: " *";
    color: var(--primary);
  }
`;

const Select = styled.select.attrs({ className: "select" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 76, 0, 0.15);
  }
`;
const Input = styled.input.attrs({ className: "input" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 76, 0, 0.15);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: var(--primary);
`;

const Card = styled.div.attrs({ className: "card" })`
  border-color: rgba(255, 76, 0, 0.35);
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

const { stages, mrrBands, categories } = sellerData;

export default function SellerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", startupName: "", productUrl: "", stage: "", mrr: "", category: "", otherCategory: "" });
  const [touched, setTouched] = useState({});
  const [modalState, setModalState] = useState({ status: "idle", message: "" }); 

  const emailRef = useRef(null);
  const startupNameRef = useRef(null);
  const productUrlRef = useRef(null);
  const stageRef = useRef(null);
  const mrrRef = useRef(null);
  const categoryRef = useRef(null);
  const otherCategoryRef = useRef(null);

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sellerFormDraft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm(prev => ({ ...prev, ...parsed }));
      }
    } catch { /* ignore unavailable localStorage */ }
  }, []);

  // Persist draft
  useEffect(() => {
    try {
      localStorage.setItem("sellerFormDraft", JSON.stringify(form));
    } catch { /* ignore unavailable localStorage */ }
  }, [form]);

  function update(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && value !== 'Other' ? { otherCategory: '' } : null),
    }));
  }

  function markTouched(name) {
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const needsOther = form.category === 'Other';
    const isValid = form.email && form.startupName && form.productUrl && form.stage && form.mrr && form.category && (!needsOther || !!form.otherCategory);
    if (!isValid) {
      setTouched({ email: true, startupName: true, productUrl: true, stage: true, mrr: true, category: true, ...(form.category === 'Other' ? { otherCategory: true } : {}) });
      if (!form.email && emailRef.current) emailRef.current.focus();
      else if (!form.startupName && startupNameRef.current) startupNameRef.current.focus();
      else if (!form.productUrl && productUrlRef.current) productUrlRef.current.focus();
      else if (!form.stage && stageRef.current) stageRef.current.focus();
      else if (!form.mrr && mrrRef.current) mrrRef.current.focus();
      else if (!form.category && categoryRef.current) categoryRef.current.focus();
      else if (form.category === 'Other' && !form.otherCategory && otherCategoryRef.current) otherCategoryRef.current.focus();
      return;
    }
    setModalState({ status: "loading", message: "Submitting your details" });
    const formspreeId = import.meta.env.VITE_FORMSPREE_SELLER_ID;
    if (!formspreeId) {
      setModalState({ status: "error", message: "Missing VITE_FORMSPREE_SELLER_ID in .env" });
      return;
    }
    const endpoint = `https://formspree.io/f/${formspreeId}`;
    const fd = new FormData();
    fd.append("email", form.email);
    fd.append("startupName", form.startupName);
    fd.append("productUrl", form.productUrl);
    fd.append("stage", form.stage);
    fd.append("mrr", form.mrr);
    const categoryToSend = form.category === 'Other' ? form.otherCategory : form.category;
    fd.append("category", categoryToSend);
    fd.append("_replyto", form.email);
    fd.append("_subject", "FormExit — Seller waitlist");
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
        try { localStorage.removeItem("sellerFormDraft"); } catch { /* ignore */ }
        setTimeout(() => navigate("/thanks?seller=1"), 600);
      })
      .catch((err) => {
        setModalState({ status: "error", message: err?.message || "Something went wrong. Please try again." });
      });
  }

  return (
    <>
    <div className="container">
      <div className="stack">
        <div>
          <Title className="title">Exit without hassle. Focus on what’s next.</Title>
          <p className="subtitle" style={{ margin: "6px 0 0" }}>Join early. Earn a badge and priority visibility on launch day.</p>
        </div>
        <Card>
          <Form onSubmit={onSubmit} noValidate>
            <Section className="control">
              <Label htmlFor="email" className="required">Working e‑mail</Label>
              <Input id="email" ref={emailRef} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" required aria-invalid={touched.email && !form.email ? "true" : undefined} value={form.email} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
              {touched.email && !form.email && <span className="error-text">Please enter your email.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="startupName" className="required">Startup name</Label>
              <Input id="startupName" ref={startupNameRef} name="startupName" type="text" autoComplete="organization" placeholder="Acme Inc." required aria-invalid={touched.startupName && !form.startupName ? "true" : undefined} value={form.startupName} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
              {touched.startupName && !form.startupName && <span className="error-text">Startup name is required.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="productUrl" className="required">Link to live product</Label>
              <Input id="productUrl" ref={productUrlRef} name="productUrl" type="url" inputMode="url" autoComplete="url" spellCheck={false} placeholder="https://…" required aria-invalid={touched.productUrl && !form.productUrl ? "true" : undefined} value={form.productUrl} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
              <span className="subtitle" style={{ fontSize: 12 }}>Use your public product URL (start with https://)</span>
              {touched.productUrl && !form.productUrl && <span className="error-text">Product link is required.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="stage" className="required">Current stage</Label>
              <Select id="stage" ref={stageRef} name="stage" required aria-invalid={touched.stage && !form.stage ? "true" : undefined} value={form.stage} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select stage</option>
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.stage && !form.stage && <span className="error-text">Please select a stage.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="mrr" className="required">Monthly revenue (MRR)</Label>
              <Select id="mrr" ref={mrrRef} name="mrr" required aria-invalid={touched.mrr && !form.mrr ? "true" : undefined} value={form.mrr} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select MRR</option>
                {mrrBands.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.mrr && !form.mrr && <span className="error-text">Please select MRR.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="category" className="required">Category</Label>
              <Select id="category" ref={categoryRef} name="category" required aria-invalid={touched.category && !form.category ? "true" : undefined} value={form.category} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select a category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
              {touched.category && !form.category && <span className="error-text">Please select a category.</span>}
              {form.category === 'Other' && (
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
                disabled={modalState.status === 'loading' || !(form.email && form.startupName && form.productUrl && form.stage && form.mrr && form.category && (form.category !== 'Other' ? true : !!form.otherCategory))}
              >
                {modalState.status === 'loading' && (
                  <Spinner aria-hidden="true" />
                )}
                <LabelText style={{ opacity: modalState.status === 'loading' ? 0 : 1 }}>
                  {modalState.status === 'success' ? 'Success! Redirecting…' : 'Join as a Seller'}
                </LabelText>
              </SubmitButton>
              {modalState.status === 'error' && (
                <div className="error-text" style={{ marginTop: 8 }}>{modalState.message}</div>
              )}
              <p className="subtitle" style={{ fontSize: 12, margin: "8px 0 0" }}>We’ll never share your email. ~30 seconds to complete.</p>
            </div>
          </Form>
        </Card>
      </div>
    </div>
    </>
  );
}
 
