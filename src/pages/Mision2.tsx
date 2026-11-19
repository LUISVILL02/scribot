import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePoints } from "../lib/PointsContext";
import { HeaderDesktop } from "../components/layout";
import { MaterialIcon, StitchButton, StitchCard } from "../components/ui";
import { TraceCanvas, type TraceCanvasHandle } from "../components/renglon";

const LETTER_ROUNDS = [
  { letter: "d", correct: "cielo-pasto", hint: '"Tiene un tallo largo que sube al cielo..."', explain: "¡Excelente! La letra \"d\" tiene su óvalo en el Pasto y su bastón alto llega al Cielo." },
  { letter: "a", correct: "pasto", hint: '"Se mantiene redondita sin subir ni bajar..."', explain: "¡Correcto! La vocal \"a\" vive completamente dentro de la Zona Pasto." },
  { letter: "g", correct: "pasto-tierra", hint: '"Su cabeza mira el césped y su lazo desciende al suelo..."', explain: "¡Acertaste! La \"g\" tiene su círculo en el Pasto y su curva desciende a la Zona Tierra." },
];

const ZONE_LABELS: Record<string, { label: string; extra: string }> = {
  pasto: { label: "Solo Pasto", extra: "a, c, e, o" },
  "cielo-pasto": { label: "Cielo + Pasto", extra: "b, d, l, t" },
  "pasto-tierra": { label: "Pasto + Tierra", extra: "g, j, p, q, y" },
};

const ZONE_ICONS: Record<string, string> = {
  pasto: "grass",
  "cielo-pasto": "vertical_align_top",
  "pasto-tierra": "vertical_align_bottom",
};

const ZONE_COLORS: Record<string, string> = {
  pasto: "text-status-completed",
  "cielo-pasto": "text-secondary",
  "pasto-tierra": "text-renglon-tierra",
};

export default function Mision2() {
  const navigate = useNavigate();
  const { addPoints } = usePoints();
  const [module, setModule] = useState<"mod2" | "mod3">("mod2");
  const mod3Canvas = useRef<TraceCanvasHandle>(null);
  const [strokeColor, setStrokeColor] = useState("#3525cd");
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<{ open: boolean; ok: boolean; msg: string } | null>(null);
  const [cuadernoDone, setCuadernoDone] = useState(false);
  const [traceVerified, setTraceVerified] = useState(false);

  const current = LETTER_ROUNDS[round];

  const handleChoice = (choice: string) => {
    const ok = choice === current.correct;
    setFeedback({ open: true, ok, msg: ok ? current.explain : "¡Revisa las pistas! Esa letra no corresponde a esa franja. Vuelve a intentarlo." });
    if (ok) {
      setCorrectCount((c) => Math.min(3, c + 1));
      addPoints(`m2-correct-${round}`, 15);
    }
  };

  const nextLetter = () => {
    setRound((r) => (r + 1) % LETTER_ROUNDS.length);
    setFeedback(null);
  };

  const module2Complete = correctCount >= 3;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderDesktop />

      <main className="w-full pt-16 md:pt-20 bg-surface min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-full">
          {/* Menú de módulos y título en un solo contenedor, lado a lado horizontalmente */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full px-4 md:px-gutter py-3 md:py-space-md bg-surface-container-lowest shadow-sm gap-3">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-renglon-cielo-light flex items-center justify-center shrink-0 shadow-inner">
                <MaterialIcon name="travel_explore" size={24} className="text-secondary" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm uppercase tracking-wide">Misión 2</span>
                  <span className="text-on-surface-variant font-body-sm text-body-sm hidden sm:inline">· 5° Grado Primaria</span>
                </div>
                <h1 className="font-headline-sm md:font-headline-lg text-headline-sm md:text-headline-lg text-on-surface">Sigo las pistas del renglón</h1>
              </div>
            </div>
            <div className="flex items-center p-1 bg-surface-container rounded-full shadow-inner overflow-x-auto" id="module-tab-group">
              <button
                className={`flex items-center gap-1 px-3 md:px-space-md py-1.5 rounded-full font-label-sm md:font-label-md text-label-sm md:text-label-md transition-all whitespace-nowrap ${module === "mod2" ? "bg-primary-container text-on-primary shadow-md" : "text-on-surface-variant hover:text-on-surface"}`}
                onClick={() => setModule("mod2")}
              >
                <MaterialIcon name="layers" size={18} />
                <span>Módulo 2<span className="hidden md:inline">: Zonas del Renglón</span></span>
              </button>
              <button
                className={`flex items-center gap-1 px-3 md:px-space-md py-1.5 rounded-full font-label-sm md:font-label-md text-label-sm md:text-label-md transition-all whitespace-nowrap ${module === "mod3" ? "bg-primary-container text-on-primary shadow-md" : "text-on-surface-variant hover:text-on-surface"}`}
                onClick={() => setModule("mod3")}
              >
                <MaterialIcon name="edit" size={18} />
                <span>Módulo 3<span className="hidden md:inline">: Construyo mis trazos</span></span>
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full px-4 md:px-gutter py-space-lg flex flex-col gap-space-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-sm border-b border-surface-container-high">
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-full bg-renglon-cielo-light flex items-center justify-center text-primary shrink-0">
                  <MaterialIcon name="auto_stories" size={24} />
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Misión 2: El mapa del renglón</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Identifica la altura de cada letra (Cielo, Pasto, Tierra) y practica su trazo antes de escribir en tu cuaderno.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-card px-space-md py-1.5 rounded-full shadow-sm text-on-surface-variant font-label-sm text-label-sm border border-surface-container-high">
              <MaterialIcon name="verified" size={18} className="text-primary" />
              <span>Paso previo al cuaderno de 5°</span>
            </div>

            {module === "mod2" && (
              <div className="flex flex-col gap-space-xl" id="module-2-content">
                <StitchCard className="rounded-2xl p-space-xl shadow-sm border border-surface-container-high/60">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wide font-bold">Referencia Caligráfica</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">Las 3 Zonas del Renglón</h3>
                    </div>
                    <div className="flex items-center gap-space-md text-label-sm font-label-sm">
                      <span className="flex items-center gap-1.5 text-secondary">
                        <span className="w-3 h-3 rounded-full bg-renglon-cielo" /> Cielo (Altas)
                      </span>
                      <span className="flex items-center gap-1.5 text-status-completed">
                        <span className="w-3 h-3 rounded-full bg-renglon-pasto" /> Pasto (Base)
                      </span>
                      <span className="flex items-center gap-1.5 text-renglon-tierra">
                        <span className="w-3 h-3 rounded-full bg-renglon-tierra" /> Tierra (Bajas)
                      </span>
                    </div>
                  </div>
                  <div className="w-full rounded-xl overflow-hidden bg-surface-paper border border-surface-container flex items-center justify-center p-space-sm shadow-inner mt-space-md">
                    <img
                      alt="Guía del renglón caligráfico con zonas Cielo, Pasto y Tierra"
                      className="w-full max-h-80 object-contain rounded-lg"
                      src="/assets/mision-2.jpg"
                    />
                  </div>
                </StitchCard>

                <StitchCard className="rounded-2xl p-space-xl shadow-sm border border-surface-container-high/60 flex flex-col gap-space-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wide font-bold">Práctica de Reconocimiento</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">¿Qué zonas ocupa esta letra?</h3>
                    </div>
                    <div className="flex items-center gap-space-xs text-label-sm font-label-sm text-on-surface-variant bg-surface-container-low px-space-md py-1 rounded-full">
                      <span>Progreso:</span>
                      <span className="text-primary font-bold" id="game-score">{correctCount} / 3</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center bg-surface-paper p-space-lg rounded-xl border border-surface-container mt-space-md">
                    <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-space-md bg-surface-card rounded-xl border border-surface-container shadow-sm">
                      <span className="text-label-sm font-label-sm text-on-surface-variant mb-space-xs">Letra activa</span>
                      <div className="w-24 h-24 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary font-headline-lg text-[64px] font-bold shadow-inner" id="target-letter-display">
                        {current.letter}
                      </div>
                      <span className="mt-space-sm text-label-sm font-label-sm text-secondary font-medium" id="letter-clue-label">
                        {current.hint}
                      </span>
                    </div>
                    <div className="md:col-span-8 flex flex-col gap-space-md">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                        {Object.entries(ZONE_LABELS).map(([key, val]) => (
                          <button
                            key={key}
                            className={`choice-btn p-space-md rounded-xl bg-surface-card hover:bg-surface-container-high text-on-surface text-center border border-surface-container shadow-sm font-label-md text-label-md transition-all flex flex-col items-center gap-space-xs ${feedback?.open && key === current.correct ? "bg-renglon-pasto-light border-renglon-pasto shadow-[0_0_0_4px_rgba(34,197,94,0.2)]" : feedback?.open && key !== current.correct ? "bg-error-container border-error shadow-[0_0_0_4px_rgba(186,26,26,0.2)]" : ""}`}
                            onClick={() => handleChoice(key)}
                          >
                            <MaterialIcon name={ZONE_ICONS[key]} size={28} className={ZONE_COLORS[key]} />
                            <span className="font-bold">{val.label}</span>
                            <span className="text-body-sm font-body-sm text-on-surface-variant text-[12px]">{val.extra}</span>
                          </button>
                        ))}
                      </div>
                      {feedback && (
                        <div className={`p-space-md rounded-xl flex items-center justify-between border transition-all ${feedback.ok ? "bg-renglon-pasto-light text-status-completed shadow-sm" : "bg-error-container text-on-error-container shadow-sm"}`}>
                          <div className="flex items-center gap-space-sm">
                            <MaterialIcon name={feedback.ok ? "check_circle" : "warning"} size={24} className={feedback.ok ? "text-status-completed" : "text-on-error-container"} />
                            <span className="font-label-md text-label-md">{feedback.msg}</span>
                          </div>
                          <StitchButton variant="primary" onClick={nextLetter} className="px-space-md py-1.5 rounded-full font-label-sm text-label-sm shadow hover:opacity-90 transition-opacity">
                            Siguiente letra
                          </StitchButton>
                        </div>
                      )}
                    </div>
                  </div>
                </StitchCard>
              </div>
            )}

            {module === "mod3" && (
              <div className={`${module === "mod3" ? "" : "hidden"} flex flex-col gap-space-xl`} id="module-3-content">
                <StitchCard className="rounded-2xl p-space-xl shadow-sm border border-surface-container-high/60 flex flex-col gap-space-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wide font-bold">Práctica de Trazo</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">Pizarra Caligráfica: Letra "d"</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Primero el círculo en el Pasto (1) y luego el asta recta desde el Cielo (2).</p>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <button
                        onClick={() => {
                          setStrokeColor("#3525cd");
                          mod3Canvas.current?.setColor("#3525cd");
                        }}
                        className={`w-7 h-7 rounded-full bg-primary hover:scale-110 transition-transform ${strokeColor === "#3525cd" ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                        title="Azul Tinta"
                      />
                      <button
                        onClick={() => {
                          setStrokeColor("#22C55E");
                          mod3Canvas.current?.setColor("#22C55E");
                        }}
                        className={`w-7 h-7 rounded-full bg-renglon-pasto hover:scale-110 transition-transform ${strokeColor === "#22C55E" ? "ring-2 ring-offset-2 ring-renglon-pasto" : ""}`}
                        title="Verde Pasto"
                      />
                      <button
                        onClick={() => {
                          setStrokeColor("#00668a");
                          mod3Canvas.current?.setColor("#00668a");
                        }}
                        className={`w-7 h-7 rounded-full bg-secondary hover:scale-110 transition-transform ${strokeColor === "#00668a" ? "ring-2 ring-offset-2 ring-secondary" : ""}`}
                        title="Celeste"
                      />
                    </div>
                  </div>
                  <TraceCanvas ref={mod3Canvas} width={800} height={288} ghostLetter="d" />
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs">
                    <div className="flex items-center gap-space-xs w-full sm:w-auto">
                      <StitchButton variant="outline" onClick={() => mod3Canvas.current?.clear()} className="font-label-sm text-label-sm">
                        <MaterialIcon name="restart_alt" size={16} /> Borrar trazo
                      </StitchButton>
                      <StitchButton variant="primary" className="font-label-sm text-label-sm" onClick={() => { mod3Canvas.current?.save(); setTraceVerified(true); addPoints("m2-trace-verified", 15); }}>
                        <MaterialIcon name="check" size={16} /> {traceVerified ? "¡Trazo verificado! ⭐" : "Verificar trazo"}
                      </StitchButton>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Ensaya con libertad antes de escribir con lápiz.</span>
                  </div>
                </StitchCard>

                <StitchCard className="rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                      <MaterialIcon name="edit_note" size={24} />
                    </div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface">Momento del Cuaderno de 5°</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Abre tu cuaderno físico y escribe 3 veces la letra "d" respetando la proporción de las zonas.</p>
                    </div>
                  </div>
                  <StitchButton
                    variant={cuadernoDone ? "outline" : "primary"}
                    onClick={() => { setCuadernoDone(true); addPoints("m2-cuaderno", 20); }}
                    className="font-label-md text-label-md shadow hover:translate-y-0.5 transition-all flex items-center justify-center gap-space-xs shrink-0"
                  >
                    <MaterialIcon name="task_alt" size={18} />
                    <span>{cuadernoDone ? "¡Completado en Cuaderno! ⭐" : "¡Listo en mi cuaderno!"}</span>
                  </StitchButton>
                </StitchCard>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-card border border-surface-container shadow-sm">
              <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface-variant">
                <MaterialIcon name="verified" size={20} className="text-status-completed" />
                <span>Misión 2 en progreso · Caligrafía 5° Primaria</span>
              </div>
              <div className="flex items-center gap-space-md">
                <div className="w-36 bg-surface-container rounded-full h-2 overflow-hidden hidden sm:block">
                  <div className={`bg-status-completed h-full rounded-full transition-all duration-500 ${cuadernoDone ? "w-full" : "w-[65%]"}`} />
                </div>
                <StitchButton variant="outline" className="font-label-sm text-label-sm" onClick={() => {
                  if (!module2Complete) return;
                  setCuadernoDone(true);
                  navigate("/mision-3");
                }} disabled={!module2Complete}>
                  Completar Misión
                </StitchButton>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low py-space-lg">
        <div className="w-full px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
          <div className="flex items-center gap-space-sm">
            <MaterialIcon name="smart_toy" className="text-primary" />
            <p className="font-body-sm text-body-sm text-on-surface-variant">ESCRIBOT · Laboratorio de Caligrafía y Escritura Detective para Primaria</p>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Nivel 5° Primaria · Renglón Tridimensional</span>
            <div className="flex gap-space-xs">
              <span className="w-3 h-3 rounded-full bg-renglon-cielo" title="Cielo" />
              <span className="w-3 h-3 rounded-full bg-renglon-pasto" title="Pasto" />
              <span className="w-3 h-3 rounded-full bg-renglon-tierra" title="Tierra" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
