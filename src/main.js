import './style.css'

document.querySelector('#search-button').addEventListener('click', () => {
  const query = document.querySelector('#search-input').value; 
  if (!query) return; // Salir si no hay término de búsqueda

  // Realizar petición al API del scraper backend
  window.axios.get(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(query)}`)
    .then(response => {
      const results = response.data;
      
      // Generar HTML para mostrar los productos encontrados
      document.querySelector('#searched').innerHTML = results.map(item => `
          <div class="searched-card">
            <img src="${item.img}" alt="Product image"/>
            <h3>${item.title}</h3>
            <p><strong>Price:</strong> ${item.price || 'N/A'}</p>
            <p><strong>Rating:</strong> ${item.rating || 'N/A'}</p>
            <p><strong>Reviews:</strong> ${item.reviews || 'N/A'}</p>
          </div>
        `).join('');
    })
    .catch(error => {
      document.querySelector('#searched').innerHTML = 'Try again later.';
    });
});