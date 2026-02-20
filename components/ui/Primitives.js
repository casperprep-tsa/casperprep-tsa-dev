import Link from "next/link";

export function Badge({ children, variant = "orange" }) {
  const styles = {
    orange: "bg-brand-orange-light text-brand-orange-dark border border-brand-orange",
    blue: "bg-brand-blue-light text-brand-blue border border-brand-blue",
    green: "bg-green-50 text-green-700 border border-green-500",
  };
  return (
    <span className={`${styles[variant]} px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase inline-block`}>
      {children}
    </span>
  );
}

export function Btn({ children, onClick, variant = "primary", size = "md", full = false, href, external = false, className = "" }) {
  const base = "font-body font-semibold rounded-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer border-none no-underline";
  const sizes = { sm: "px-5 py-2.5 text-[13px]", md: "px-7 py-3 text-[15px]", lg: "px-9 py-4 text-[17px]" };
  const variants = {
    primary: "bg-brand-orange text-white hover:brightness-110",
    secondary: "bg-brand-orange-light text-brand-orange border-2 !border-brand-orange hover:brightness-95",
    dark: "bg-brand-blue text-white hover:brightness-110",
    ghost: "bg-transparent text-ink-soft border !border-surface-border hover:bg-gray-50",
    white: "bg-white text-brand-blue hover:bg-gray-50",
  };
  const w = full ? "w-full" : "";
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${w} ${className}`;

  if (href && external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  }
  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[11px] font-bold tracking-[2.5px] uppercase text-brand-orange mb-3.5">
      {children}
    </p>
  );
}

export function BrandMark({ light = false, scrolled = false }) {
  const textColor = light ? "text-white" : scrolled ? "text-ink" : "text-white";
  const subColor = light ? "text-white/70" : scrolled ? "text-ink-muted" : "text-white/65";

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center font-display font-bold text-brand-orange text-xl border-2 border-brand-orange">
        C
      </div>
      <div className="leading-tight">
        <span className={`font-display font-bold text-[17px] block ${textColor}`}>
          CASPer Prep
        </span>
        <span className={`font-body text-[10px] font-medium tracking-[1px] uppercase ${subColor}`}>
          by TSA (The Success Architect)
        </span>
      </div>
    </div>
  );
}

export function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill="currentColor" className="text-brand-orange">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

