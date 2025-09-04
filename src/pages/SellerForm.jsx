import React, { useState } from "react";
import sellerData from "../data/seller.json";
import Modal, { LoadingRow } from "../components/Modal.jsx";
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
`;

const Select = styled.select.attrs({ className: "select" })``;
const Input = styled.input.attrs({ className: "input" })``;

const { stages, mrrBands, categories } = sellerData;

export default function SellerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", startupName: "", productUrl: "", stage: "", mrr: "", category: "" });
  const [touched, setTouched] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState({ status: "idle", message: "" }); // idle | loading | success | error

  function update(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const isValid = form.email && form.startupName && form.productUrl && form.stage && form.mrr && form.category;
    if (!isValid) {
      setTouched({ email: true, startupName: true, productUrl: true, stage: true, mrr: true, category: true });
      return;
    }
    setModalState({ status: "loading", message: "Submitting your details" });
    setModalOpen(true);
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
    fd.append("category", form.category);
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
          <h1 className="title" style={{ fontSize: 24, margin: 0 }}>Seller waitlist</h1>
          <p className="subtitle" style={{ margin: "6px 0 0" }}>Tell us about your startup.</p>
        </div>
        <div className="card">
          <Form onSubmit={onSubmit} noValidate>
            <Section className="control">
              <Label htmlFor="email">Working e‑mail</Label>
              <Input id="email" name="email" type="email" placeholder="you@company.com" required aria-invalid={touched.email && !form.email ? "true" : undefined} value={form.email} onChange={update} />
              {touched.email && !form.email && <span className="error-text">Please enter your email.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="startupName">Startup name</Label>
              <Input id="startupName" name="startupName" type="text" placeholder="Acme Inc." required aria-invalid={touched.startupName && !form.startupName ? "true" : undefined} value={form.startupName} onChange={update} />
              {touched.startupName && !form.startupName && <span className="error-text">Startup name is required.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="productUrl">Link to live product</Label>
              <Input id="productUrl" name="productUrl" type="url" placeholder="https://…" required aria-invalid={touched.productUrl && !form.productUrl ? "true" : undefined} value={form.productUrl} onChange={update} />
              {touched.productUrl && !form.productUrl && <span className="error-text">Product link is required.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="stage">Current stage</Label>
              <Select id="stage" name="stage" required aria-invalid={touched.stage && !form.stage ? "true" : undefined} value={form.stage} onChange={update}>
                <option value="" disabled>Select stage</option>
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.stage && !form.stage && <span className="error-text">Please select a stage.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="mrr">Monthly revenue (MRR)</Label>
              <Select id="mrr" name="mrr" required aria-invalid={touched.mrr && !form.mrr ? "true" : undefined} value={form.mrr} onChange={update}>
                <option value="" disabled>Select MRR</option>
                {mrrBands.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.mrr && !form.mrr && <span className="error-text">Please select MRR.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="category">Category</Label>
              <Select id="category" name="category" required aria-invalid={touched.category && !form.category ? "true" : undefined} value={form.category} onChange={update}>
                <option value="" disabled>Select a category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
              {touched.category && !form.category && <span className="error-text">Please select a category.</span>}
            </Section>
            <div>
              <button className="button" type="submit" disabled={!(form.email && form.startupName && form.productUrl && form.stage && form.mrr && form.category)}>Join seller waitlist</button>
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
 
