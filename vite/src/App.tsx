import { useCallback, useState, type FormEvent } from "react";
import { HologramScene } from "./components/HologramScene";
import { useDevStore } from "./store";
import { useVoice } from "./hooks/useVoice";

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <path d="M12 18v3" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22 11 13 2 9 22 2Z" />
    </svg>
  );
}

function localReply(input: string): string {
  const t = input.toLowerCase();
  if (t.includes("quem é você") || t.includes("quem e voce") || t.includes("seu nome")) {
    return "Eu sou o DEV — arquiteto de inovação. Código flui pelos meus circuitos.";
  }
  if (t.includes("olá") || t.includes("ola") || t.includes("oi") || t.includes("e aí")) {
    return "Olá. Núcleo holográfico online. Como posso ajudar?";
  }
  if (t.includes("hora")) {
    return `Agora são ${new Date().toLocaleTimeString("pt-BR")}.`;
  }
  if (t.includes("obrigado") || t.includes("valeu")) {
    return "Às ordens. Sempre que precisar, é só chamar.";
  }
  return `Entendi: “${input}”. Estou em modo local no navegador. Em breve posso conectar uma IA completa.`;
}

export default function App() {
  const [text, setText] = useState("");
  const lastReply = useDevStore((s) => s.lastReply);
  const setLastReply = useDevStore((s) => s.setLastReply);
  const phase = useDevStore((s) => s.phase);

  const handleUserText = useCallback(
    (msg: string) => {
      const reply = localReply(msg);
      setLastReply(reply);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(reply);
        u.lang = "pt-BR";
        u.rate = 1.02;
        window.speechSynthesis.speak(u);
      }
    },
    [setLastReply]
  );

  const { supported, listening, toggle } = useVoice(handleUserText);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = text.trim();
    if (!msg) return;
    setText("");
    handleUserText(msg);
  };

  return (
    <div className="app">
      <div className="canvas-wrap">
        <HologramScene />
      </div>

      <div className="hud">
        <div className="top-bar">
          <div className="brand">
            <div className="brand-name">DEV</div>
            <div className="brand-sub">Arquiteto de inovação</div>
          </div>
          <div className="status-row">
            <span className={`pill ${phase !== "listening" ? "online" : ""}`}>
              {phase === "listening" ? "OUVINDO" : phase === "speaking" ? "FALANDO" : "ONLINE"}
            </span>
            <span className="pill">WEB</span>
          </div>
        </div>

        <div className="spacer" />

        <div className="chat-panel">
          <div className="bubble">
            <strong>DEV</strong>
            {lastReply}
          </div>

          <form className="input-row" onSubmit={onSubmit}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Fale com o DEV…"
              enterKeyHint="send"
              autoComplete="off"
              autoCapitalize="sentences"
            />
            {supported && (
              <button
                type="button"
                className={`icon-btn ${listening ? "listening" : ""}`}
                onClick={toggle}
                aria-label="Microfone"
              >
                <MicIcon />
              </button>
            )}
            <button type="submit" className="icon-btn" aria-label="Enviar">
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
