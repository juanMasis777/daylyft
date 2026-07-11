# DayLyft — Estrategia de Marca, Monetización y Marketing

> Documento de trabajo. Acompaña al rediseño visual "premium esmeralda" aplicado en este branch.

---

## 1. Diagnóstico (qué encontré al analizar la app)

**Producto:** DayLyft es un "sistema operativo para tu vida" — 40+ herramientas (tareas, calendario, hábitos, finanzas, salud, foco, journaling) con un copiloto de IA llamado **Kai**. Stack: Next.js 16, Supabase (auth + datos), Stripe (pagos). Planes: Free / Pro $6.99 / Business $12.99.

**Los 3 problemas que frenaban lo "premium":**

1. **Marca partida en dos.** El sitio de marketing era **verde neón** con un logo de "destello"; el producto real (login, dashboard, splash) era **morado** con otro logo de "dos círculos". El usuario compraba una cosa y entraba a otra. → *Corregido:* todo unificado en una identidad **esmeralda premium** con una sola marca ("lift" = elevar tu día).
2. **Color demasiado saturado / look "plantilla de IA".** El `#39d968` gritaba. → *Corregido:* paleta esmeralda madura (`#10b981` / `#059669` / `#34d399`) sobre negros con matiz verde, que leen como producto caro (estilo Linear / Notion / Stripe).
3. **Sin narrativa de valor clara para justificar el precio.** Hay 40+ features pero el mensaje no ordena por qué pagar. Ver secciones 3 y 4.

**Fortaleza enorme que hay que explotar:** DayLyft reemplaza 5–6 suscripciones (tareas + calendario + hábitos + finanzas + IA) por **una**. Ese es el ángulo de venta más potente y ya está en la tabla comparativa de la landing. Todo el marketing debe girar alrededor de esto.

---

## 2. Posicionamiento

**Frase de posicionamiento (usarla en todos lados):**
> "Deja de pagar por 6 apps. DayLyft es tu vida entera —tareas, hábitos, dinero y salud— en un solo lugar, con una IA que de verdad te conoce."

**Categoría:** *Life OS / Personal operating system* (no "otra app de productividad"). Compites contra el caos de tener 6 apps, no contra Notion.

**Cliente ideal (ICP):**
- Primario: profesionales/creadores 22–40 años, "self-improvement", que ya pagan Notion + una app de hábitos + una de finanzas.
- Secundario: estudiantes universitarios (precio bajo, boca a boca alto, ciclo ASO fuerte).
- Expansión: familias y equipos pequeños (plan Business).

---

## 3. Monetización

### 3.1 Ajustes al pricing (rápidos y de alto impacto)

| Cambio | Por qué | Impacto |
|---|---|---|
| **Añadir plan anual con ~2 meses gratis** (Pro $59/año ≈ $4.92/mes) | El anual sube el LTV y baja el churn; es el mayor movimiento de ingresos disponible | 🔥🔥🔥 |
| **Mostrar "anual" por defecto** con toggle mensual/anual | Ancla el precio bajo mensualizado | 🔥🔥 |
| **Subir Pro a $8.99–$9.99 con el tiempo** (grandfather a los actuales) | $6.99 deja dinero en la mesa para 40+ tools + IA; competidores cobran $10–29 | 🔥🔥 |
| **Trial de 7 días con tarjeta** (ya está el link de Stripe) | Filtra curiosos, sube conversión trial→pago | 🔥 |
| **Descuento estudiante -40%** con correo .edu | Canal de adquisición barato + boca a boca | 🔥 |

### 3.2 Palancas del freemium (dónde poner el muro)

El free debe **enganchar diario** y el Pro debe **desbloquear profundidad**. Regla: lo que se usa 1 vez/día es free; lo que da *insight, automatización o histórico* es Pro.

- **Free (hook):** tareas ilimitadas, calendario, hábitos básicos, agua, notas, Pomodoro, 3 mensajes de Kai/día.
- **Pro (valor):** Kai ilimitado, Analytics, Productivity DNA, Energy Map, Autopilot, Night Report, finanzas completas, histórico >30 días, todos los temas.
- **Momentos de upsell contextual** (no solo el muro): cuando el usuario (a) llega al límite de Kai, (b) completa 7 días de racha ("desbloquea tu DNA de productividad"), (c) intenta ver histórico, (d) exporta datos. El upsell que convierte es el que aparece *justo cuando el usuario ya sintió el valor*.

### 3.3 Vías de ingreso más allá de la suscripción

1. **Business/Familias ($12.99/usuario):** ya existe como "coming soon". Convertirlo en waitlist real con captura de correos → primer canal B2B2C.
2. **Add-ons:** "Kai Pro" (modelo más potente / más contexto) como upsell dentro de Pro.
3. **Lifetime deal por tiempo limitado** (p. ej. AppSumo, $99–149) para inyectar caja y reseñas al inicio. Úsalo una sola vez, temprano.
4. **Afiliados:** 30% recurrente a creadores que traigan suscriptores (encaja perfecto con el nicho "productivity/self-improvement" de YouTube/TikTok).

### 3.4 Métricas que hay que instrumentar YA (hoy no están)

Sin números no hay crecimiento. Añadir analytics (PostHog es gratis hasta cierto volumen y open-source):
- **Activación:** % que crea ≥3 tareas o completa onboarding en día 1.
- **Aha moment:** primer uso de Kai. Correlacionar con retención.
- **Retención D1/D7/D30** por cohorte.
- **Trial→paid**, **MRR, churn, LTV**.
- **Feature adoption:** qué de las 40+ tools se usa (probablemente 6–8 cargan el 80% del valor → destacarlas y podar ruido).

---

## 4. Marketing (canales y crecimiento)

### 4.1 El mensaje núcleo (repetir hasta cansarte)
"**1 app en vez de 6.**" + "**Una IA que conoce tu vida.**" Todo creativo parte de ahí.

### 4.2 Canales priorizados (por ROI para un producto así)

**A. Contenido corto en video (TikTok / Reels / YouTube Shorts) — canal #1.**
El nicho "productivity / that girl / self-improvement / romanticize your life" es enorme y barato. Formatos que funcionan:
- "Cómo organizo TODA mi vida en una sola app" (day-in-the-life).
- "Cancelé Notion + [app hábitos] + [app finanzas] y las reemplacé con esto."
- Screen-recordings de Kai dando el briefing de la mañana.
- Cadencia: 1/día, 90% valor / 10% CTA. Consistencia > producción.

**B. ASO (App Store Optimization) / PWA.** Ya hay `manifest.json` y `sw.js` (es instalable como PWA). Si sacas envoltura nativa (Capacitor) o listas la PWA, optimiza título/keywords alrededor de "planner, habits, budget, AI assistant, all in one". Las reseñas son el motor — pide reseña tras un momento de éxito (racha de 7 días).

**C. SEO / contenido escrito.** Artículos "comparación": "DayLyft vs Notion", "mejor alternativa todo-en-uno a Motion/Sunsama", "cómo hacer time-blocking con IA". Compran intención de alto valor. La tabla comparativa de la landing ya es SEO-friendly; conviértela en varias landing pages "vs competidor".

**D. Product Hunt + comunidades (Reddit r/productivity, r/getdisciplined, Indie Hackers).** Un buen lanzamiento en PH da picos de tráfico y backlinks. Prepara assets (GIF del producto, primer comentario del fundador contando el "por qué").

**E. Referidos (growth loop).** "Invita a un amigo → 1 mes de Pro gratis para los dos." Cada usuario feliz trae al siguiente; encaja con el ángulo de "organiza tu vida" que la gente comparte.

**F. Email / retención.** Ya está el Kai briefing — extiéndelo a email: resumen semanal ("tu semana en DayLyft: 34 tareas, 6 días de racha…"). La retención es marketing: un usuario que vuelve es un suscriptor que no cancela.

### 4.3 Motor de crecimiento (cómo se retroalimenta)

```
Video corto (valor) → visita landing → free signup → onboarding (activación)
      → aha con Kai → racha 7 días → upsell contextual → Pro
      → referido / reseña / compartir screenshot → nuevo usuario ↺
```

El trabajo consiste en subir la conversión de **cada** flecha. Empieza por las dos más baratas: (1) activación en onboarding, (2) el momento "aha" de Kai.

### 4.4 Plan de 30 días (concreto)

- **Semana 1:** instrumentar PostHog; activar plan anual en Stripe; arreglar el waitlist de Business (captura real de correos).
- **Semana 2:** grabar 7 videos cortos; publicar 3 landing "vs competidor"; pedir reseñas a los primeros usuarios.
- **Semana 3:** lanzar programa de referidos; preparar Product Hunt.
- **Semana 4:** lanzar en Product Hunt + Reddit; primer email de resumen semanal; medir cohortes D7.

---

## 5. Resumen ejecutivo

- **Marca:** ya unificada en esmeralda premium; una sola identidad de la landing al dashboard. (Hecho en este branch.)
- **Monetización — mayor palanca:** **plan anual** + upsells contextuales + subir Pro con el tiempo. Instrumentar métricas antes que nada.
- **Marketing — mayor palanca:** **video corto diario** con el mensaje "1 app en vez de 6", reforzado con SEO comparativo, referidos y un lanzamiento en Product Hunt.
- **Mantra:** *una app, una IA, toda tu vida.*
