(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();document.querySelector("#search-button").addEventListener("click",()=>{const n=document.querySelector("#search-input").value;n&&axios.get(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(n)}`).then(t=>{const c=t.data;document.querySelector("#searched").innerHTML=c.map(o=>`
        <div>
          <img src="${o.img}" width="100"/>
          <h3>${o.title}</h3>
          <p>Rating: ${o.rating}</p>
          <p>Reviews: ${o.reviews}</p>
        </div>
      `).join("")}).catch(t=>{console.error("Error fetching search:",t),document.querySelector("#searched").innerHTML="Try again later."})});
