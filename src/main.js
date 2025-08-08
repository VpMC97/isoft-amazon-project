import './style.css'

document.querySelector('#search-button').addEventListener('click', () => {
  const query = document.querySelector('#search-input').value; 
  if (!query) return;

  axios.get(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(query)}`)
    .then(response => {
      const results = response.data;
      document.querySelector('#searched').innerHTML = results.map(item => `
        <div>
          <img src="${item.img}" width="100"/>
          <h3>${item.title}</h3>
          <p>Rating: ${item.rating}</p>
          <p>Reviews: ${item.reviews}</p>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error fetching search:', error);
      document.querySelector('#searched').innerHTML = 'Try again later.';
    });
});