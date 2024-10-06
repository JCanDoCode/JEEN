import items from "./items.js";

const addBtn = document.querySelectorAll(".add-btn");
const itemCount = document.querySelector("#itemCount");
const checkoutItemDiv = document.querySelector("#checkoutItems");
const deleteBtn = document.querySelectorAll(".delete-btn");

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
    if (localStorage.getItem("bagItems")) {
        let bagItems = JSON.parse(localStorage.getItem("bagItems"));
        bagItems.forEach(item => {
            checkoutItemDiv.innerHTML += `<div class="item">
                                            <div class="name">
                                                <i class='bx bx-trash-alt delete-btn'></i>
                                                <p>` + item.name + `</p>
                                            </div>
                                            <p>` + item.price + `</p>
                                        </div>`;
        });
    } else {
        checkoutItemDiv.innerHTML = `<h3>No items in bag</h3><p><a href="./menu.html">Click here</a> to view our menu</p>`
    }
}

window.addEventListener("load", loadItems)
window.addEventListener("load", () => {(localStorage.getItem("itemNum")) ? updateItemAmount() : initialization()});
addBtn.forEach(btn => {
    const itemName = btn.dataset.item;
    btn.addEventListener("click", () => {addItem(itemName)});
});