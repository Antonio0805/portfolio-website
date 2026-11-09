import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import { ArrowUpRight, CheckIcon, CopyIcon } from "./Icons";
import { EMAIL, GITHUB, LINKEDIN, PHONE } from "../lib/contacts";

function CopyButton({ value, text }) {
  const [status, setStatus] = useState("idle");
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <>
      <button
        type="button"
        className="contactCopy"
        data-copied={status === "copied"}
        onClick={copy}
        aria-label={status === "copied" ? text.copied : text.copyEmail}
      >
        {status === "copied" ? <CheckIcon /> : <CopyIcon />}
      </button>
      <span className="contactFeedback" role="status">
        {status === "copied"
          ? text.copied
          : status === "error"
            ? text.copyError
            : ""}
      </span>
    </>
  );
}

export default function Contact({ text }) {
  const rows = [
    { ...EMAIL, label: text.email, hint: text.emailHint, copy: true },
    {
      ...LINKEDIN,
      display: "Antonio Smărăndescu",
      label: text.linkedin,
      hint: text.linkedinHint,
      external: true,
    },
    { ...GITHUB, label: text.github, hint: text.githubHint, external: true },
    { ...PHONE, label: text.phone, hint: text.phoneHint },
  ];
  return (
    <>
      <SectionHead title={text.title} lead={text.lead} />
      <section
        className="chapter contactList"
        data-chapter="paper"
        aria-label={text.eyebrow}
      >
        <ul className="wrap contactRows">
          {rows.map((row) => (
            <li className="contactRow" key={row.href}>
              <span className="contactLabel">{row.label}</span>
              <div className="contactMain">
                <a
                  className="contactValue"
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {row.display || row.value}
                  <ArrowUpRight />
                </a>
                <span className="contactHint">{row.hint}</span>
              </div>
              {row.copy ? (
                <div className="contactActions">
                  <CopyButton value={row.value} text={text} />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
