import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHead from "./SectionHead";
import { Stagger, StaggerItem } from "./Motion";
import { ArrowUpRight, CheckIcon, CopyIcon } from "./Icons";
import { EASE } from "../lib/motion";
import { EMAIL, GITHUB, LINKEDIN, PHONE } from "../lib/contacts";

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <button
      type="button"
      className="contactCopy"
      onClick={copy}
      aria-label={copied ? `Copied ${value}` : `Copy ${value}`}
      data-cursor="copy"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "done" : "copy"}
          initial={{ y: "120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-120%" }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </motion.span>
      </AnimatePresence>
      <span className="srOnly" aria-live="polite">{copied ? "Copied" : ""}</span>
    </button>
  );
}

export default function Contact({ text }) {
  const rows = [
    { ...PHONE, label: text.phone, hint: text.phoneHint },
    { ...EMAIL, label: text.email, hint: text.emailHint, copy: EMAIL.value },
    { ...GITHUB, label: text.github, hint: text.githubHint, external: true },
    { ...LINKEDIN, label: text.linkedin, hint: text.linkedinHint, external: true },
  ];

  return (
    <>
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} chapter="signal" />

      <section className="chapter contactList" data-chapter="ink" aria-label={text.eyebrow}>
        <Stagger as="ul" className="wrap contactRows" gap={0.09}>
          {rows.map((row) => (
            <StaggerItem as="li" className="contactRow" key={row.href}>
              <span className="contactLabel">{row.label}</span>
              <div className="contactMain">
                <a
                  className="contactValue"
                  href={row.href}
                  data-cursor="open"
                  {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {row.value}
                </a>
                <span className="contactHint">{row.hint}</span>
              </div>
              <div className="contactActions">
                {row.copy ? <CopyButton value={row.copy} /> : null}
                <span className="contactArrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
