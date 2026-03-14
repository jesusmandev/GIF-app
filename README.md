# Aplicación de GIFs (Premium Edition)

Una aplicación web inmersiva para buscar, explorar y descargar GIFs utilizando la API oficial de Giphy. Este proyecto fue reconstruido desde cero para ofrecer una experiencia visual de máximo nivel (diseño "Neo-Tactile") con animaciones fluidas, un rendimiento excelente y controles interactivos premium.

## 🚀 Especificaciones del Proyecto

### Stack Tecnológico
*   **Framework:** React 19 (con TypeScript)
*   **Build Tool:** Vite
*   **Estilado:** Tailwind CSS v4 (utilizando utilidades modernas estilo `@theme` y variables puras)
*   **Animación UI:** Framer Motion (para transiciones de escala, stagger, y físicas "spring")
*   **Peticiones HTTP:** Axios

### Características Principales
*   **Diseño Neo-Tactile (Glassmorphism):** Interfaz basada en componentes translúcidos tipo cristal (`backdrop-blur-2xl`), con sombras profundas direccionales y bordes highlights precisos que otorgan un volumen y tactilidad Premium a la UI.
*   **Fondo Mesh Dinámico:** Fondo compuesto por una iluminación de "estudio" asimétrica en tonos Cyan y Azul Profundo sobre una base de pizarra oscura (`#1f232e`), ofreciendo una experiencia inmersiva minimalista.
*   **Bubble Cursor Trail:** Un motor ligero renderizado en `<canvas>` que sigue el rastro del cursor del usuario generando partículas translúcidas estilo "burbuja" en los colores de la marca para mantener la UI "viva" al interactuar.
*   **Layout Masonry Escalonado:** Algoritmo visual de columnas CSS puras (estilo Pinterest) que ordena los GIFs fluidamente, combinado con `<AnimatePresence>` de Framer Motion para lograr una entrada escalonada en "cascada" a medida que cargan las imágenes.
*   **Autocompletado Rápido:** Integración del endpoint de `tags` de Giphy que ofrece sugerencias de etiquetas conforme el usuario teclea (Live Search con `setTimeout` debounce) dentro de un dropdown animado.
*   **Gestión de Descargas con Feedback:** Descarga directa `.gif` generando `Blob` localmente, acompañado de feedback visual activo en los botones para que el usuario aprecie el trabajo de carga.

## 🛠 Instalación Local

Para correr este proyecto en tu propia máquina:

1. **Clona el repositorio**
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Configura las Variables de Entorno:**
   Renombra o copia el archivo `.env.template` a `.env` y añade tu API Key personal de Giphy:
   ```env
   VITE_GIPHY_API_KEY=tu_api_key_aqui
   ```
4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## 📜 Licencia MIT

Copyright (c) 2026

Por la presente se concede permiso, sin cargo, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), para utilizar el Software sin restricción, incluyendo sin limitación los derechos de usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender copias del Software, y para permitir a las personas a las que se les proporcione el Software a hacer lo mismo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
