import { productData } from "./data.js";
import { cartData, cartQuantity } from "./cart.js";
import { saveData, render } from "./cart.js";
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category"); // nếu url có ?category=man category-man
const productList = document.querySelector(".product-list");
productData.forEach((product) => {
  if (product.category === category) {
    const productItem = document.createElement("section");
    productItem.classList.add("product-item");

    const productLink = document.createElement("a");
    productLink.href = "#!";

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = "";
    productImage.classList.add("item-media");

    const itemContent = document.createElement("div");
    itemContent.classList.add("item-content");

    const productNameLink = document.createElement("a");
    productNameLink.href = "#!";
    productNameLink.classList.add("item-name");

    const productName = document.createElement("h3");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = product.price;
    productPrice.classList.add("item-price");

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "THÊM VÀO GIỎ";
    addToCartButton.classList.add("item-add");

    const showCart = document.createElement("a");
    showCart.href = "./product_payment.html";
    showCart.textContent = "XEM GIỎ HÀNG";
    showCart.classList.add("show-add");
    showCart.style.display = "none";
    //name
    productNameLink.appendChild(productName);
    // content
    itemContent.appendChild(productNameLink);
    itemContent.appendChild(productPrice);
    itemContent.appendChild(addToCartButton);
    itemContent.appendChild(showCart);
    // a link
    productLink.appendChild(productImage);
    productLink.appendChild(itemContent);

    productItem.appendChild(productLink);
    productList.appendChild(productItem);

    addToCartButton.addEventListener("click", (e) => {
      e.preventDefault();
      const existingItem = cartData.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.amount += 1;
        product.amount = existingItem.amount;
        addToCartButton.classList.toggle("hidden");
        showCart.classList.toggle("show");

        render(cartData);
      } else {
        if (isExist(cartData, product)) {
          cartData.push(product);
          addToCartButton.classList.toggle("hidden");
          showCart.classList.toggle("show");
        }
        cartQuantity.textContent = cartData.length;
      }
      saveData(cartData);
    });
    const existItem = cartData.find((item) => item.id === product.id);
    if (existItem) {
      addToCartButton.classList.toggle("hidden");
      showCart.classList.toggle("show");
    }
  }
});
function isExist(cartData, item) {
  let empty = true;
  for (const i of cartData) {
    if (i.id === item.id) {
      empty = false;
      break;
    }
  }
  if (empty === true) {
    alert("Thêm sản phẩm thành công");
    return true;
  }
}
