import { transactionEntries } from "./modal.js";
const incomeTabButton = document.querySelector(".income-button");
const expensesTabButton = document.querySelector(".expense-button");
const allTabButton = document.querySelector(".all-button");

const tabButtons = [incomeTabButton, expensesTabButton, allTabButton];

//start with showing all transactions
let currentTab = "all";

// changind the display of tabs' buttons and change current tab
tabButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        tabButtons.forEach(button => {
            button.classList.remove("current");
        });
        currentTab = e.target.classList[0].split("-")[0];
        e.target.classList.add("current");
        filterTransactions()
    });
});

//display transaction based on current tab
function filterTransactions() {
    transactionEntries.forEach(entry => {
        if (entry === transactionEntries[0] || currentTab === "all" || entry.classList.contains(currentTab)) {
            entry.classList.remove("hidden");
        } else {
            entry.classList.add("hidden");

        }
    });
}

//at the start make sure all entries are shown
document.addEventListener("DOMContentLoaded", () => {
    filterTransactions();
})