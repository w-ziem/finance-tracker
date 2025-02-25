// obliczanie wartości łącznych do kategorii, 
import { TRANSACTIONS } from "./modal.js";


const CURRDATE = new Date();
const CURRMONTH = CURRDATE.getMonth() + 1;
console.log("read current month", CURRMONTH)


export function calculateTotalIncomeAndExpense(){
    //get current amount or start with 0
    let income = Number(document.querySelector("#total-income").textContent.substring(1)) || 0; 
    let expense = Number(document.querySelector("#total-expense").textContent.substring(1)) || 0;
    console.log([income, expense]);
    TRANSACTIONS.forEach(entry => {
        console.log("current read entry when calculating total income and expense: ", entry);
        const entryMonth = Number(entry.date.split("-")[1]);
        console.log("currently reading transaction month: ", entryMonth);
        if(entryMonth === CURRMONTH){
            if(entry.category === "income" && ! entry.caculated){
                income += Number(entry.amount);
                entry.caculated = true; //ensure same transaction is only calculated once
            } else if( ! entry.caculated ){
                expense += Number(entry.amount);
                entry.calculated = true; //ensure same transaction is only calculated once
            }
        }
    });
    console.log("calculateTotalIncomeAndExpense returns: ", [income, expense]);
    return [income.toFixed(2), expense.toFixed(2)];
}


let categoryTotal = {
    house: 0,
    groceries: 0,
    shopping: 0,
    savings: 0,
    entertainment: 0,
    health: 0,
    transport: 0,
    income: 0,
    random: 0
};




// function calculatePerCategory(){
//      ...
// }