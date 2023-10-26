function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]')
const stopButton = document.querySelector('[data-stop]')

let intervalId = null;

function startColorSwitcher() {
    if (intervalId) {
        return;
    }
    startButton.disabled = true;
    stopButton.disabled = false;

    intervalId = setInterval(function () {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopColorSwitcher() {
    if (!intervalId) {
        return;
    }
    
    startButton.disabled = false;
    stopButton.disabled = true;
    

    intervalId = clearInterval(intervalId)
    intervalId = null;
    
    
}



startButton.addEventListener('click', startColorSwitcher);
stopButton.addEventListener('click', stopColorSwitcher);

