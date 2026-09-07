"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      setStatus(result.message);
      if (response.ok) form.reset();
    } catch {
      setStatus("We could not send your message. Please email us directly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" /></div>
      <div className="field"><label htmlFor="subject">Subject</label><select id="subject" name="subject" required defaultValue=""><option value="" disabled>Select a topic</option><option>Communications strategy</option><option>Media relations</option><option>Thought leadership</option><option>Crisis counsel</option><option>Something else</option></select></div>
      <div className="field full"><label htmlFor="message">Message</label><textarea id="message" name="message" required minLength={20} /></div>
      <div className="form-footer"><p className="form-note">Fields marked by their required state must be completed.</p><button className="button" disabled={pending}>{pending ? "Sending…" : "Send enquiry →"}</button></div>
      {status && <p className="form-status" role="status">{status}</p>}
    </form>
  );
}
