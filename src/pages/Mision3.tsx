import { useLayoutEffect, useRef, useState } from "react";
import { HeaderDesktop } from "../components/layout";
import { usePoints } from "../lib/PointsContext";
import { MaterialIcon, StitchCard, CheckItem } from "../components/ui";

const CHECKS = [
  { id: 1, label: "Mis letras están bien situadas en cielo, pasto y tierra." },
  { id: 2, label: "Hay diferencia clara de tamaño entre mayúsculas y minúsculas." },
  { id: 3, label: "Respeto la distancia de un dedito entre palabra y palabra." },
  { id: 4, label: "Las letras intermedias apoyan sus bases firmes en el pasto." },
  { id: 5, label: "Se lee con total claridad sin confundir trazos similares." },
];

const CLUES = [
  { id: 1, word: "sol", title: "Pista 1 descubierta: Letras flotantes", text: "La palabra 'sol' se despegó del pasto y flotó en el cielo. Toda letra media debe asentar sus bases en la línea verde del pasto." },
  { id: 2, word: "brillamucho", title: "Pista 2 descubierta: Falta de separación", text: "'brillamucho' se escribió pegada. Siempre dejamos el ancho de un dedito entre palabras consecutivas." },
  { id: 3, word: "campo", title: "Pista 3 descubierta: Descenso no permitido", text: "La letra 'm' bajó incorrectamente a la tierra. Solo letras descendentes como p, q, j, g, y tienen autorización para entrar a la tierra." },
];

// Renglón geometry (SVG units). Same proportions as TraceCanvas: the baseline sits on
// the bottom edge of Pasto, x-height fills Pasto, ascenders reach Cielo and
// descenders drop into Tierra.
const ZONE = 100;
const ROW_H = ZONE * 3;
const ROW_GAP = 80;
// Extra room above the first row so clue badges are never clipped.
const TOP_PAD = 60;
// Minimum drawing width (SVG units). The SVG always fills its parent; this keeps the
// letters at a readable proportion instead of stretching the text edge to edge.
const MIN_W = 2900;
const LABEL_W = 170;
const TEXT_X = LABEL_W + 30;
const PAD_R = 40;
const FONT_SIZE = Math.round(ZONE * 1.85);
const SVG_H = ROW_H * 2 + ROW_GAP;

const ZONE_STYLES = [
  { label: "Cielo", bg: "#E0F2FE", text: "#0284C7" },
  { label: "Pasto", bg: "#DCFCE7", text: "#16A34A" },
  { label: "Tierra", bg: "#FEF3C7", text: "#B45309" },
];

const CLUE_COLORS: Record<number, string> = { 1: "#0284C7", 2: "#DC2626", 3: "#B45309" };

type ClueBox = { id: number; x: number; y: number; w: number; h: number };

function InspectionRenglon({
  discovered,
  onClue,
}: {
  discovered: Record<number, boolean>;
  onClue: (id: number) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(MIN_W);
  const [boxes, setBoxes] = useState<ClueBox[]>([]);

  useLayoutEffect(() => {
    let cancelled = false;
    const measure = () => {
      const svg = svgRef.current;
      if (!svg || cancelled) return;
      const lines = Array.from(svg.querySelectorAll<SVGTextElement>("text[data-line]"));
      const maxLen = Math.max(0, ...lines.map((t) => t.getComputedTextLength()));
      if (maxLen > 0) setWidth(Math.max(MIN_W, Math.ceil(TEXT_X + maxLen + PAD_R)));
      const clues = Array.from(svg.querySelectorAll<SVGTSpanElement>("tspan[data-clue]"));
      setBoxes(
        clues.map((el) => {
          const b = el.getBBox();
          return { id: Number(el.dataset.clue), x: b.x, y: b.y, w: b.width, h: b.height };
        }),
      );
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => {
      cancelled = true;
    };
  }, [discovered]);

  const baseline = (row: number) => row * (ROW_H + ROW_GAP) + ZONE * 2;
  const color = (id: number) => (discovered[id] ? undefined : CLUE_COLORS[id]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 ${-TOP_PAD} ${width} ${SVG_H + TOP_PAD}`}
      className="block w-full h-auto select-none"
    >
      {[0, 1].map((row) => {
        const top = row * (ROW_H + ROW_GAP);
        return (
          <g key={row}>
            {ZONE_STYLES.map((z, i) => (
              <rect key={z.label} x={0} y={top + i * ZONE} width={width} height={ZONE} fill={z.bg} fillOpacity={0.7} />
            ))}
            <line x1={0} x2={width} y1={top + ZONE} y2={top + ZONE} stroke="#38BDF8" strokeWidth={3} strokeDasharray="14 10" />
            <line x1={0} x2={width} y1={top + ZONE * 2} y2={top + ZONE * 2} stroke="#22C55E" strokeWidth={5} />
            <rect x={0} y={top} width={LABEL_W} height={ROW_H} fill="#FFFFFF" fillOpacity={0.75} />
            {ZONE_STYLES.map((z, i) => (
              <text
                key={z.label}
                x={LABEL_W / 2}
                y={top + i * ZONE + ZONE / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="'Quicksand', sans-serif"
                fontWeight={700}
                fontSize={40}
                fill={z.text}
              >
                {z.label}
              </text>
            ))}
          </g>
        );
      })}

      <g fontFamily="'Quicksand', Georgia, serif" fontWeight={700} fontSize={FONT_SIZE} className="fill-on-surface" style={{ whiteSpace: "pre" }}>
        {/* Row 1: "El sol brilla mucho" */}
        <text data-line x={TEXT_X} y={baseline(0)}>
          {"El "}
          {/* Error 1: "sol" floats one zone up into Cielo */}
          <tspan data-clue="1" dy={discovered[1] ? 0 : -ZONE} fill={color(1)}>sol</tspan>
          <tspan dy={discovered[1] ? 0 : ZONE}>{" "}</tspan>
          {/* Error 2: missing space between "brilla" and "mucho" */}
          <tspan data-clue="2">
            brilla
            <tspan fill={color(2)}>{discovered[2] ? " mucho" : "mucho"}</tspan>
          </tspan>
        </text>

        {/* Row 2: "en el campo." */}
        <text data-line x={TEXT_X} y={baseline(1)}>
          {"en el "}
          {/* Error 3: the "m" drops into Tierra */}
          <tspan data-clue="3">
            ca
            <tspan dy={discovered[3] ? 0 : ZONE} fill={color(3)}>m</tspan>
            <tspan dy={discovered[3] ? 0 : -ZONE}>po.</tspan>
          </tspan>
        </text>
      </g>

      {boxes.map((b) => {
        const done = !!discovered[b.id];
        const c = done ? "#22C55E" : CLUE_COLORS[b.id];
        const pad = 10;
        return (
          <g
            key={b.id}
            role="button"
            tabIndex={done ? -1 : 0}
            aria-label={done ? "Corregido" : "Letra con falla, clic para corregir"}
            onClick={() => onClue(b.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClue(b.id);
              }
            }}
            className={done ? "cursor-default" : "cursor-pointer focus:outline-none [&:hover>rect]:[fill-opacity:0.18]"}
          >
            <title>{done ? "¡Corregido!" : "Clic para corregir"}</title>
            <rect
              x={b.x - pad}
              y={b.y - pad}
              width={b.w + pad * 2}
              height={b.h + pad * 2}
              rx={18}
              fill={c}
              fillOpacity={done ? 0 : 0.08}
              stroke={done ? "none" : c}
              strokeWidth={5}
              strokeDasharray="16 10"
            />
            <circle cx={b.x + b.w + pad} cy={b.y - pad} r={36} fill={c} stroke="#FFFFFF" strokeWidth={6} />
            <text
              x={b.x + b.w + pad}
              y={b.y - pad}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              fontFamily="'Quicksand', sans-serif"
              fontWeight={700}
              fontSize={46}
            >
              {done ? "✓" : "!"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Mision3() {
  const { addPoints } = usePoints();
  const [discoveredClues, setDiscoveredClues] = useState<Record<number, boolean>>({});
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [clueScore, setClueScore] = useState("0 / 3");
  const [checklistPct, setChecklistPct] = useState("0%");
  const [checklistCongrats, setChecklistCongrats] = useState(false);
  const [activeClue, setActiveClue] = useState<string | null>(null);

  const clueCount = Object.values(discoveredClues).filter(Boolean).length;

  const handleClue = (id: number) => {
    if (discoveredClues[id]) return;
    setDiscoveredClues((prev) => ({ ...prev, [id]: true }));
    setActiveClue(CLUES.find((c) => c.id === id)?.title || "");
    setClueScore(`${Math.min(3, clueCount + 1)} / 3`);
    addPoints(`m3-clue-${id}`, 10);
  };

  const handleCheck = (id: string, checked: boolean) => {
    const next = { ...checks, [id]: checked };
    setChecks(next);
    const newChecked = Object.values(next).filter(Boolean).length;
    setChecklistPct(`${Math.round((newChecked / CHECKS.length) * 100)}%`);
    setChecklistCongrats(newChecked === CHECKS.length);
    if (checked) addPoints(`m3-check-${id}`, 10);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderDesktop />

      <main className="w-full pt-16 md:pt-20 bg-surface min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
        <div className="max-w-6xl mx-auto px-4 md:px-gutter py-space-xl space-y-space-xl">
          {/* Hero */}
          <section className="w-full bg-surface-container-low/50 border-b border-surface-container-high py-space-lg md:py-space-xl -mx-4 md:-mx-gutter px-4 md:px-gutter">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="flex items-center gap-space-xs text-primary font-bold">
                  <MaterialIcon name="travel_explore" size={20} />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">Misión 3 · Módulo 4 · Fase Final</span>
                </div>
                <h1 className="font-headline-lg md:font-display text-headline-lg md:text-display text-on-surface tracking-tight">Detectives de Letras</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                  Aplica tus superpoderes de observación. Inspecciona el renglón, autorregula tus trazos con la lista de chequeo y colabora con tu brigada como un verdadero perito calígrafo.
                </p>
                <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-card shadow-sm border border-surface-container-high">
                    <MaterialIcon name="search" size={18} className="text-secondary" />
                    <span className="font-label-sm text-label-sm text-on-surface">Pistas del renglón:</span>
                    <span className="font-headline-sm text-headline-sm text-secondary font-bold" id="counter-pistas">{clueScore}</span>
                  </div>
                  <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-card shadow-sm border border-surface-container-high">
                    <MaterialIcon name="checklist" size={18} className="text-status-completed" />
                    <span className="font-label-sm text-label-sm text-on-surface">Autoevaluación:</span>
                    <span className="font-headline-sm text-headline-sm text-status-completed font-bold" id="counter-checklist">{checklistPct}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden shadow-md bg-surface-card border border-surface-container-high">
                  <img alt="Kid detective theme handwriting review desk with ESCRIBOT" className="w-full h-72 object-cover object-center" src={`${import.meta.env.BASE_URL}assets/mision-3.jpg`} />
                  <div className="p-space-sm bg-surface-card/95 border-t border-surface-container-high flex items-center gap-space-sm">
                    <MaterialIcon name="smart_toy" size={20} className="text-primary shrink-0" />
                    <p className="font-body-sm text-body-sm text-on-surface"><strong>Agente ESCRIBOT:</strong> «Toca con tu lupa las 3 irregularidades del renglón para descifrar el caso.»</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Actividad 1: Inspección de Renglón */}
          <StitchCard className="rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm pb-space-xs border-b border-surface-container-low">
              <div>
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Actividad 1 · Inspección Caligráfica</span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">Encuentra las 3 anomalías en el renglón</h2>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                <MaterialIcon name="touch_app" size={18} className="text-secondary" />
                Haz clic sobre las letras con fallas
              </span>
            </div>
            {/* Renglón de inspección: letras ubicadas según las tres zonas */}
            <div className="w-full rounded-lg border border-surface-container-high bg-surface-paper shadow-inner overflow-x-auto">
              <div className="py-space-sm px-space-xs">
                <InspectionRenglon discovered={discoveredClues} onClue={handleClue} />
              </div>
            </div>
            {/* Feedback Box */}
            {activeClue && (
              <div className="p-space-md rounded-lg bg-surface-container-low text-on-surface flex items-start gap-space-sm" id="escribot-speech-bubble">
                <MaterialIcon name="info" size={24} className="text-primary shrink-0 mt-0.5" />
                <div className="flex-1 text-body-md" id="clue-explanation-text">
                  <strong className="text-primary font-bold">{activeClue}: </strong>
                  {CLUES.find((c) => c.title === activeClue)?.text}
                </div>
              </div>
            )}
          </StitchCard>

          {/* Two Columns: Actividad 2 & 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Actividad 2: Lista de revisión */}
            <StitchCard className="lg:col-span-6 rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-low">
                <div>
                  <span className="font-label-sm text-label-sm text-status-completed font-bold uppercase tracking-wider">Actividad 2 · Autorregulación</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Mi lista de revisión</h2>
                </div>
                <span className={`px-space-sm py-0.5 rounded-full bg-renglon-pasto-light text-status-completed font-label-sm text-label-sm font-bold`} id="checklist-pct">{checklistPct}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Verifica estos 5 criterios en tu cuaderno antes de presentar tu trabajo final:</p>
              <div className="flex flex-col gap-space-xs" id="checklist-container">
                {CHECKS.map((c) => (
                  <CheckItem
                    key={c.id}
                    id={`check-${c.id}`}
                    label={c.label}
                    iconName="check"
                    checked={checks[`check-${c.id}`] ?? false}
                    onChange={handleCheck}
                  />
                ))}
              </div>
              {checklistCongrats && (
                <div className="p-space-sm rounded-lg bg-renglon-pasto-light text-status-completed font-label-sm text-label-sm flex items-center gap-space-xs" id="checklist-congrats">
                  <MaterialIcon name="verified" size={20} />
                  <span>¡Criterios completados! Tu cuaderno está listo para evaluación.</span>
                </div>
              )}
            </StitchCard>

            {/* Actividad 3: Comparador Antes/Después */}
            <StitchCard className="lg:col-span-6 rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-low">
                <div>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">Actividad 3 · Evolución de Trazos</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Antes y después</h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Comparativa</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="p-space-md rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col justify-center text-center">
                  <span className="font-label-sm text-label-sm text-error font-bold mb-space-xs flex items-center justify-center gap-1">
                    <MaterialIcon name="history" size={14} /> Semana 1 (Inicial)
                  </span>
                  <p className="font-display text-headline-sm text-outline italic line-through decoration-error/50 py-space-sm">el perro corrio por el parque</p>
                  <span className="text-[11px] text-on-surface-variant">Sin mayúscula, sin tilde ni apoyo</span>
                </div>
                <div className="p-space-md rounded-lg bg-renglon-pasto-light/40 border border-renglon-pasto/40 flex flex-col justify-center text-center">
                  <span className="font-label-sm text-label-sm text-status-completed font-bold mb-space-xs flex items-center justify-center gap-1">
                    <MaterialIcon name="stars" size={14} /> Semana 4 (Con Renglón 3D)
                  </span>
                  <p className="font-display text-headline-sm text-primary font-bold py-space-sm">El perro corrió por el parque.</p>
                  <span className="text-[11px] text-status-completed font-bold">Alineación y legibilidad óptima</span>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-paper border border-surface-container-high flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">¿Reflexionaste sobre la distancia y apoyo?</span>
                <button className="px-space-md py-space-xs rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm hover:bg-on-secondary-container transition-colors shadow-sm" type="button">
                  Registrar
                </button>
              </div>
            </StitchCard>
          </div>

          {/* Progreso e Insignias */}
          <StitchCard className="rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col gap-space-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md pb-space-xs border-b border-surface-container-low">
              <div>
                <div className="flex items-center gap-space-xs text-primary font-bold">
                  <MaterialIcon name="workspace_premium" size={18} />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">Graduación Caligráfica</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">Mi Progreso e Insignias</h2>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-label-sm text-label-sm px-space-md py-space-xs rounded-full bg-renglon-pasto-light text-status-completed font-bold flex items-center gap-1">
                  <MaterialIcon name="verified" size={16} /> 100% Completado
                </span>
              </div>
            </div>
            {/* 4 Insignias Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
              <div className="p-space-md rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col items-center text-center gap-space-xs">
                <div className="w-12 h-12 rounded-full bg-renglon-cielo-light text-secondary flex items-center justify-center"><MaterialIcon name="pan_tool" size={24} /></div>
                <span className="font-label-sm text-label-sm text-on-surface font-bold">Manos Ágiles</span>
                <span className="text-[11px] text-status-completed font-bold">Módulo 1 · Listo</span>
              </div>
              <div className="p-space-md rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col items-center text-center gap-space-xs">
                <div className="w-12 h-12 rounded-full bg-renglon-pasto-light text-status-completed flex items-center justify-center"><MaterialIcon name="view_timeline" size={24} /></div>
                <span className="font-label-sm text-label-sm text-on-surface font-bold">Señor del Pasto</span>
                <span className="text-[11px] text-status-completed font-bold">Módulo 2 · Listo</span>
              </div>
              <div className="p-space-md rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col items-center text-center gap-space-xs">
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center"><MaterialIcon name="saved_search" size={24} /></div>
                <span className="font-label-sm text-label-sm text-on-surface font-bold">Ojo Detective</span>
                <span className="text-[11px] text-status-completed font-bold">Módulo 3 · Listo</span>
              </div>
              <div className="p-space-md rounded-lg bg-primary-fixed border border-primary-container/20 flex flex-col items-center text-center gap-space-xs">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center"><MaterialIcon name="award_star" size={24} /></div>
                <span className="font-label-sm text-label-sm text-primary font-bold">Perito 5° Grado</span>
                <span className="text-[11px] text-primary font-bold">Módulo 4 · Maestro</span>
              </div>
            </div>
            {/* Direct Call to Action for Classroom Evidence Sharing */}
            <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container-low">
              <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm text-center sm:text-left">
                <MaterialIcon name="group" size={20} className="text-secondary" />
                <span>Comparte la fotografía de tu cuaderno en el mural interactivo para coevaluación docente.</span>
              </div>
              <a href="https://padlet.com" target="_blank" rel="noopener noreferrer" className="px-space-lg py-space-sm rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center gap-space-xs transition-colors shadow-sm shrink-0">
                <MaterialIcon name="share" size={20} /> Compartir en Padlet del Aula
              </a>
            </div>
          </StitchCard>
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
