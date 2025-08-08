# Amazon Search Scraper

Un scraper web para buscar productos en Amazon con interfaz de usuario moderna.

## Instalación

```bash
npm install
```

## Uso

### Opción 1: Ejecutar ambos servicios simultáneamente
```bash
npm start
```

### Opción 2: Ejecutar servicios por separado

**Terminal 1 - Backend (Scraper):**
```bash
npm run scraper
```

**Terminal 2 - Frontend (Vite):**
```bash
npm run dev
```

## Estructura del Proyecto

- `scraper.js` - Backend API con Express que hace scraping de Amazon
- `src/main.js` - Frontend que consume la API
- `index.html` - Interfaz de usuario
- `src/style.css` - Estilos CSS

## Puertos

- **Frontend**: http://localhost:5173 (Vite)
- **Backend**: http://localhost:3001 (Express API)

## Notas Importantes

⚠️ **Advertencia**: El scraping de Amazon puede ser bloqueado por medidas anti-bot. Si no funciona:

1. Espera unos minutos y vuelve a intentar
2. Amazon puede haber cambiado su estructura HTML
3. Considera usar la API oficial de Amazon para producción

## Tecnologías

- **Frontend**: Vite, Vanilla JavaScript
- **Backend**: Express.js, JSDOM, Axios
- **Scraping**: JSDOM para parsing HTML


en desarrollo: https://vpmc97.github.io/isoft-amazon-project/
