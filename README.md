# breinergonza.github.io

Perfil técnico de **Breitner González**, Head of Architecture & Development en IFX Networks.
Sitio estático construido con [Jekyll](https://jekyllrb.com/) y publicado con GitHub Pages.

- Sitio principal: <https://breinergonza.net>
- Este sitio: <https://breinergonza.github.io>

## Estructura

| Ruta | Propósito |
|---|---|
| `_data/profile.yml` | **Todo el contenido** (perfil, stack, experiencia, proyectos, formación). Edita aquí. |
| `index.html` | Plantilla de la página, generada a partir de `profile.yml`. |
| `_layouts/default.html` | `<head>`, SEO (`jekyll-seo-tag`), JSON-LD `Person` y CSP. |
| `_includes/icon.html` | Iconos SVG en línea (sin fuentes de iconos externas). |
| `assets/css/main.css` | Estilos sin frameworks, con tema claro/oscuro. |
| `assets/js/` | JavaScript sin dependencias (tema, texto rotativo, animaciones). |
| `assets/docs/` | CV en PDF (español e inglés). |
| `.github/workflows/ci.yml` | Build, validación de HTML/enlaces, búsqueda de datos sensibles y de secretos. |

## Desarrollo local

Requiere Ruby 3.3 (el gem `github-pages` aún no soporta Ruby 4).

```bash
bundle install
bundle exec jekyll serve --livereload
```

O con Docker, sin instalar Ruby:

```bash
docker run --rm -it -p 4000:4000 -v "$PWD":/srv -w /srv ruby:3.3 \
  sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0"
```

## Privacidad

El sitio es público. No publiques teléfono, dirección, fecha de nacimiento ni documentos de identidad
(ni en el HTML ni dentro de los PDF). El CI falla si detecta patrones de teléfono o cédula en el sitio generado.
