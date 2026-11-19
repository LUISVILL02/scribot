import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderDesktop, FooterDesktop } from "../components/layout";
import { LINKS } from "../components/layout";
import {
  MaterialIcon,
  StitchButton,
  StitchCard,
} from "../components/ui";
import { TraceCanvas, type TraceCanvasHandle } from "../components/renglon";

export default function Inicio() {
  const [progreso] = useState(40);
  const canvasD = useRef<TraceCanvasHandle>(null);
  const canvasP = useRef<TraceCanvasHandle>(null);
  const [strokeColor, setStrokeColor] = useState("#3525cd");

  const setLabColor = (color: string) => {
    setStrokeColor(color);
    canvasD.current?.setColor(color);
    canvasP.current?.setColor(color);
  };
  const navigate = useNavigate();

  const zonas = [
    {
      nombre: "Cielo",
      icono: "cloud",
      color: "secondary",
      descripcion: "Letras altas y mayúsculas: b, d, f, h, k, l, t.",
      etiqueta: "Zona Alta · 100%",
    },
    {
      nombre: "Pasto",
      icono: "grass",
      color: "status-completed",
      descripcion: "Vocales y consonantes base: a, c, e, m, n, o, r, s, u.",
      etiqueta: "Zona Media · Línea de apoyo",
    },
    {
      nombre: "Tierra",
      icono: "terrain",
      color: "renglon-tierra",
      descripcion: "Letras con trazo descendente: g, j, p, q, y.",
      etiqueta: "Zona Baja · Raíces firmes",
    },
  ];

  const misiones = [
    {
      numero: "1",
      titulo: "Preparo mis herramientas",
      modulo: "Módulo 1: Gimnasia digital, postura en silla y pinza trípode correcta.",
      estado: "En curso · 75%",
      colorEstado: "status-completed",
      btnLabel: "Entrar al Módulo 1",
      route: "/mision-1",
    },
    {
      numero: "2",
      titulo: "Sigo las pistas del renglón",
      modulo: "Módulos 2 y 3: Proporción espacial y dibujo en lienzo para transferir al cuaderno.",
      estado: "2 Módulos · 25%",
      colorEstado: "secondary",
      btnLabel: ["Módulo 2", "Módulo 3"],
      route: "/mision-2",
    },
    {
      numero: "3",
      titulo: "Detectives de letras",
      modulo: "Módulo 4: Autoevaluación guiada, checklist de 5 preguntas y coevaluación.",
      estado: "Pendiente",
      colorEstado: "on-surface-variant",
      btnLabel: "Explorar Módulo 4",
      route: "/mision-3",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderDesktop />
      <main className="w-full pt-16 md:pt-20 bg-surface min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
        <div className="max-w-7xl mx-auto px-4 md:px-gutter py-space-xl space-y-space-xl">
          {/* Hero */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-space-xl py-space-lg">
            <div className="flex-1 space-y-space-md text-left">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                <MaterialIcon name="smart_toy" /> Hola, Agente de Caligrafía 5°
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
                Domina el trazo perfecto con <span className="text-primary font-bold">ESCRIBOT</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Tu laboratorio digital para explorar el renglón tridimensional y transferir la destreza
                directamente a tu cuaderno físico.
              </p>
              <div className="flex items-center gap-space-md pt-space-xs">
                <StitchButton
                  variant="primary"
                  onClick={() => navigate("/mision-1")}
                  className="font-label-lg text-label-lg shadow-sm hover:brightness-105 active:translate-y-0.5 transition-all"
                >
                  <MaterialIcon name="arrow_downward" size={20} /> Continuar Aventura
                </StitchButton>
                <a
                  href={LINKS.padlet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-space-xs px-space-lg py-space-md rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                >
                  <MaterialIcon name="folder_shared" size={18} /> Mural de Clase
                </a>
              </div>
            </div>
            <div className="w-56 h-56 sm:w-64 sm:h-64 shrink-0 flex items-center justify-center relative">
              <img
                alt="ESCRIBOT detective robot"
                className="w-full h-full object-contain filter drop-shadow-xl"
                src="/assets/inicio.jpg"
              />
            </div>
          </section>

          {/* Método: 3 Zonas */}
          <section className="space-y-space-md" id="metodo">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
              <div className="space-y-1">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                  Orientación Visoespacial
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Las 3 Zonas del Renglón
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                Las letras se organizan según su altura y descenso en tres niveles equilibrados.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {zonas.map((z) => (
                <StitchCard key={z.nombre} className="p-space-lg rounded-2xl flex flex-col justify-between space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className={`font-headline-sm text-headline-sm font-bold ${z.color === "secondary" ? "text-secondary" : z.color === "status-completed" ? "text-renglon-pasto" : "text-renglon-tierra"}`}>
                      {z.nombre}
                    </span>
                    <MaterialIcon name={z.icono} size={24} className={z.color === "secondary" ? "text-secondary" : z.color === "status-completed" ? "text-renglon-pasto" : "text-renglon-tierra"} />
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {z.descripcion}
                  </p>
                  <span className={`font-label-sm text-label-sm font-bold ${z.color === "secondary" ? "text-secondary" : z.color === "status-completed" ? "text-status-completed" : "text-renglon-tierra"}`}>
                    {z.etiqueta}
                  </span>
                </StitchCard>
              ))}
            </div>
          </section>

          {/* Misiones */}
          <section className="space-y-space-md pt-space-sm" id="misiones">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                  Ruta de Aprendizaje
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Misiones Pedagógicas (4 Módulos)
                </h2>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-md py-1 rounded-full">
                Progreso general: <strong className="text-primary">{progreso}%</strong>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg items-stretch">
              {misiones.map((m) => (
                <StitchCard key={m.numero} className="p-space-lg rounded-2xl bg-surface-card border border-outline-variant flex flex-col justify-between space-y-space-md">
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center font-label-md text-label-md">
                        {m.numero}
                      </span>
                      <span className={`font-label-sm text-label-sm font-bold px-space-sm py-0.5 rounded-full ${m.colorEstado === "status-completed" ? "bg-renglon-pasto-light text-status-completed" : m.colorEstado === "secondary" ? "bg-renglon-cielo-light text-secondary" : "bg-surface-container text-on-surface-variant"}`}>
                        {m.estado}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {m.titulo}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{m.modulo}</p>
                  </div>
                  {Array.isArray(m.btnLabel) ? (
                    <div className="grid grid-cols-2 gap-space-xs">
                      {m.btnLabel.map((lbl, j) => (
                        <StitchButton
                          key={j}
                          variant="outline"
                          className="py-space-sm font-label-sm text-label-sm hover:brightness-110 transition-all font-bold"
                          onClick={() => navigate("/mision-2")}
                        >
                          {lbl}
                        </StitchButton>
                      ))}
                    </div>
                  ) : (
                    <StitchButton
                      variant="outline"
                      className="w-full py-space-sm font-label-sm text-label-sm hover:brightness-110 transition-all font-bold"
                      onClick={() => navigate(m.route)}
                    >
                      {m.btnLabel}
                    </StitchButton>
                  )}
                </StitchCard>
              ))}
            </div>
          </section>

          {/* Laboratorio de trazo */}
          <section className="p-space-lg rounded-2xl bg-surface-card border border-outline-variant space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Laboratorio de Trazo: Letras "d" y "p"
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Practica el trazo ascendente al Cielo y el descendente a la Tierra.
                </p>
              </div>
              <div className="flex items-center gap-space-sm">
                <div className="flex items-center gap-space-xs">
                  <button onClick={() => setLabColor("#3525cd")} className={`w-7 h-7 rounded-full bg-primary hover:scale-110 transition-transform ${strokeColor === "#3525cd" ? "ring-2 ring-offset-2 ring-primary" : ""}`} title="Azul Tinta" />
                  <button onClick={() => setLabColor("#22C55E")} className={`w-7 h-7 rounded-full bg-renglon-pasto hover:scale-110 transition-transform ${strokeColor === "#22C55E" ? "ring-2 ring-offset-2 ring-renglon-pasto" : ""}`} title="Verde Pasto" />
                  <button onClick={() => setLabColor("#00668a")} className={`w-7 h-7 rounded-full bg-secondary hover:scale-110 transition-transform ${strokeColor === "#00668a" ? "ring-2 ring-offset-2 ring-secondary" : ""}`} title="Celeste" />
                </div>
                <StitchButton variant="outline" onClick={() => { canvasD.current?.clear(); canvasP.current?.clear(); }} className="font-label-sm text-label-sm">
                  <MaterialIcon name="restart_alt" size={16} /> Borrar todo
                </StitchButton>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="space-y-space-xs">
                <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                  <MaterialIcon name="vertical_align_top" size={16} /> Letra "d" — tallo al Cielo
                </span>
                <TraceCanvas ref={canvasD} width={600} height={288} ghostLetter="d" />
              </div>
              <div className="space-y-space-xs">
                <span className="font-label-sm text-label-sm text-renglon-tierra font-bold flex items-center gap-1">
                  <MaterialIcon name="vertical_align_bottom" size={16} /> Letra "p" — trazo a la Tierra
                </span>
                <TraceCanvas ref={canvasP} width={600} height={288} ghostLetter="p" />
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
              Traza directamente con mouse o táctil antes de pasar a tu libreta de 5.°.
            </p>
          </section>
        </div>
      </main>
      <FooterDesktop />
    </div>
  );
}
