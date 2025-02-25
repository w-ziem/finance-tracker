import { addTransactionToList } from "./ui.js";

export let TRANSACTIONS = [];

document.querySelector(".new-button").addEventListener("click", () => {
    document.querySelector("body").classList.add("modal-active");
    document.querySelector("#new-entry").classList.remove("hidden");
});

document.querySelector(".discard-button").addEventListener("click", closeNewEntryModal);

 function closeNewEntryModal() {
    document.querySelector("#new-entry").classList.add("hidden");
    document.querySelector("body").classList.remove("modal-active");
}


let transactionEntries;

document.addEventListener("DOMContentLoaded", () => {
    transactionEntries = document.querySelectorAll(".node");

    transactionEntries.forEach(node => {
        const noteLink = node.querySelector(".notes");
        if(noteLink && noteLink.textContent.trim() !== ""){
            noteLink.addEventListener("click", (e) => showNoteModal);
        }
    });
});

const closeNoteButton = document.querySelector(".close-button");

export function showNoteModal(e){
    const note = document.querySelector("#show-note");
    const noteText = e.target.getAttribute("data-note");
    note.querySelector(".note-content").textContent = noteText; 
    document.querySelector("body").classList.add("modal-active");
    closeNoteButton.classList.remove("hidden");
    note.classList.remove("hidden");
}

function closeNoteModal(){
    document.querySelector("body").classList.remove("modal-active");
    closeNoteButton.classList.add("hidden");
    document.querySelector("#show-note").classList.add("hidden");
}

closeNoteButton.addEventListener("click", closeNoteModal);

function getTransactionEntries() {
    transactionEntries = document.querySelectorAll(".node");

    transactionEntries.forEach(node => {
        const noteLink = node.querySelector(".notes");
        if(noteLink && noteLink.textContent.trim() !== ""){
            noteLink.addEventListener("click", (e) => showNoteModal);
        }
    });
    return transactionEntries;
}

export { getTransactionEntries };



function createTransaction() {
    const nameInput = document.querySelector(".name-input");
    const amountInput = document.querySelector("#amount");
    const dateInput = document.querySelector("#date-input");
    const categoryInput = document.querySelector("#category-input");
    const noteInput = document.querySelector(".modal-note");
    
    const nameInputValue = nameInput.value.trim();
    const amountInputValue = Number(amountInput.value.replace("," , ".").trim());
    const dateInputValue = dateInput.value.trim();
    const categoryInputValue = categoryInput.value.trim();
    const noteInputValue = noteInput.value.trim();
    
    
    nameInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
    categoryInput.value = '';
    dateInput.value = '';
    noteInput.value = '';
    if (!nameInputValue || !amountInputValue || !dateInputValue || !categoryInputValue) {
        alert("Please fill in all required fields.");
        return;
    }

    const transaction = {
        name: nameInputValue,
        amount: amountInputValue,
        date: dateInputValue,
        category: categoryInputValue,
        notes: noteInputValue,
        calculated: false
    };

    TRANSACTIONS.push(transaction);
    addTransactionToList(transaction);
    closeNewEntryModal();
}


document.querySelector(".save-button").addEventListener("click", createTransaction);


