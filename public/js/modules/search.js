import axios from "axios";

function searchResultsHTML(books) {
  return books
    .map(el => {
      return `<div class="book-result"><a href="/books/${el._id}">
      <strong>${el.title}</strong>
    </a></div>`;
    })
    .join("");
}

function searchAhead(search) {
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

export default searchAhead;
