// obliczanie wartości łącznych do kategorii, 
import { TRANSACTIONS } from "./modal.js";

const CURRDATE = new Date();
const CURRMONTH = CURRDATE.getMonth() + 1;


export function calculateTotalIncomeAndExpense(){
    //get current amount or start with 0
    let income = Number(document.querySelector("#total-income").textContent.substring(1)) || 0; 
    let expense = Number(document.querySelector("#total-expense").textContent.substring(1)) || 0;
    TRANSACTIONS.forEach(entry => {
        const entryMonth = Number(entry.date.split("-")[1]);
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
    console.log("returning totals:", [income.toFixed(2), expense.toFixed(2)])
    return [income.toFixed(2), expense.toFixed(2)];
}



export function calculatePerCategory(){
    let categoryTotals = {
        house: 0,
        groceries: 0,
        shopping: 0,
        savings: 0,
        entertainment: 0,
        health: 0,
        transport: 0,
        random: 0
    };
    //using for loop beacause forEach dosen't allow to skip over "income" catrgory
    for (let i = 0; i < TRANSACTIONS.length; i++) {
        let entry = TRANSACTIONS[i];
        if (entry.category === "income") continue;
        categoryTotals[entry.category] += Number(entry.amount);
    }
    console.log("calculated category totals: ", categoryTotals);
    return categoryTotals;
}