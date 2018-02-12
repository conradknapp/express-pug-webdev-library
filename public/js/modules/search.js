import axios from "axios";

function searchResultsHTML(books) {
  return books
    .map((el, i) => {
      return `
      <div style="animation-delay: ${0.2 *
        (i + 1)}s" class="search-result-item">
        <div class="author-result">${el.author}</div>

        <div class="book-result"><a href="/${el._id}">
        <strong>${el.title}</strong>
      </a></div>
      </div>`;
    })
    .join("");
}

function onSearch(search) {
  if (!search) return;

  var input = document.querySelector('input[name="search"]');
  var button = document.querySelector('form[name="submit"]');
  var searchResults = document.querySelector(".results");
  var resultsTitle = document.querySelector(".results-title");
  var lengthResults = document.querySelector(".results-length");

  button.addEventListener("submit", e => {
    if (!input.value) return;

    e.preventDefault();
    const searchResults = document.querySelector(".results");

    axios.get(`/api/search?q=${input.value}`).then(res => {
      if (res.data.length) {
        const html = searchResultsHTML(res.data);
        searchResults.innerHTML = html;
        resultsTitle.style.display = "flex";
        lengthResults.innerText = `${res.data.length} records found`;
        console.log(res.data.length);
      }
    });
  });
}

export default onSearch;
