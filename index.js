import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://playground-139c4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButton.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);

    clearInputFiledEl();



})
onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        clearShoppingList();


        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemId = currentItem[0];
            let currentItemValues = currentItem[1];
            appendItemToShoppingListEl(currentItem);
        }
    } else {
        shoppingListEl.innerHTML = "No item her.... Yet";
    }



})
function clearShoppingList() {
    shoppingListEl.innerHTML = "";
}
function clearInputFiledEl() {
    inputFieldEl.value = "";
}
function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li> ${itemValue} </li>`;
    let itemId = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("click", function () {

        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`);

        remove(exactLocationOfItemInDB);
    })
    shoppingListEl.append(newEl);

}