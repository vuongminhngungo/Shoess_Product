export const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
export const cartQuantity = document.querySelector(".cart-logo .cart-ammount");
export const cartPrice = document.querySelector(".cart .cart-price");
export const woocommerPrice = document.querySelector(
  ".total-products .row .total-value"
);
const infoProducts = document.querySelector(
  ".information-products .infomation-content"
);
// =========================================================
export function render(cartData) {
  if (infoProducts) {
    const content = cartData
      .map((item, index) => {
        let itemSum = convertNumber(item.price) * item.amount;
        let itemPrice = convertNumber(item.price);
        return `
        <tr class="item">
          <td class="product-name">
          <img  src="${item.image}" alt="" class="product-img">
            <p>${item.name}</p>
          </td>
          <td class="product-price">
            <p>${itemPrice.toLocaleString()}</p>
          </td>
          <td class="product-quantity">
            <input
              type="number" name="quantity"  min="1" max="100" value="${
                item.amount
              }"
            />
          </td>
          <td class="product-sum">
            <p>${itemSum.toLocaleString()}</p>
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
export function saveData(cartData) {
  localStorage.setItem("cartData", JSON.stringify(cartData));
}
function deleteProduct(cartData) {
  if (infoProducts) {
    infoProducts.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".product-delete");
      const nameItem = infoProducts.querySelector(".product-name p");
      const btnId = parseInt(e.target.id);
      if (deleteBtn) {
        const confirmMessage = confirm(
          `Bạn có muốn xóa sản phẩm: ${nameItem.textContent}`
        );
        if (confirmMessage) {
          cartData.splice(btnId, 1);
          render(cartData);
          updatePrice(cartData);
          saveData(cartData);
        } else {
          return;
        }
      }
    });
  }
}
function updatePrice(cartData) {
  let sumProductList = 0;
  cartData.forEach((item, index) => {
    sumProductList += convertNumber(item.price);
  });
  if (woocommerPrice) {
    woocommerPrice.textContent = sumProductList.toLocaleString();
  }
  if (cartPrice) {
    cartPrice.textContent = sumProductList.toLocaleString();
  }
}
function updateBtn(cartData) {
  const updateBtn = document.querySelector(".updateProduct");
  if (updateBtn) {
    updateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const quantityInput = document.querySelectorAll(
        ".product-quantity input"
      );
      let sumProductList = 0;
      cartData.forEach((item, index) => {
        let newAmount = parseInt(quantityInput[index].value);
        quantityInput[index].value = newAmount;
        item.amount = newAmount;
        sumProductList += convertNumber(item.price) * item.amount;
        woocommerPrice.textContent = sumProductList.toLocaleString();
        cartPrice.textContent = sumProductList.toLocaleString();
      });
      render(cartData);
      saveData(cartData);
    });
  }
}
function convertNumber(number) {
  return (number = Number(number.replaceAll(",", "")));
}
render(cartData);
deleteProduct(cartData);
updatePrice(cartData);
updateBtn(cartData);
cartQuantity.textContent = cartData.length;
