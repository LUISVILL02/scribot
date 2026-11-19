import * as React from "react";

// ============================================================
// Icono Material Symbols Outlined (idéntico al diseño Stitch)
// ============================================================
export function MaterialIcon({
  name,
  className = "",
  size = 20,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`material-symbols-outlined text-[${size}px] ${className}`}
      style={{ fontVariationSettings: `"FILL" 0, "wght" 400, "GRAD" 0, "opsz" ${size}` }}
    >
      {name}
    </span>
  );
}

// ============================================================
// Botón base (estilo Stitch)
// ============================================================
export function StitchButton({
  children,
  className = "",
  variant = "primary",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const variants: Record<string, string> = {
    primary: "bg-primary text-on-primary shadow-[0_4px_0_#281ba4] active:shadow-none active:translate-y-[4px]",
    secondary: "bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-colors",
    outline:
      "border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all",
    ghost: "text-on-surface-variant hover:text-on-surface transition-colors",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-label-md font-bold px-4 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

// ============================================================
// Tarjeta base (estilo Stitch)
// ============================================================
export function StitchCard({
  children,
  className = "",
  bordered = true,
}: {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`bg-surface-card rounded-2xl shadow-sm ${bordered ? "border border-outline-variant/30" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================
// Insignia circular (estilo Stitch)
// ============================================================
export function Insignia({
  iconName,
  color = "primary",
  label,
  subtitle,
  size = "md",
}: {
  iconName: string;
  color?: string;
  label?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes: Record<string, { icon: number; box: string; label: string }> = {
    sm: { icon: 18, box: "w-8 h-8", label: "text-label-sm" },
    md: { icon: 24, box: "w-12 h-12", label: "text-label-sm" },
    lg: { icon: 28, box: "w-16 h-16", label: "text-label-md" },
  };
  const s = sizes[size];
  const colorMap: Record<string, string> = {
    primary: "bg-primary-fixed text-primary",
    pasto: "bg-renglon-pasto-light text-status-completed",
    tierra: "bg-tertiary-fixed text-tertiary",
    cielo: "bg-renglon-cielo-light text-secondary",
    completed: "bg-primary-container text-on-primary",
  };
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className={`${s.box} rounded-full flex items-center justify-center shrink-0 shadow-inner ${colorMap[color]}`}>
        <MaterialIcon name={iconName} size={s.icon} />
      </div>
      {label && <span className={`${s.label} font-bold text-on-surface`}>{label}</span>}
      {subtitle && (
        <span className="text-[11px] font-bold text-on-surface-variant">{subtitle}</span>
      )}
    </div>
  );
}

// ============================================================
// CheckItem (checkbox estilizado Stitch)
// ============================================================
export function CheckItem({
  id,
  label,
  iconName,
  checked = false,
  onChange,
}: {
  id: string;
  label: string;
  iconName?: string;
  checked?: boolean;
  onChange?: (id: string, checked: boolean) => void;
}) {
  return (
    <label
      className="flex items-center gap-3 py-2 px-2 cursor-pointer select-none border-b border-surface-container-low hover:bg-surface-container-low/50 rounded-xl transition-colors"
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange?.(id, e.target.checked)}
      />
      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all peer-checked:bg-status-completed peer-checked:text-on-primary ${
          checked
            ? "bg-status-completed text-on-primary"
            : "bg-surface-container text-transparent"
        }`}
      >
        {iconName && (
          <span className="material-symbols-outlined text-[18px] font-bold">
            {iconName}
          </span>
        )}
      </div>
      <span className={`font-body-md flex-1 transition-all ${
        checked ? "line-through text-on-surface-variant" : "text-on-surface"
      }`}>
        {label}
      </span>
    </label>
  );
}

// ============================================================
// Badge de progreso píldora
// ============================================================
export function ProgressPill({
  value,
  total,
  color = "pasto",
}: {
  value: number;
  total: number;
  color?: string;
}) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  const colorMap: Record<string, string> = {
    pasto: "bg-renglon-pasto-light text-status-completed",
    primary: "bg-primary-fixed text-primary",
    cielo: "bg-renglon-cielo-light text-secondary",
  };
  return (
    <span className={`px-3 py-1 rounded-full font-label-sm font-bold ${colorMap[color]}`}>
      {pct}%
    </span>
  );
}
