export const imageLoad = document.addEventListener("DOMContentLoaded", () => {
  var imageContainer = document.querySelector(".image-container");
  var bookImage = document.querySelector(".book-image");

  var img = new Image();
  img.src = bookImage.src;
  img.onload = () => {
    bookImage.classList.add("loaded");
  };

  var imgLarge = new Image();
  imgLarge.src = imageContainer.dataset.large;
  imgLarge.onload = () => {
    imgLarge.classList.add("loaded");
  };
  imageContainer.appendChild(imgLarge);
});
