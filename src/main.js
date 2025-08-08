import './style.css'

document.querySelector('#search-button').addEventListener('click', () => {
  const query = document.querySelector('#search-input').value; 
  if (!query) return;

  window.axios.get(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(query)}`)
    .then(response => {
      const results = response.data;
      document.querySelector('#searched').innerHTML = results.map(item => `
        <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px;">
          <img src="${item.img}" width="100" style="border-radius: 4px;"/>
          <h3>${item.title}</h3>
          <p><strong>Price:</strong> ${item.price || 'N/A'}</p>
          <p><strong>Rating:</strong> ${item.rating || 'N/A'}</p>
          <p><strong>Reviews:</strong> ${item.reviews || 'N/A'}</p>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error fetching search:', error);
      document.querySelector('#searched').innerHTML = 'Try again later.';
    });
});