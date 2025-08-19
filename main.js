fetch("https://fakestoreapi.com/products?limit=4")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("products-container");

    products.forEach((product) => {
      const categories = ["TOP", "OUTER", "DRESS", "BOTTOM"];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const productHTML = `
         <div class="w-[48%] sm:w-[23%] flex flex-col items-center">
           <div class="w-full aspect-[3/4] overflow-hidden flex justify-center items-center">
           <a href="contentDetails.html?id=${product.id}">

          <img
                src="${product.image}"
                alt="${product.title}"
                class="product-image cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </a>
           </div>
           <h2 class="text-center text-base sm:text-lg font-medium mt-2 sm:mt-3">
             ${randomCategory}
           </h2>
           <h3 class="font-light text-gray-700">Rp ${(
             product.price * 15000
           ).toLocaleString()}</h3>
         </div>
       `;

      container.innerHTML += productHTML;
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

load("footer.html");
function load(url) {
  req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  document.getElementById(4).innerHTML = req.responseText;
}

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  // Show current slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  let slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);
});
