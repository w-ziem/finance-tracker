import { getTransactionEntries } from "./modal.js";
import { showNoteModal } from "./modal.js";
import { calculateTotalIncomeAndExpense } from "./app.js";
import { calculatePerCategory } from "./app.js";

const incomeTabButton = document.querySelector(".income-button");
const expensesTabButton = document.querySelector(".expense-button");
const allTabButton = document.querySelector(".all-button");

const tabButtons = [incomeTabButton, expensesTabButton, allTabButton];

//start with showing all transactions
let currentTab = "all"; // [all, income, expense] - every entry should have that

// changind the display of tabs' buttons and change current tab
tabButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        tabButtons.forEach(button => {
            button.classList.remove("current");
        });
        currentTab = e.target.classList[0].split("-") [0];
        e.target.classList.add("current");
        filterTransactions()
    });
});



//display transaction based on current tab
function filterTransactions() {
    const transactionEntries = getTransactionEntries();
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
    updateSummary();
    updateCategories();
})




const categoryEmojis = {
    house: "🏠",
    groceries: "🧺",
    shopping: "🛒",
    savings: "🏦",
    entertainment: "🎞️",
    health: "🫀",
    transport: "🚕",
    income: "💰",
    random: "🎁",
    income: "⬇️"
};

export function addTransactionToList(transaction) {
    const transactionItem = document.createElement("li");
    const transactionList = document.querySelector(".transaction-list");
    transactionItem.classList.add("node", transaction.category);
    if(transaction.category !== "income") transactionItem.classList.add("expense");
    const transactionNameString = transaction.category === "income" ? `🟢${transaction.name}` : `🔴${transaction.name}`;
    const transactionCategoryString = `${categoryEmojis[transaction.category]}${transaction.category}`;
    transactionItem.innerHTML = `
        <p>${transaction.date}</p>
        <p>${transactionNameString}</p>
        <p>$${transaction.amount}</p>
        <p>${transactionCategoryString}</p>
        <p class="notes" data-note="${transaction.notes}">${transaction.notes ? "show notes" : ""}</p>
    `;
    transactionItem.querySelector(".notes").addEventListener("click", showNoteModal);
    transactionList.appendChild(transactionItem);
    filterTransactions();
    updateSummary();
    updateCategories();
}




export function updateSummary(){
    //korzysta z funkcji obliczające łączne wydatki i przychodzy, wyświetla je na podsumowaniu
    // #total-income #total-expense #total-summary - selektory dla paragrafów wyświetlająch podsumowanie
    const [totalIncome, totalExpense] = calculateTotalIncomeAndExpense();
    const totalSummary = (totalIncome - totalExpense).toFixed(2);
    const summaryParaContent = totalSummary >= 0 ? `+ $${totalSummary}` : `$${totalSummary}`;
    document.querySelector("#total-income").textContent = `$${totalIncome}`;
    document.querySelector("#total-expense").textContent = `$${totalExpense}`;
    document.querySelector("#total-summary").textContent = summaryParaContent;
}


export function updateCategories(){
    const totals = calculatePerCategory();
    const [_, totalExpense] = calculateTotalIncomeAndExpense();
    Object.keys(totals).forEach(categoryKey => {
        const amountElem = document.querySelector(`#${categoryKey}-amount`);
        const percentageElem = document.querySelector(`#${categoryKey}-percentage`);


        const amountPara = `$${(totals[categoryKey]).toFixed(2)}`;
        //calculate percentage
        const percentage = totalExpense > 0 ? ((totals[categoryKey] / Number(totalExpense)) * 100).toFixed(2) : 0;
        const percentagePara = `${percentage}%`;
        console.log(totalExpense, percentage)

        amountElem.textContent = amountPara;
        percentageElem.textContent = percentagePara;
    });
}