let countdownTimer;
let countdownValue = 5;
let unlockStatus = localStorage.getItem("unlockStatus") || "locked"; // Verifica se o botão já foi desbloqueado
let countdownSavedValue = localStorage.getItem("countdownValue") || countdownValue;

window.onload = function() {
    if (unlockStatus === "unlocked") {
        unlockButton();
    } else {
        document.getElementById("downloadButton").disabled = true;
        document.getElementById("downloadButton").classList.add("locked");
        document.getElementById("downloadButton").classList.remove("unlocked");
    }

    startCountdown();
}

function startUnlock() {
    // Inicia a contagem ao clicar no link do anúncio
    document.getElementById("unlockButton").disabled = true;
    localStorage.setItem("unlockStatus", "inProgress");
    startCountdown();
}

function startCountdown() {
    if (localStorage.getItem("unlockStatus") === "inProgress") {
        // Se a contagem ainda estiver em progresso, continua de onde parou
        document.getElementById("countdown").innerHTML = `Desbloqueando... ${countdownSavedValue} segundos restantes.`;
        
        countdownTimer = setInterval(function() {
            countdownSavedValue--;
            document.getElementById("countdown").innerHTML = `Desbloqueando... ${countdownSavedValue} segundos restantes.`;
            localStorage.setItem("countdownValue", countdownSavedValue); // Salva o valor da contagem

            if (countdownSavedValue <= 0) {
                clearInterval(countdownTimer);
                unlockButton();
            }
        }, 1000);
    }
}

function unlockButton() {
    const button = document.getElementById("downloadButton");
    button.disabled = false;
    button.classList.remove("locked");
    button.classList.add("unlocked");
    button.innerHTML = "✅ Desbloqueado ✅";
    localStorage.setItem("unlockStatus", "unlocked"); // Marca como desbloqueado
}