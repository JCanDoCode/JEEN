import items from "./items.js";

const addBtn = document.querySelectorAll(".add-btn");
const itemCount = document.querySelector("#itemCount");

const initialization = () => {
    localStorage.setItem("itemNum", 0);
    updateItemAmount();
}
const updateItemAmount = () => {
    itemCount.innerHTML = localStorage.getItem("itemNum");
}
const addItem = (item) => {
    // adds the selected item:
    let bagItems = localStorage.getItem("bagItems") ? JSON.parse(localStorage.getItem("bagItems")) : [];
    if (!Array.isArray(bagItems)) {
        bagItems = [];
    }
    bagItems.push(items[item]);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    // adds to the item count:
    let itemNum = JSON.parse(localStorage.getItem("itemNum"));
    itemNum++;
    localStorage.setItem("itemNum", itemNum);
    updateItemAmount();
}

window.addEventListener("load", () => {(localStorage.getItem("itemNum")) ? updateItemAmount() : initialization()});
addBtn.forEach(btn => {
    const itemName = btn.dataset.item;
    btn.addEventListener("click", () => {addItem(itemName)});
});