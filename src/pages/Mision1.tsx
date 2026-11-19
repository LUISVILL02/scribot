import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePoints } from "../lib/PointsContext";
import { HeaderDesktop } from "../components/layout";
import { MaterialIcon, StitchButton, StitchCard, CheckItem } from "../components/ui";

const STEPS = [
  {
    id: 1,
    title: "1. Dedos",
    cue: "Paso 1: Mueve los dedos en el aire imitando tocar el piano.",
    desc: "Activa la circulación y elimina tensión en las falanges antes del trazo.",
    time: "00:20",
  },
  {
    id: 2,
    title: "2. Postura",
    cue: "Paso 2: Rota muñecas suavemente en círculos hacia ambos lados.",
    desc: "Mantén espalda apoyada en el respaldo y pies planos en el suelo.",
    time: "00:15",
  },
  {
    id: 3,
    title: "3. Agarre",
    cue: "Paso 3: Estira suavemente dedos y palma sin forzar las articulaciones.",
    desc: "Toma el lápiz con pulgar e índice, apoyándolo sobre el dedo medio.",
    time: "00:15",
  },
  {
    id: 4,
    title: "4. Pausa activa",
    cue: "Paso 4: Posición trípode suave con el lápiz sin apretar los nudillos.",
    desc: "Sacude las manos y respira hondo antes de tocar el papel.",
    time: "00:30",
  },
];

const CHECKS = [
  { id: 1, label: "Movilidad de dedos" },
  { id: 2, label: "Espalda y pies rectos" },
  { id: 3, label: "Pinza trípode suave" },
  { id: 4, label: "Respiración libre de tensión" },
];

export default function Mision1() {
  const navigate = useNavigate();
  const { addPoints } = usePoints();
  const [currentStep, setCurrentStep] = useState(1);
  const [checks, setChecks] = useState<Record<string, boolean>>({ "1": true, "2": false, "3": false, "4": false });

  useEffect(() => {
    setChecks((prev) => ({ ...prev, [String(currentStep)]: true }));
    addPoints(`m1-step-${currentStep}`, 10);
  }, [currentStep, addPoints]);

  const checkedCount = Object.values(checks).filter(Boolean).length;

  const selectStep = (idx: number) => {
    setCurrentStep(idx);
  };

  const nextStep = () => {
    if (currentStep < 4) selectStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) selectStep(currentStep - 1);
  };

  const data = STEPS[currentStep - 1];
  const isComplete = checkedCount === CHECKS.length;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderDesktop />

      <main className="w-full pt-16 md:pt-20 bg-surface min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
        <div className="max-w-7xl mx-auto px-4 md:px-gutter py-space-xl flex flex-col gap-space-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-outline-variant/30 pb-space-lg">
            <div>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm mb-space-xs"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                <MaterialIcon name="arrow_back" size={16} /> Volver al taller
              </a>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Calentamiento Motor</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Mueve tus dedos y muñecas antes de comenzar a escribir en el cuaderno.
              </p>
            </div>
            <div className="overflow-x-auto pb-1 -mx-1 px-1">
              <div className="flex items-center gap-space-xs bg-surface-container-low p-1.5 rounded-full w-max">
                {STEPS.map((s) => (
                  <button
                    key={s.id}
                    className={`px-3 md:px-space-md py-1.5 rounded-full font-label-md text-label-md font-semibold shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      currentStep === s.id
                        ? "bg-primary-container text-on-primary"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    onClick={() => selectStep(s.id)}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${currentStep === s.id ? "bg-on-primary" : "bg-outline-variant"}`} />
                    <span>{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              <StitchCard className="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/30 shadow-sm overflow-hidden">
                <div className="relative w-full rounded-xl overflow-hidden bg-surface-paper">
                  <img
                    alt="Guía ilustrada de ejercicios de motricidad y agarre de lápiz"
                    className="w-full h-auto max-h-[460px] object-cover rounded-xl transition-all duration-300"
                    src={`${import.meta.env.BASE_URL}assets/mision-1.jpg`}
                  />
                  <div className="absolute top-4 right-4 bg-surface-card/90 backdrop-blur-md px-space-md py-1 rounded-full shadow-sm flex items-center gap-1.5 font-label-md text-label-md text-primary font-bold">
                    <MaterialIcon name="timer" size={18} />
                    <span id="activeTimerDisplay">{data.time}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-inverse-surface/85 backdrop-blur-md text-inverse-on-surface px-space-md py-1.5 rounded-xl text-label-sm font-label-sm flex items-center gap-2">
                    <MaterialIcon name="info" size={18} className="text-renglon-cielo" />
                    <span id="stepPillInstruction">{data.cue}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-space-sm">
                  <span className="font-body-md text-body-md text-on-surface-variant" id="stepSubtext">
                    {data.desc}
                  </span>
                  <div className="flex items-center gap-space-xs">
                    <button
                      className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <MaterialIcon name="chevron_left" size={20} />
                    </button>
                    <span className="font-label-md text-label-md text-on-surface px-space-xs" id="stepCounterFraction">
                      {currentStep} / 4
                    </span>
                    <button
                      className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                      onClick={nextStep}
                      disabled={currentStep === 4}
                    >
                      <MaterialIcon name="chevron_right" size={20} />
                    </button>
                  </div>
                </div>
              </StitchCard>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-space-lg">
              <StitchCard className="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Chequeo rápido</h2>
                  <span className={`font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold ${
                    isComplete ? "bg-renglon-pasto text-on-primary" : "bg-renglon-pasto-light text-status-completed"
                  }`}>
                    {checkedCount} de 4
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  {CHECKS.map((c) => (
                    <CheckItem
                      key={c.id}
                      id={`check-${c.id}`}
                      label={c.label}
                      iconName="check"
                      checked={checks[String(c.id)]}
                      onChange={(id, val) => setChecks((prev) => ({ ...prev, [id]: val }))}
                    />
                  ))}
                </div>
                <div className="h-px w-full bg-outline-variant/30 my-space-xs" />
                <StitchButton
                  variant="primary"
                  onClick={() => {
                    navigate("/mision-2");
                  }}
                  className="w-full py-3 px-space-lg font-label-md text-label-md text-on-primary bg-primary hover:bg-primary-container transition-all shadow-sm flex items-center justify-center gap-space-sm"
                >
                  <span>Pasar al cuaderno físico</span>
                  <MaterialIcon name="arrow_forward" size={18} />
                </StitchButton>
              </StitchCard>

              <StitchCard bordered={false} className="p-space-md rounded-2xl bg-surface-container-low/60 flex items-start gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                <MaterialIcon name="lightbulb" size={20} className="text-primary shrink-0 mt-0.5" />
                <p>
                  Recuerda: este ejercicio es personal y sin sensores. Tómate el tiempo necesario para
                  sentir tus manos relajadas.
                </p>
              </StitchCard>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low py-space-lg">
        <div className="w-full px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
            <div className="flex items-center gap-space-xs">
              <span className="font-semibold text-on-surface">ESCRIBOT</span>
              <span>·</span>
              <span>Taller de Caligrafía 5°</span>
            </div>
            <div className="flex items-center gap-space-md">
              <span className="text-[13px]">Espacio libre sin sensores</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-renglon-cielo" />
                <span className="w-2.5 h-2.5 rounded-full bg-renglon-pasto" />
                <span className="w-2.5 h-2.5 rounded-full bg-renglon-tierra" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
