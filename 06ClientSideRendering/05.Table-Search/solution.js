import { getAllItems } from './data.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

function solve() {
   const root = document.querySelector('tbody');
   let inputField = document.getElementById('searchField');
   let searchSnippet = '';

   document.querySelector('#searchBtn').addEventListener('click', onClick);

   const tableRowTemplate = (students) => students.map(student =>
      checkMatch(student)
         ?
         html
            `      
            <tr class="select">
               <td>${student.firstName} ${student.lastName}</td>
               <td>${student.email}</td>
               <td>${student.course}</td>
            </tr>
         `
         :
         html
            `      
            <tr>
               <td>${student.firstName} ${student.lastName}</td>
               <td>${student.email}</td>
               <td>${student.course}</td>
            </tr>
`);

   async function updateView() {
      const data = Object.values(await getAllItems());
      render(tableRowTemplate(data), root);
   }

   function onClick() {
      searchSnippet = inputField.value.toLowerCase();
      updateView()
      inputField.value = '';
   }

   function checkMatch(student) {
      let data = Object
         .values(student)
         .map(item => item.toLowerCase());

      const filteredData = data.filter(item => item.includes(searchSnippet))
      if (filteredData.length > 0 && searchSnippet !== '') {
         return true;
      } else {
         return false;
      }
   }

   updateView();
}

solve()