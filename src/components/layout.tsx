/// <reference types="vite/client" />
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MaterialIcon } from "./ui";
import { usePoints } from "../lib/PointsContext";

export const LINKS = {
  padlet: import.meta.env.VITE_PADLET_URL || "https://padlet.com",
  canva: import.meta.env.VITE_CANVA_URL || "https://canva.com/education",
};

export const IMG = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaya6xCelQwVy10HfoeF_JloS7HUVmbeY7BXfLcTfhu42KP9ReaagewJsYcFFTWyUkOkyOPc8zSfOHlWHSL13Ql0BApfxhiwfnGunTBG_Wp_zSU7Jq8WtGJNxzGOLMH4y4_vniAE0gLaxnr2QRkxJUKsw8af4ySgCFVf6D8aLqj2HeObpI4JSTmLOYaLLxtLOTbLuimmb3WdxlIsfiNVSd5NNLUvBGpAHqS_7waQc",
  profile: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjNYET-aYwNgKq5BJfvCJc8T8v0afxc18jRe-FZFwdN6Q4V6copC-onuT1k4z7JzxH-dCGjan8kJyCoX7Lb6UUhJBOev_CLaAW5-WMvNEfpefnwgLGcWDyDhBzkj-FaoG6JQ238xwYFI3UmtJ4RipNru2u7dzHhSi_a-SqeefyF7JD_2RR_CgVi_0DpR6seP_m91mDLLiQuE2QoNAImoVH053zPoZn_-02FbXIS4Y",
};

const NAV_LINKS = [
  { to: "/",         label: "Inicio",                  icon: "home" },
  { to: "/mision-1", label: "Misión 1: Manos",          icon: "pan_tool" },
  { to: "/mision-2", label: "Misión 2: Renglón y Trazos", icon: "edit" },
  { to: "/mision-3", label: "Misión 3: Detectives",     icon: "travel_explore" },
];

export function HeaderDesktop() {
  const location = useLocation();
  const { points, rank } = usePoints();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = (path: string) =>
    `px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all ${
      location.pathname === path
        ? "bg-primary-container text-on-primary font-bold shadow-sm"
        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
    }`;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 md:h-20 w-full px-4 md:px-gutter flex items-center justify-between gap-3">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <img alt="ESCRIBOT Logo" className="h-7 md:h-8 w-auto object-contain" src={IMG.logo} />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold leading-none">
                ESCRIBOT
              </span>
              <span className="hidden sm:block font-label-sm text-label-sm text-on-surface-variant">
                Taller de Caligrafía 5°
              </span>
            </div>
          </div>

          {/* Nav desktop */}
          <nav className="hidden xl:flex items-center gap-space-xs bg-surface-container-low px-space-xs rounded-full">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className={navLinkClass(l.to)}>{l.label}</Link>
            ))}
            <span className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant opacity-40 cursor-not-allowed select-none" title="Próximamente">
              Mi Progreso
            </span>
            <a href={LINKS.padlet} target="_blank" rel="noopener noreferrer"
              className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1">
              <MaterialIcon name="open_in_new" size={16} /> Padlet
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* External links — solo desktop */}
            <div className="hidden md:flex items-center gap-2">
              <a href={LINKS.padlet} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1 bg-renglon-cielo-light text-secondary font-label-sm text-label-sm rounded-full hover:bg-secondary-fixed transition-colors flex items-center gap-1">
                <MaterialIcon name="open_in_new" size={16} /> Padlet
              </a>
              <a href={LINKS.canva} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1 bg-renglon-pasto-light text-status-completed font-label-sm text-label-sm rounded-full flex items-center gap-1">
                <MaterialIcon name="palette" size={16} /> Canva Ed.
              </a>
            </div>

            {/* Puntos */}
            <div className="flex items-center gap-1 bg-tertiary-fixed px-3 py-1 rounded-full">
              <MaterialIcon name="award_star" size={16} className="text-tertiary" />
              <span className="font-label-sm text-label-sm text-on-tertiary-fixed font-bold whitespace-nowrap">
                <span className="hidden sm:inline">{rank} ⭐ </span>{points} pts
              </span>
            </div>

            {/* Avatar */}
            <img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container shrink-0" src={IMG.profile} />

            {/* Hamburger — oculto en xl */}
            <button
              className="xl:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <MaterialIcon name="menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex xl:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

          {/* Drawer */}
          <div className="relative ml-auto w-72 max-w-full h-full bg-surface flex flex-col shadow-2xl">
            {/* Header del drawer */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container">
              <span className="font-headline-sm text-primary font-bold">ESCRIBOT</span>
              <button
                className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
              >
                <MaterialIcon name="close" size={22} />
              </button>
            </div>

            {/* Puntos en drawer */}
            <div className="px-6 py-3 border-b border-surface-container">
              <div className="flex items-center gap-2 bg-tertiary-fixed px-4 py-2 rounded-full w-fit">
                <MaterialIcon name="award_star" size={16} className="text-tertiary" />
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed font-bold">{rank} ⭐ {points} pts</span>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-4 py-4 gap-1 flex-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md transition-all ${
                    location.pathname === l.to
                      ? "bg-primary-container text-on-primary font-bold"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <MaterialIcon name={l.icon} size={20} />
                  {l.label}
                </Link>
              ))}
              <span className="flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant opacity-40 cursor-not-allowed select-none">
                <MaterialIcon name="bar_chart" size={20} />
                Mi Progreso (próximamente)
              </span>
            </nav>

            {/* Links externos al pie del drawer */}
            <div className="px-6 py-4 border-t border-surface-container flex flex-col gap-2">
              <a href={LINKS.padlet} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-renglon-cielo-light text-secondary rounded-full font-label-sm text-label-sm">
                <MaterialIcon name="open_in_new" size={16} /> Padlet del Aula
              </a>
              <a href={LINKS.canva} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-renglon-pasto-light text-status-completed rounded-full font-label-sm text-label-sm">
                <MaterialIcon name="palette" size={16} /> Canva Educación
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function FooterDesktop() {
  return (
    <footer className="w-full bg-surface-container-low py-space-lg">
      <div className="w-full px-4 md:px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
        <div className="flex items-center gap-space-sm">
          <MaterialIcon name="smart_toy" className="text-primary" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            ESCRIBOT · Laboratorio de Caligrafía y Escritura Detective para Primaria
          </p>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Nivel 5° Primaria · Renglón Tridimensional
          </span>
          <div className="flex gap-space-xs">
            <span className="w-3 h-3 rounded-full bg-renglon-cielo" title="Cielo" />
            <span className="w-3 h-3 rounded-full bg-renglon-pasto" title="Pasto" />
            <span className="w-3 h-3 rounded-full bg-renglon-tierra" title="Tierra" />
          </div>
        </div>
      </div>
    </footer>
  );
}
