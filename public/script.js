 
const searchInput = document.getElementById('search-input');  
const searchButton = document.getElementById('search-button');  
const resultsContainer = document.getElementById('results-container');  
const paginationContainer = document.getElementById('pagination-container');  
const filterBookSelect = document.getElementById('filter-book-select');  
const filterChapterSelect = document.getElementById('filter-chapter-select');  
  
let currentPageNumber = 1;  
let pageSize = 10;  
  
searchButton.addEventListener('click', (e) =&gt; {  
  e.preventDefault();  
  const searchTerm = searchInput.value.trim();  
  fetch(`/search?searchTerm=${searchTerm}&amp;pageSize=${pageSize}&amp;pageNumber=${currentPageNumber}`)  
  .then((response) =&gt; response.json())  
  .then((data) =&gt; {  
    const resultsHtml = data.results.map((row) =&gt; {  
      return `  
       <div>  
        <h2>${row.Book} ${row.Chapter}:${row.Verse}</h2>  
        <p>${row.Text}</p>  
       </div>  
      `;  
    }).join('');  
    resultsContainer.innerHTML = resultsHtml;  
  
    const paginationHtml = '';  
    for (let i = 1; i &lt;= data.totalPages; i++) {  
      paginationHtml += `<button data-page-number="${i}" class="pagination-button">${i}</button>`;  
    }  
    paginationContainer.innerHTML = paginationHtml;  
  
    const paginationButtons = document.querySelectorAll('.pagination-button');  
    paginationButtons.forEach((button) =&gt; {  
      button.addEventListener('click', (e) =&gt; {  
       currentPageNumber = parseInt(e.target.dataset.pageNumber);  
       searchButton.click();  
      });  
    });  
   });  
});  
  
filterBookSelect.addEventListener('change', (e) =&gt; {  
  const filterBook = e.target.value;  
  searchButton.click();  
});  
  
filterChapterSelect.addEventListener('change', (e) =&gt; {  
  const filterChapter = e.target.value;  
  searchButton.click();  
});  

