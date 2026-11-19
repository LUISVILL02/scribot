import React, { createContext, useContext, useState, useCallback } from "react";

const LS_POINTS = "escribot_points";
const LS_AWARDED = "escribot_awarded";

function storedPoints(): number {
  return parseInt(localStorage.getItem(LS_POINTS) || "0", 10);
}

function awardedKeys(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(LS_AWARDED) || "[]") as string[]);
  } catch {
    return new Set();
  }
}

function getRank(pts: number): string {
  if (pts >= 181) return "Perito Calígrafo";
  if (pts >= 141) return "Detective Senior";
  if (pts >= 101) return "Cadete Detective";
  if (pts >= 51)  return "Escribano";
  if (pts >= 1)   return "Aprendiz";
  return "Detective Novato";
}

interface PointsCtx {
  points: number;
  rank: string;
  addPoints: (key: string, amount: number) => void;
}

const PointsContext = createContext<PointsCtx>({
  points: 0,
  rank: "Detective Novato",
  addPoints: () => {},
});

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(storedPoints);

  const addPoints = useCallback((key: string, amount: number) => {
    const awarded = awardedKeys();
    if (awarded.has(key)) return;
    awarded.add(key);
    localStorage.setItem(LS_AWARDED, JSON.stringify([...awarded]));
    setPoints((prev) => {
      const next = prev + amount;
      localStorage.setItem(LS_POINTS, String(next));
      return next;
    });
  }, []);

  return (
    <PointsContext.Provider value={{ points, rank: getRank(points), addPoints }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  return useContext(PointsContext);
}
