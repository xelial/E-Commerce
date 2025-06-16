function load(id, url) {
  const req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  document.getElementById(id).innerHTML = req.responseText;
}
load("header", "header.html");
load("footer", "footer.html");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((res) => res.json())
  .then((product) => {
    document.getElementById("product-detail").innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow">
          <img src="${product.image}" alt="${
      product.title
    }" class="w-full h-[400px] object-contain" />
        </div>
        <div class="flex flex-col justify-center">
          <h1 class="text-3xl font-semibold mb-2">${product.title}</h1>
          <p class="text-gray-500 mb-2 capitalize">${product.category}</p>
          <h2 class="text-2xl font-bold text-black mb-4">Rp ${(
            product.price * 15000
          ).toLocaleString()}</h2>
          <p class="mb-6 text-sm text-gray-600">${product.description}</p>

   
          <div class="mb-4">
            <label for="size" class="block font-medium mb-1">Size</label>
            <select id="size" class="w-40 border border-gray-300 rounded px-3 py-2">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

     
          <div class="mb-6">
            <label for="quantity" class="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value="1"
              class="w-20 border border-gray-300 rounded px-3 py-2"
            />
          </div>

        
          <div class="flex gap-4">
          <button onclick="showModal('buy')" class="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition rounded">
            Buy Now
          </button>
          <button onclick="showModal('cart')" class="bg-white text-black border border-black px-6 py-3 font-medium hover:bg-gray-200 transition rounded">
            Add to Cart
          </button>
        </div>
        
    
  
        <div id="success-modal" class="fixed inset-0 z-50 flex items-center justify-center hidden">
        <!-- Modal Box -->
        <div class="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-300">
          <!-- Close Icon (Top Right) -->
          <button onclick="closeModal()" class="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        
          <!-- Modal Content -->
          <div class="flex items-center space-x-3">
            <div class="text-green-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-700">Success!</h2>
              <p id="modal-message" class="text-gray-700 mt-1">Item added to cart.</p>
            </div>
          </div>
        </div>
      </div>
      `;
  });

function showModal(action) {
  const modal = document.getElementById("success-modal");
  const message = document.getElementById("modal-message");

  if (action === "buy") {
    message.textContent = "Proceeding to buy...";
  } else {
    message.textContent = "Item added to cart.";
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("success-modal").classList.add("hidden");
}
