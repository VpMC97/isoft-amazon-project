(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();document.querySelector("#search-button").addEventListener("click",()=>{const n=document.querySelector("#search-input").value;n&&window.axios.get(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(n)}`).then(o=>{const s=o.data;document.querySelector("#searched").innerHTML=s.map(t=>`
        <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px;">
          <img src="${t.img}" width="100" style="border-radius: 4px;"/>
          <h3>${t.title}</h3>
          <p><strong>Price:</strong> ${t.price||"N/A"}</p>
          <p><strong>Rating:</strong> ${t.rating||"N/A"}</p>
          <p><strong>Reviews:</strong> ${t.reviews||"N/A"}</p>
        </div>
      `).join("")}).catch(o=>{console.error("Error fetching search:",o),document.querySelector("#searched").innerHTML="Try again later."})});
