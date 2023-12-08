class Cellule {
    constructor() {
        this.element = document.createElement("div")
        this.element.className = "cell"
        this.element.x = 0
        this.element.y = 0
        this.element.bomb = false
        this.element.flag = false
    }
}


// chrono
let startTime
let interval
let running = false
let elapsedTime = 0

function start() {
    document.getElementById('chrono').textContent = '00:00'
    if (!running) {
        startTime = new Date().getTime() - elapsedTime
        interval = setInterval(updateTimer, 50)
        running = true
    }
}

function updateTimer() {
    const currentTime = new Date().getTime()
    elapsedTime = currentTime - startTime

    const minutes = Math.floor(elapsedTime / 60000)
    const seconds = Math.floor((elapsedTime % 60000) / 1000)

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    document.getElementById('chrono').textContent = formattedTime
}

function reset() {
    clearInterval(interval);
    document.getElementById('chrono').textContent = '00:00'
    document.getElementById('startButton').disabled = false
    document.getElementById('stopButton').disabled = true
    document.getElementById('resetButton').disabled = true
    running = false;
    elapsedTime = 0;
}



function createGrid() {

    var difficulty = document.getElementById("difficulty").value

    var gridContainer = document.getElementById("grid-container")

    gridContainer.innerHTML = ""

    var gridSize

    switch (difficulty) {
        case "beginner":
            gridSize = 9
            break
        case "intermediate":
            gridSize = 16
            break
        case "expert":
            gridSize = 22
            break
        case "master":
            gridSize = 30
            break
        default:
            gridSize = 9 
    }


    // Créer la grille
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var cellule = new Cellule()

            cellule.element.classList.add("cell-size-" + gridSize);



            gridContainer.appendChild(cellule.element)
        }
    }
}

function newGame() {
    createGrid()
    start()
}