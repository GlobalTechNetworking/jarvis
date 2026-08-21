import { create } from "zustand";

export type Phase = "booting" | "online" | "listening" | "speaking";

type DevState = {
  phase: Phase;
  lastReply: string;
  modelReady: boolean;
  setPhase: (p: Phase) => void;
  setLastReply: (t: string) => void;
  setModelReady: (v: boolean) => void;
};

export const useDevStore = create<DevState>((set) => ({
  phase: "online",
  lastReply:
    "Núcleo holográfico online. Eu sou o DEV — arquiteto de inovação. Fale comigo por texto ou voz.",
  modelReady: false,
  setPhase: (phase) => set({ phase }),
  setLastReply: (lastReply) => set({ lastReply }),
  setModelReady: (modelReady) => set({ modelReady }),
}));
