// Start the interactive features after the page content is ready.
document.addEventListener("DOMContentLoaded",()=>{loadAnnouncement();setupEventSearch();setupDiningSearch();setupStudySearch();setupActionButtons();});

// Demonstration API request. JSONPlaceholder is sample data, not a campus API.
async function loadAnnouncement(){
 const box=document.querySelector("#announcement-content"); if(!box)return;
 try{const response=await fetch("https://jsonplaceholder.typicode.com/posts/1");if(!response.ok)throw new Error("Request failed");const data=await response.json();box.textContent=data.title;}
 catch(error){box.textContent="Sample announcement unavailable. A real campus announcement feed can be connected later.";console.error(error);}
}

// Search and category filter for the example event cards.
function setupEventSearch(){
 const form=document.querySelector("#event-search-form");if(!form)return;
 const input=document.querySelector("#event-search"),category=document.querySelector("#event-category"),status=document.querySelector("#event-status");
 function filter(){let count=0;document.querySelectorAll(".event-item").forEach(card=>{const ok=card.textContent.toLowerCase().includes(input.value.toLowerCase().trim())&&(category.value==="all"||card.dataset.category===category.value);card.classList.toggle("d-none",!ok);if(ok)count++;});if(status)status.textContent=`Showing ${count} sample event(s); these are not live campus listings.`;}
 form.addEventListener("submit",e=>{e.preventDefault();filter();});category.addEventListener("change",filter);
 document.querySelector("#clear-event-search").addEventListener("click",()=>{input.value="";category.value="all";filter();});
}

// Search dining cards by text and selected meal.
function setupDiningSearch(){
 const form=document.querySelector("#dining-search-form");if(!form)return;
 form.addEventListener("submit",e=>{e.preventDefault();const term=document.querySelector("#dining-search").value.toLowerCase().trim(),meal=document.querySelector("#meal-type").value;
 document.querySelectorAll(".dining-item").forEach(card=>{const textMatch=card.textContent.toLowerCase().includes(term),mealMatch=meal==="all"||card.dataset.meals.split(" ").includes(meal);card.classList.toggle("d-none",!(textMatch&&mealMatch));});});
}

// Search study spaces by text and quiet/group type.
function setupStudySearch(){
 const form=document.querySelector("#study-search-form");if(!form)return;
 form.addEventListener("submit",e=>{e.preventDefault();const term=document.querySelector("#study-search").value.toLowerCase().trim(),type=document.querySelector("#study-type").value;
 document.querySelectorAll(".study-item").forEach(card=>{const textMatch=card.textContent.toLowerCase().includes(term),typeMatch=type==="all"||card.dataset.type===type;card.classList.toggle("d-none",!(textMatch&&typeMatch));});});
}

// Button actions explain that this version still uses placeholder information.
function setupActionButtons(){
 document.querySelectorAll(".details-button").forEach(b=>b.addEventListener("click",()=>alert(`${b.dataset.title}: sample event details. Add real dates and locations later.`)));
 document.querySelectorAll(".menu-button").forEach(b=>b.addEventListener("click",()=>alert(`${b.dataset.title}: menu information is a placeholder for now.`)));
 document.querySelectorAll(".location-button").forEach(b=>b.addEventListener("click",()=>alert(`${b.dataset.title}: add the actual building location or map link later.`)));
}
