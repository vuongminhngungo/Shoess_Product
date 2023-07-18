import { productData } from "./data.js";
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category"); // nếu url có ?category=man category-man

const productList = document.querySelector(".product-list");
const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
const infoProducts = document.querySelector(
  ".information-products .infomation-content"
);
const cartQuantity = document.querySelector(".cart-logo .cart-ammount");
const cartPrice = document.querySelector(".cart .cart-price");
const woocommerPrice = document.querySelector(
  ".total-products .row .total-value"
);
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

    //name
    productNameLink.appendChild(productName);
    // content
    itemContent.appendChild(productNameLink);
    itemContent.appendChild(productPrice);
    itemContent.appendChild(addToCartButton);

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
        render(cartData);
      } else {
        isEmpty(cartData, product);
        cartQuantity.textContent = cartData.length;
      }
      saveData(cartData);
    });
  }
});
render(cartData);
deleteProduct(cartData);
updatePrice(cartData);
cartQuantity.textContent = cartData.length;

const updateBtn = document.querySelector(".updateProduct");
if (updateBtn) {
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const quantityInput = document.querySelectorAll(".product-quantity input");
    let sumProductList = 0;
    cartData.forEach((item, index) => {
      let newAmount = parseInt(quantityInput[index].value);
      quantityInput[index].value = newAmount;
      item.amount = newAmount;
      sumProductList += convertNumber(item.price) * item.amount;
      woocommerPrice.textContent = sumProductList;
      cartPrice.textContent = sumProductList;
    });

    render(cartData);
    saveData(cartData);
  });
}
function render(cartData) {
  if (infoProducts) {
    const content = cartData
      .map((item, index) => {
        return `
      <tr class="item">
        <td class="product-name">
        <img  src="${item.image}" alt="" class="product-img">
          <p>${item.name}</p>
        </td>
        <td class="product-price">
          <p>${convertNumber(item.price)}</p>
        </td>
        <td class="product-quantity">
          <input
            type="number" name="quantity"  min="1" max="100" value="${
              item.amount
            }"
          />
        </td>
        <td class="product-sum">
          <p>${convertNumber(item.price) * item.amount}</p>
        </td>
        <td >
          <button id=${index} class="product-delete">Hủy</button>
        </td>
      </tr> `;
      })
      .join("");
    infoProducts.innerHTML = content;
    cartQuantity.textContent = cartData.length;
  }
}
function deleteProduct(cartData) {
  if (infoProducts) {
    infoProducts.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".product-delete");
      const btnId = parseInt(e.target.id);
      if (deleteBtn) {
        cartData.splice(btnId, 1);
        render(cartData);
        updatePrice(cartData);
        saveData(cartData);
      }
    });
  }
}
function saveData(cartData) {
  localStorage.setItem("cartData", JSON.stringify(cartData));
}
function isEmpty(cartData, item) {
  let empty = true;
  for (const i of cartData) {
    if (i.id === item.id) {
      empty = false;
      break;
    }
  }
  if (empty === true) {
    alert("Thêm sản phẩm thành công");
    cartData.push(item);
  }
}
function convertNumber(number) {
  return (number = Number(number.replaceAll(",", "")));
}
function updatePrice(cartData) {
  let sumProductList = 0;
  cartData.forEach((item, index) => {
    sumProductList += convertNumber(item.price);
  });
  if (woocommerPrice) {
    woocommerPrice.textContent = sumProductList;
  }
  if (cartPrice) {
    cartPrice.textContent = sumProductList;
  }
}
