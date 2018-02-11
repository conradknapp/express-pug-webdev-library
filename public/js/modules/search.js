import axios from "axios";

function searchResultsHTML(books) {
  return books
    .map((el, i) => {
      return `
      <div style="animation-delay: ${0.2 *
        (i + 1)}s" class="search-result-item">
        <div class="author-result">${el.author}</div>

        <div class="book-result"><a href="/books/${el._id}">
        <strong>${el.title}</strong>
      </a></div>
      </div>`;
    })
    .join("");
}

function onSearch(search) {
  if (!search) return;

  const input = document.querySelector('input[name="search"]');
  const button = document.querySelector('form[name="submit"]');
  const searchResults = document.querySelector(".results");

  button.addEventListener("submit", e => {
    if (!input.value) return;

    e.preventDefault();
    const searchResults = document.querySelector(".results");

    axios.get(`/api/search?q=${input.value}`).then(res => {
      if (res.data.length) {
        const html = searchResultsHTML(res.data);
        document.querySelector(".results").innerHTML = html;
      }
    });
  });
}

export default onSearch;
