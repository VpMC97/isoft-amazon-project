# Amazon Search Scraper

Un scraper web para buscar productos en Amazon.

## Instalación

```bash
npm install
```

## Uso

### Opción 1: Ejecutar ambos servicios simultáneamente
```bash
npm start
```
## Estructura del Proyecto

- `scraper.js` - Backend API con Express que hace scraping de Amazon
- `src/main.js` - Frontend que consume la API
- `index.html` - Interfaz de usuario
- `src/style.css` - Estilos CSS

## Notas Importantes

⚠️ **Advertencia**: El scraping de Amazon puede ser bloqueado por medidas anti-bot.

## Tecnologías

- **Frontend**: Vite, Vanilla JavaScript, HTML & CSS
- **Backend**: Express.js, JSDOM, Axios
- **Scraping**: JSDOM para parsing HTML


Prueba la página en desarrollo: https://vpmc97.github.io/isoft-amazon-project/
