import React, { useState } from "react";
import buyerData from "../data/buyer.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal, { LoadingRow } from "../components/Modal.jsx";

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
`;

const Select = styled.select.attrs({ className: "select" })``;
const Input = styled.input.attrs({ className: "input" })``;

const { buyerTypes, dealSizes, timelines, categories } = buyerData;

export default function BuyerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", buyerType: "", dealSize: "", timeline: "", categories: [] });
  const [touched, setTouched] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState({ status: "idle", message: "" });

  function update(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  }

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
      return;
    }
    setModalState({ status: "loading", message: "Submitting your details" });
    setModalOpen(true);
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
        setTimeout(() => navigate("/thanks?buyer=1"), 600);
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
          <h1 className="title" style={{ fontSize: 24, margin: 0 }}>Buyer waitlist</h1>
          <p className="subtitle" style={{ margin: "6px 0 0" }}>Tell us what you are looking for.</p>
        </div>
        <div className="card">
          <Form onSubmit={onSubmit} noValidate>
            <Section className="control">
              <Label htmlFor="email">E‑mail</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required aria-invalid={touched.email && !form.email ? "true" : undefined} value={form.email} onChange={update} />
              {touched.email && !form.email && <span className="error-text">Please enter your email.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="buyerType">Buyer type</Label>
              <Select id="buyerType" name="buyerType" required aria-invalid={touched.buyerType && !form.buyerType ? "true" : undefined} value={form.buyerType} onChange={update}>
                <option value="" disabled>Select type</option>
                {buyerTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.buyerType && !form.buyerType && <span className="error-text">Please select a buyer type.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="dealSize">Target deal size</Label>
              <Select id="dealSize" name="dealSize" required aria-invalid={touched.dealSize && !form.dealSize ? "true" : undefined} value={form.dealSize} onChange={update}>
                <option value="" disabled>Select size</option>
                {dealSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.dealSize && !form.dealSize && <span className="error-text">Please select a target deal size.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="timeline">Acquisition timeline</Label>
              <Select id="timeline" name="timeline" required aria-invalid={touched.timeline && !form.timeline ? "true" : undefined} value={form.timeline} onChange={update}>
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
              <button className="button" type="submit" disabled={!(form.email && form.buyerType && form.dealSize && form.timeline && form.categories.length > 0)}>Join buyer waitlist</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <Modal
        open={modalOpen}
        title={modalState.status === 'loading' ? 'Sending' : modalState.status === 'success' ? 'Success' : modalState.status === 'error' ? 'Error' : ''}
        onClose={() => { if (modalState.status !== 'loading') setModalOpen(false); }}
        footer={modalState.status === 'error' ? (
          <>
            <button className="button secondary" onClick={() => setModalOpen(false)}>Close</button>
            <button className="button" onClick={onSubmit}>Retry</button>
          </>
        ) : null}
      >
        {modalState.status === 'loading' && <LoadingRow text="Submitting…" />}
        {modalState.status === 'success' && <div>Thanks! We’re processing your submission.</div>}
        {modalState.status === 'error' && <div className="error-text">{modalState.message}</div>}
      </Modal>
    </>
  );
}
 
