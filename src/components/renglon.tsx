import React, { forwardRef, useImperativeHandle } from "react";
import { MaterialIcon } from "./ui";

export function RenglonGuide({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="h-1/3 renglon-band-cielo flex items-center justify-between px-space-md">
        <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
          <MaterialIcon name="cloud" size={16} /> Cielo (Superior)
        </span>
      </div>
      <div className="h-1/3 renglon-band-pasto">
        <span className="font-label-sm text-label-sm text-status-completed font-semibold flex items-center gap-1">
          <MaterialIcon name="grass" size={16} /> Pasto (Base central)
        </span>
      </div>
      <div className="h-1/3 renglon-band-tierra">
        <span className="font-label-sm text-label-sm text-renglon-tierra font-semibold flex items-center gap-1">
          <MaterialIcon name="terrain" size={16} /> Tierra (Inferior)
        </span>
      </div>
    </div>
  );
}

export interface TraceCanvasProps {
  width?: number;
  height?: number;
  ghostLetter?: string;
  onSave?: () => void;
}

export interface TraceCanvasHandle {
  clear: () => void;
  save: () => void;
  setColor: (color: string) => void;
}

export const TraceCanvas = forwardRef<TraceCanvasHandle, TraceCanvasProps>(
  ({
    width = 900,
    height = 400,
    ghostLetter = "d",
    onSave,
  },
  ref,
) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const strokeColorRef = React.useRef("#3525cd");

  // Dibuja la letra fantasma respetando las zonas de renglón:
  // baseline tipográfico en el borde inferior de Pasto (y = 2/3 del canvas).
  // Ascendentes (d, b, l...) suben al Cielo; descendentes (p, g, j...) bajan a la Tierra.
  const drawGhost = React.useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const zoneH = canvas.height / 3;
    const fontSize = Math.round(zoneH * 1.85);
    ctx.save();
    ctx.globalAlpha = 0.13;
    ctx.fillStyle = "#3525cd";
    ctx.font = `bold ${fontSize}px 'Quicksand', Georgia, serif`;
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    ctx.fillText(ghostLetter, canvas.width / 2, zoneH * 2);
    ctx.restore();
  }, [ghostLetter]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 6;
    ctx.strokeStyle = strokeColorRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGhost(canvas);
  }, [drawGhost]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = strokeColorRef.current;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const stopDraw = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGhost(canvas);
  };

  const handleSave = () => {
    onSave?.();
  };

  useImperativeHandle(ref, () => ({
    clear: clearCanvas,
    save: handleSave,
    setColor: (color: string) => {
      strokeColorRef.current = color;
    },
  }));

  return (
    <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-surface-paper border border-surface-container shadow-inner">
      {/* Bandas de fondo con etiquetas */}
      <div className="absolute inset-0 flex flex-col pointer-events-none select-none z-0">
        <div className="h-1/3 bg-renglon-cielo-light/60 flex items-center px-3">
          <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1 opacity-70">
            <MaterialIcon name="cloud" size={14} /> Cielo
          </span>
        </div>
        <div className="h-1/3 bg-renglon-pasto-light/60 border-t border-b border-renglon-pasto/20 flex items-center px-3">
          <span className="font-label-sm text-label-sm text-status-completed font-semibold flex items-center gap-1 opacity-70">
            <MaterialIcon name="grass" size={14} /> Pasto
          </span>
        </div>
        <div className="h-1/3 bg-renglon-tierra-light/50 flex items-center px-3">
          <span className="font-label-sm text-label-sm text-renglon-tierra font-semibold flex items-center gap-1 opacity-70">
            <MaterialIcon name="terrain" size={14} /> Tierra
          </span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-crosshair select-none touch-none block"
        width={width}
        height={height}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
    </div>
  );
});

TraceCanvas.displayName = "TraceCanvas";
