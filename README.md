# Jarvis / DEV — Assistente holográfico

Assistente estilo Jarvis com visual **DEV** (holograma), chat e voz em português.  
Funciona no **navegador do celular e tablet** e pode ser instalado como PWA.

## Versão web (pronto para o celular)

Pasta `web/` — site estático, sem build.

### Publicar em 1 minuto

1. Abra https://app.netlify.com/drop  
2. Arraste a pasta **`web`**  
3. Abra o link no celular  

### Ou GitHub Pages

Settings → Pages → Source: Deploy from branch → `main` / pasta `/web` (ou root se preferir).

### Instalar como app

- **Android:** Chrome → Instalar app  
- **iPhone:** Safari → Compartilhar → Adicionar à Tela de Início  

## O que tem

- Visual holográfico do personagem DEV  
- Anéis, partículas, cena 3D (Three.js)  
- Chat por texto  
- Voz (microfone + fala) em pt-BR  
- PWA (manifest + service worker)  

## Estrutura

```
web/           → versão estática (use esta no celular)
  index.html
  manifest.webmanifest
  sw.js
  dev-ref.jpg      → coloque a arte do DEV aqui
  icon-192.png
  icon-512.png
src/ (opcional) → versão Vite/React se quiser evoluir o projeto
```

## Arte do DEV

Inclua as imagens na pasta `web/`:

- `dev-ref.jpg` — logo/personagem principal  
- `icon-192.png` / `icon-512.png` — ícones PWA  

## Licença

Projeto pessoal — DEV / Jarvis assistant.
