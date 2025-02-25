// obliczanie wartości łącznych do kategorii, 
import { TRANSACTIONS } from "./modal.js";

export function UpdateSummary(){
    //korzysta z funkcji obliczające łączne wydatki i przychodzy, wyświetla je na podsumowaniu
    // #total-income #total-expense #total-summary - selektory dla paragrafów wyświetlająch podsumowanie
    const [totalIncome, totalExpense] = calculateTotalIncomeAndExpense();
    const totalSummary = Math.round(totalIncome - totalExpense);
    const summaryParaContent = totalSummary >= 0 ? `+ ${totalSummary}` : `${totalSummary}`;
    document.querySelector("#total-income").textContent = totalIncome;
    document.querySelector("#total-expense").textContent = totalExpense;
    document.querySelector("#total-summary").textContent = summaryParaContent;
}

//nie powtarzać wartości
function calculateTotalIncomeAndExpense(){
    let income = Number(document.querySelector("#total-income").textContent) || 0;
    let expense = Number(document.querySelector("#total-expense").textContent) || 0;
    console.log([income, expense]);
    console.log(TRANSACTIONS)
    TRANSACTIONS.forEach(entry => {
        console.log(entry)
        if(entry.category === "income" && ! entry.caculated){
            income += Number(entry.amount);
            entry.caculated = true;
        } else if( ! entry.caculated ){
            expense += Number(entry.amount);
            entry.calculated = true;
        }
    });
    console.log([income, expense]);
    return [income, expense];
}

//TOTAL WYRZUCA NAN NAPRAWIC!!!