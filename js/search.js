import { productData } from "./data.js";
const searchNode = document.querySelector(".search");
const searchProduct = document.querySelector(".search .search-input");
const listItem = document.createElement("div");
listItem.classList.add("list-Item");
searchNode.appendChild(listItem);

searchProduct.addEventListener("input", (e) => {
  const searchProductValue = e.target.value.toLowerCase();

  const searchData = [];

  for (const item of productData) {
    if (item.name.toLowerCase().includes(searchProductValue)) {
      searchData.push(item);
    }
  }
  //   4 sản phẩm đầu:
  const listSearchTop = searchData.splice(0, 4);
  listItem.innerHTML = ""; // làm trống dữ liệu trước đó
  renderItem(listSearchTop);
});
function renderItem(listSearchTop) {
  listSearchTop.forEach((product) => {
    const item = document.createElement("div");
    item.classList.add("item-search");
    const link = document.createElement("a");
    link.href = "#!";
    link.classList.add("item-link");
    const imageItem = document.createElement("img");
    imageItem.src = product.image;
    imageItem.alt = "";
    imageItem.classList.add("item-searchImg");
    const contentItem = document.createElement("div");
    contentItem.classList.add("item-content");
    const nameItem = document.createElement("h3");
    nameItem.textContent = product.name;
    nameItem.classList.add("item-name");
    const priceItem = document.createElement("p");
    priceItem.textContent = product.price;
    priceItem.classList.add("item-price");

    contentItem.appendChild(nameItem);
    contentItem.appendChild(priceItem);

    link.appendChild(imageItem);
    link.appendChild(contentItem);

    item.appendChild(link);
    listItem.appendChild(item);
  });
}

searchProduct.addEventListener("blur", (e) => {
  listItem.classList.add("hidden");
});
searchProduct.addEventListener("focus", (e) => {
  listItem.classList.remove("hidden");
});
