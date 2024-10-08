import items from "./items.js";

const addBtn = document.querySelectorAll(".add-btn");
const itemCount = document.querySelector("#itemCount");
const checkoutItemDiv = document.querySelector("#checkoutItems");
document.addEventListener("click", (event) => {
    // the event.target is what element the user clicks on
    // checks if what the user clicked has the delete-btn class.
    if (event.target.classList.contains("delete-btn")) {
        const itemIndex = event.target.dataset.index;
        deleteItem(itemIndex);
    }
});
const subTotalNum = document.querySelector("#subTotalNum");
const taxNum = document.querySelector("#taxNum");
const totalNum = document.querySelector("#totalNum");
const orderBtn = document.querySelector("#orderBtn");
const tax = 0.05;
let taxAmount = 0;
let total = 0;

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
    // checks if bagItems from local storage is not an array
    if (!Array.isArray(bagItems)) {
        // makes it an array
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
const loadItems = () => {
    if (localStorage.getItem("itemNum") >= 1) {
        let bagItems = JSON.parse(localStorage.getItem("bagItems"));
        checkoutItemDiv.innerHTML = "";
        let subTotal = 0;
        bagItems.forEach((item, index) => {
            checkoutItemDiv.innerHTML += `<div class="item" id="` + index + `">
                                            <div class="name">
                                                <i class='bx bx-trash-alt delete-btn' data-index="` + index + `"></i>
                                                <p>` + item.name + `</p>
                                            </div>
                                            <p>$` + item.price + `</p>
                                        </div>`;
            subTotal += item.price;
            subTotalNum.innerHTML = "$" + subTotal.toFixed(2);
        });
        taxAmount = subTotal * tax;
        taxNum.innerHTML = "$" + taxAmount.toFixed(2);
        total = subTotal + taxAmount;
        totalNum.innerHTML = "$" + total.toFixed(2);
    } else {
        checkoutItemDiv.innerHTML = `<h3>No items in bag</h3><p><a href="./menu.html">Click here</a> to view our menu</p>`;
        subTotalNum.innerHTML = "$0";
        taxNum.innerHTML = "$0";
        totalNum.innerHTML = "$0";
    }
}
const deleteItem = (index) => {
    let bagItems = JSON.parse(localStorage.getItem("bagItems"));
    bagItems.splice(index, 1);
    console.log(bagItems);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    let itemNum = JSON.parse(localStorage.getItem("itemNum"));
    itemNum--;
    localStorage.setItem("itemNum", itemNum);
    loadItems();
    updateItemAmount();
}
const clearItems = (index) => {
    let bagItems = JSON.parse(localStorage.getItem("bagItems"));
    bagItems = [];
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    let itemNum = JSON.parse(localStorage.getItem("itemNum"));
    itemNum = 0;
    localStorage.setItem("itemNum", itemNum);
}

window.addEventListener("load", loadItems);
window.addEventListener("load", () => {(localStorage.getItem("itemNum")) ? updateItemAmount() : initialization()});
addBtn.forEach(btn => {
    const itemName = btn.dataset.item;
    btn.addEventListener("click", () => addItem(itemName));
});
orderBtn.addEventListener("click", clearItems)