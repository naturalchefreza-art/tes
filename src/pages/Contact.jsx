import { useState } from "react";
import { Phone, Mail, Pin, Clock, Check } from "../components/Icons";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="bg-white">
      <div className="bg-charcoal py-12">
        <div className="container-x text-center">
          <h1 className="text-3xl font-bold uppercase text-white sm:text-4xl">Contact Us</h1>
          <p className="mt-3 text-sm text-white/60">We answer within one business day</p>
        </div>
      </div>

      <div className="container-x grid gap-8 py-14 lg:grid-cols-[1fr_380px]">
        <div className="border border-gray-100 bg-white p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Send a Message</h2>
          {sent ? (
            <div className="mt-6 flex items-start gap-3 border border-accent/40 bg-accent/10 p-5">
              <Check size={20} className="mt-0.5 shrink-0 text-accent" />
              <div className="text-sm text-ink">
                <p className="font-semibold">Thanks, {form.name.split(" ")[0] || "friend"}!</p>
                <p className="mt-1 text-body">Your message has been received — we'll reply to {form.email || "your email"} shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ct-name" className="mb-1.5 block text-xs font-medium uppercase text-ink">Name</label>
                <input id="ct-name" required value={form.name} onChange={set("name")} className="input" />
              </div>
              <div>
                <label htmlFor="ct-email" className="mb-1.5 block text-xs font-medium uppercase text-ink">Email</label>
                <input id="ct-email" type="email" required value={form.email} onChange={set("email")} className="input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="ct-subject" className="mb-1.5 block text-xs font-medium uppercase text-ink">Subject</label>
                <input id="ct-subject" required value={form.subject} onChange={set("subject")} className="input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="ct-msg" className="mb-1.5 block text-xs font-medium uppercase text-ink">Message</label>
                <textarea id="ct-msg" required rows={5} value={form.message} onChange={set("message")} className="input resize-y" />
              </div>
              <button type="submit" className="btn-yellow sm:col-span-2">Send Message</button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <div className="border border-gray-100 bg-light p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Get in Touch</h2>
            <ul className="mt-5 space-y-4 text-sm text-body">
              <li className="flex gap-3">
                <Pin size={17} className="mt-0.5 shrink-0 text-accent" />
                28 Industrial Avenue, Suite 400, Chicago, IL 60607, USA
              </li>
              <li>
                <a href="tel:+15552467890" className="flex items-center gap-3 transition-colors hover:text-ink">
                  <Phone size={17} className="shrink-0 text-accent" /> (555) 246-7890
                </a>
              </li>
              <li>
                <a href="mailto:support@armania-tools.com" className="flex items-center gap-3 transition-colors hover:text-ink">
                  <Mail size={17} className="shrink-0 text-accent" /> support@armania-tools.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={17} className="mt-0.5 shrink-0 text-accent" />
                Mon–Fri: 8:00 – 19:00<br />Saturday: 9:00 – 17:00
              </li>
            </ul>
          </div>
          <div className="border border-gray-100 bg-charcoal p-6 text-white">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Need tool advice?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Call us and talk to a real builder — we'll help you pick the right machine,
              blade or battery for your job.
            </p>
            <a href="tel:+15552467890" className="btn-yellow mt-5 w-full">Call (555) 246-7890</a>
          </div>
        </aside>
      </div>
    </main>
  );
}
