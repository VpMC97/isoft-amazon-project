(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();document.querySelector("#search-button").addEventListener("click",()=>{const n=document.querySelector("#search-input").value;n&&window.axios.get(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(n)}`).then(o=>{const c=o.data;document.querySelector("#searched").innerHTML=c.map(t=>`
          <div class="searched-card">
            <img src="${t.img}" alt="Product image"/>
            <h3>${t.title}</h3>
            <p><strong>Price:</strong> ${t.price||"N/A"}</p>
            <p><strong>Rating:</strong> ${t.rating||"N/A"}</p>
            <p><strong>Reviews:</strong> ${t.reviews||"N/A"}</p>
          </div>
        `).join("")}).catch(o=>{document.querySelector("#searched").innerHTML="Try again later."})});
