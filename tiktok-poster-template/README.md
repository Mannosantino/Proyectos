# Plantilla: poster semi-automático de TikTok

Molde genérico de un sistema en producción (una agencia de autos usados
publicando en TikTok, corriendo 3 veces por día) — sin IDs, sin URLs reales,
sin datos de ningún negocio. Sirve como punto de partida para adaptarlo a
cualquier catálogo (autos, inmuebles, productos de un local, lo que sea) que
se publique como fotos con un caption armado a partir de datos estructurados.

## Qué hace

- Cada corrida elige un ítem por **round-robin**: el que hace más tiempo que
  no se publica (o nunca se publicó) va primero.
- Arma un **caption** desde una plantilla con datos del ítem, respetando el
  límite de 150 caracteres de TikTok, con un orden de recorte definido que
  nunca saca los datos más importantes.
- Antes de publicar, valida la **portada** contra un mapa auditado a mano:
  si un ítem no tiene una portada aprobada por un humano, se salta (no se
  publica con la foto que la rutina "cree" que es la mejor).
- **Publica sola, de verdad, sin ningún clic humano**, usando la API de
  Buffer (ya auditado por TikTok como Marketing Partner). Si Buffer no está
  configurado, o la llamada falla, cae automáticamente a un camino de
  respaldo: deja todo armado y avisa por notificación push para que un
  humano confirme en un chat nuevo, con el widget de TikTok. Nunca deja de
  reaccionar, publique sola o no.
- Registra cada corrida (éxito por cualquiera de los dos caminos, error o
  salteo) en una carpeta de logs, que es también la que alimenta el
  round-robin de la próxima corrida.

## Por qué el camino de respaldo nunca desaparece

TikTok, a través del conector MCP HIGGA, exige que la publicación vía ese
conector se confirme dentro de un widget interactivo con un humano presente
— el token de publicación **solo existe** si alguien abre y confirma ese
widget. Ninguna rutina desatendida puede generarlo ni saltearlo por HIGGA;
ni vale la pena intentarlo, la propia herramienta lo bloquea ("chat
confirmations and boolean attestations do not authorize publication"). Por
eso la publicación 100% automática pasa por otro lado (Buffer, ver abajo), y
el camino manual con HIGGA queda siempre como respaldo si esa otra vía falla
o todavía no está configurada.

**Cómo se logra la publicación 100% automática**, sin ningún clic humano
por post:
- **Buffer** (o Hootsuite, Later, y otros "TikTok Marketing Partners"
  auditados) ya pasaron la auditoría de TikTok, así que su propia API
  publica sin confirmación por post. Es el camino que usa este molde (ver
  "CONFIGURAR BUFFER" al final de `PROMPT.template.md`): conectás la cuenta
  de TikTok a Buffer una sola vez, generás una API key personal, y la
  rutina llama directo a `api.buffer.com`. Buffer tiene plan gratis (hasta
  3 cuentas, 10 posts en cola) — alcanza para unas pocas publicaciones por
  día.
- La otra alternativa, más pesada, es integrar la **Content Posting API
  oficial de TikTok** directamente: existe y no pide confirmación por post,
  pero publicar en público (no solo privado) requiere pasar la propia
  auditoría de TikTok para tu app, que suele tardar entre 1 y varias
  semanas. No es necesaria si Buffer ya resuelve el caso de uso.

## Adaptar esta plantilla

1. Copiar `PROMPT.template.md` y reemplazar cada `{PLACEHOLDER}` por los
   datos reales del negocio (nombre, ciudad, IDs de las carpetas/archivos
   de donde salen los datos, plantilla del caption, hashtags fijos).
2. Armar a mano el mapa de portadas auditadas para los ítems reales (ver el
   formato de ejemplo al final del archivo).
3. Crear la rutina programada con ese prompt (ver `/schedule` en Claude
   Code, o la API de rutinas) con los conectores MCP que haga falta
   (típicamente storage + HIGGA).

## Qué NO incluye este repo a propósito

IDs de carpetas o archivos, URLs de imágenes, nombres de negocios o de
productos reales, y el mapa de portadas auditadas real. Todo eso vive en un
repo privado aparte, específico de cada implementación.
