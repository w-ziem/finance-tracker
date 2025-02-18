// open and close modals

document.querySelector(".new-button").addEventListener("click", () => {
    document.querySelector("body").classList.add("modal-active");
    document.querySelector("#new-entry").classList.remove("hidden");
});

document.querySelector(".discard-button").addEventListener("click", () => {
    document.querySelector("#new-entry").classList.add("hidden");
    document.querySelector("body").classList.remove("modal-active");
});


export const transactionEntries = document.querySelectorAll(".node");

transactionEntries.forEach(node => {
    const noteLink = node.querySelector(".notes");
    if(noteLink && noteLink.textContent.trim() !== ""){
        noteLink.addEventListener("click", showNoteModal);
    }
});


function showNoteModal(){
    document.querySelector("body").classList.add("modal-active");
    document.querySelector("#show-note").classList.remove("hidden");
}

function closeNoteModal(){
    document.querySelector("body").classList.remove("modal-active");
    document.querySelector("#show-note").classList.add("hidden");
}

document.querySelector(".close-button").addEventListener("click", closeNoteModal);
