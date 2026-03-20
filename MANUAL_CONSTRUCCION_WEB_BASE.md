# MANUAL_CONSTRUCCION_WEB_BASE

## Objetivo de la arquitectura

Esta arquitectura está pensada para construir sitios web claros, escalables y reutilizables desde una lógica de sistema. No parte de una landing improvisada, sino de una base multipágina con navegación consistente, bloques reutilizables, jerarquía de conversión y estructura semántica suficiente para SEO, mantenimiento y futuras adaptaciones.

Su valor principal es separar dos capas:

- estructura universal reusable
- contenido específico de la marca actual

La estructura universal permite replicar el sistema en negocios de servicios, marcas técnicas, proyectos culturales, ecommerce consultivo, instituciones, estudios creativos o empresas locales. El contenido específico define cómo esa estructura se expresa para Tierra & Agua.

## Estructura global del sitio

### Arquitectura implementada

- `index.html`
- `soluciones.html`
- `aplicaciones.html`
- `nosotros.html`
- `contacto.html`
- `styles/global.css`
- `scripts/main.js`

### Layout base reutilizable

1. `header` persistente con navegación principal y CTA.
2. `main` compuesto por bloques seccionales independientes.
3. `footer` persistente con mapa del sitio, contacto y cierre de marca.
4. sistema visual compartido desde `styles/global.css`.
5. componentes globales inyectados desde `scripts/main.js` para reutilizar `header` y `footer`.

### Patrón de navegación

- Inicio
- Soluciones
- Aplicaciones
- Nosotros
- Contacto

Este patrón puede adaptarse a casi cualquier negocio:

- `Soluciones` puede convertirse en Servicios, Productos, Programas o Líneas de negocio.
- `Aplicaciones` puede convertirse en Casos de uso, Sectores, Portafolio, Industrias o Beneficios por perfil.
- `Nosotros` puede convertirse en Marca, Equipo, Método o Filosofía.
- `Contacto` puede convertirse en Cotización, Reserva, Agenda, Diagnóstico o Compra.

## Esqueleto funcional de cada página

### 1. Inicio

Objetivo:
Presentar la propuesta de valor, explicar rápidamente qué resuelve la marca y llevar a una acción principal.

Esqueleto:

1. Hero con propuesta de valor, CTA principal, CTA secundario y puntos de confianza.
2. Bloque de problemas o necesidades resueltas.
3. Bloque de sectores o escenarios de aplicación.
4. Bloque de proceso o metodología.
5. Banner de cierre con CTA de alta intención.

Lógica de conversión:
Problema -> claridad -> adaptación al contexto -> método -> contacto.

### 2. Soluciones

Objetivo:
Organizar la oferta en módulos entendibles y facilitar que el usuario identifique qué le conviene.

Esqueleto:

1. Hero interno con explicación de la página.
2. Stack de soluciones o servicios.
3. Bloque de beneficios o criterios de decisión.
4. Bloque FAQ para reducir objeciones.

Lógica de conversión:
Oferta -> beneficio -> respuesta a objeciones -> CTA.

### 3. Aplicaciones

Objetivo:
Traducir la oferta a contextos de uso concretos para que el visitante se reconozca dentro del sitio.

Esqueleto:

1. Hero interno contextual.
2. Grid de casos o contextos.
3. Bloque explicativo del patrón contexto-necesidad-respuesta.

Lógica de conversión:
Identificación del visitante -> comprensión de encaje -> contacto.

### 4. Nosotros

Objetivo:
Construir confianza, posicionamiento y criterio de marca.

Esqueleto:

1. Hero interno de marca.
2. Bloques narrativos de visión y diferencial.
3. Bloque de principios de marca.

Lógica de conversión:
Credibilidad -> diferenciación -> afinidad -> acción.

### 5. Contacto

Objetivo:
Convertir interés en conversación útil.

Esqueleto:

1. Hero interno de conversión.
2. Formulario principal.
3. Sidebar con canales alternos y guía para mejorar la calidad del lead.

Lógica de conversión:
Intención -> fricción baja -> claridad de siguiente paso.

## Módulos reutilizables del sistema

### Módulos de layout

- `header` con logo, navegación, CTA y menú móvil.
- `footer` con branding, sitemap y contacto.
- contenedor `.shell` para ancho controlado.

### Módulos de secciones

- hero principal
- hero interno
- cards informativas
- grid de casos o aplicaciones
- timeline o proceso
- FAQ con `details/summary`
- banner de CTA
- bloque narrativo de marca
- formulario + sidebar

### Módulos visuales

- variables CSS reutilizables
- tipografía editorial para titulares
- tipografía geométrica para interfaz
- sistema de tarjetas con radios amplios y fondos translúcidos
- colores de marca con contraste operativo
- gradientes suaves y sombras consistentes

### Módulos de conversión

- CTA primario persistente en header
- CTA secundario contextual por sección
- cierre de página con siguiente paso claro
- copy estructural orientado a diagnóstico y conversación

## Bloques repetibles detectados como sistema

- bloque hero con título, subtítulo, CTA principal, CTA secundario y lista de confianza
- cards modulares para beneficios, principios, casos o categorías
- bloque de proceso en tres pasos
- banner de cierre con CTA
- FAQ para objeciones
- formulario de contacto
- bloques de storytelling para explicar visión, diferencial o método

Estos bloques pueden migrarse a cualquier stack más adelante, por ejemplo React, Next.js, Astro o Webflow, sin perder la lógica.

## Orden recomendado de construcción

1. Definir estructura del sitio y objetivo de conversión.
2. Definir páginas principales y navegación.
3. Construir layout global: `header`, `footer`, contenedores y tipografía.
4. Diseñar hero principal.
5. Implementar módulos reutilizables base: cards, grids, banners, timeline, FAQ, formulario.
6. Construir inicio.
7. Construir páginas internas por prioridad comercial.
8. Ajustar copy por intención de búsqueda y conversión.
9. Añadir metadata y semántica.
10. Documentar sistema reusable.

## Reglas de UX y conversión

- cada página debe tener una intención principal
- cada bloque debe responder a una pregunta del usuario
- el CTA debe corresponder al nivel de madurez del visitante
- el inicio no debe intentar explicar todo; debe orientar y abrir camino
- las páginas internas deben profundizar sin perder escaneabilidad
- la navegación principal debe tener entre 4 y 6 enlaces
- la conversión principal debe repetirse en header, hero y cierre
- el contacto debe pedir solo la información necesaria para iniciar una conversación útil

## Reglas SEO y técnicas

### SEO estructural

- una sola `h1` por página
- subtítulos con jerarquía consistente
- títulos y descripciones únicos por página
- textos que combinen claridad comercial con intención semántica
- bloques internos que permitan capturar búsquedas por solución, contexto o problema

### Técnicas

- HTML semántico con `header`, `nav`, `main`, `section`, `article`, `footer`
- CSS centralizado con variables
- JavaScript mínimo para comportamiento global
- estructura de archivos simple y portable
- `header` y `footer` inyectados desde un solo archivo para reducir duplicación
- formulario aislado para futura integración con backend o automatización
- JSON-LD básico en la home como punto de partida

## Buenas prácticas técnicas detectadas y aplicadas

- separación entre contenido de páginas y elementos compartidos
- sistema de diseño basado en tokens visuales
- responsive layout sin depender de librerías
- diseño modular que soporta crecimiento
- contenido preparado para ser reemplazado sin romper estructura

## Patrón SEO visible

El patrón SEO implementado se apoya en tres capas:

1. páginas orientadas a intención:
   `Inicio`, `Soluciones`, `Aplicaciones`, `Nosotros`, `Contacto`
2. semántica explícita:
   cada bloque tiene título y función clara
3. copy reutilizable con términos de oferta + contexto:
   solución, diagnóstico, sistema, aplicación, proyecto, implementación

## Sistema visual reutilizable

- base cromática natural con verdes profundos, neutros cálidos y acento terroso
- contraste entre títulos editoriales y texto funcional
- tarjetas translúcidas sobre fondo con degradados suaves
- radios amplios para sensación contemporánea y modular
- CTA redondeados con jerarquía visual evidente

Este sistema puede adaptarse a otros negocios cambiando:

- paleta
- tipografías
- tono del copy
- iconografía o fotografía

sin tocar la arquitectura base.

## Diferencias entre estructura universal y contenido específico de esta marca

### Estructura universal reusable

- arquitectura de 5 páginas
- navegación principal con CTA persistente
- hero comercial
- páginas de solución, contexto, marca y contacto
- módulos repetibles de cards, proceso, FAQ, CTA y formulario
- jerarquía visual y semántica
- documentación reusable

### Contenido específico de Tierra & Agua

- nombre de la marca
- tema central de biofiltros y gestión del agua
- enfoque ambiental y técnico
- Instagram `@biofiltro.tierrayagua`
- copy ligado a tratamiento natural, contexto hídrico y soluciones sostenibles

## Qué ajustar antes de publicar

- reemplazar correo y teléfono por datos reales
- validar alcance exacto de servicios y nomenclatura comercial
- conectar formulario a correo, CRM, WhatsApp o automatización
- incorporar imágenes reales, proyectos, testimonios o casos si existen
- añadir dominio final y canónicas si aplica
