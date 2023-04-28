import { towns } from "./towns.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('towns');
const result = document.getElementById('result');
let resultCounter = 0;
let searchSnippet = '';

document.querySelector('button').addEventListener('click', search);

const listTemplate = (list) => html
`
   <ul>
      ${list.map((item) => 
      item.includes(searchSnippet) && searchSnippet !== '' 
      ? 
      html`<li class='active' ${resultCounter++}>${item}</li>`
      :
      html`<li>${item}</li>`)}
   </ul>
`
function search() {
   searchSnippet = document.getElementById('searchText').value;
   updateView();
   result.textContent = `${resultCounter} matches found`; 
   resultCounter = 0;
}

function updateView() {
   render(listTemplate(towns), root);
}

updateView();