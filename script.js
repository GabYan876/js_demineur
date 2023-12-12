class Cellule {
    constructor(x, y, hidden, bomb, flag, nbr) {
        this.element = document.createElement("div")
        this.element.className = "cell"
        this.x = x
        this.y = y
        this.hidden = hidden || true
        this.bomb = bomb || false
        this.flag = flag || false
        this.nbr = nbr
    }

    yo () {
        //if (this.flag) {
        //    this.element.innerHTML = '<img src="images/flag.png" alt="flag">'
        //}
        //else if (this.bomb) {
        //    this.element.innerHTML = '<img src="images/bomb.png" alt="bomb">'
        //}

        console.log("yo")
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
    running = false
    elapsedTime = 0
}


// grid
function createGrid() {

    // Initialisation
    let difficulty = document.getElementById("difficulty").value

    let gridContainer = document.getElementById("grid-container")

    gridContainer.innerHTML = ""

    let gridSize
    let nbr_bomb
    let cellulesArray = []

    switch (difficulty) {
        case "beginner":
            gridSize = 9
            nbr_bomb = 10
            max = 9
            break
        case "intermediate":
            gridSize = 16
            nbr_bomb = 40
            max = 16
            break
        case "expert":
            gridSize = 22
            nbr_bomb = 100
            max = 22
            break
        case "master":
            gridSize = 30
            nbr_bomb = 250
            max = 30
            break
    }


    // Créer la grille
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            
            let cellule = new Cellule(j+1, i+1)
            
            cellule.element.classList.add("cell-size-" + gridSize)
            gridContainer.appendChild(cellule.element)
            cellulesArray.push(cellule)

            cellule.element.innerHTML = '<img class="innerCell" onclick="leftClick()" src="images/normal.png" alt="normal">'
        }
    }

    // placement des bombes
    do {
        x = Math.floor(Math.random() * max) + 1
        y = Math.floor(Math.random() * max) + 1

        let cellule = cellulesArray.find((cellule) => cellule.x === x && cellule.y === y)

        if (cellule.x == x && cellule.y == y) {
            cellule.bomb = true
        }

        nbr_bomb--
    } while (nbr_bomb > 0)
}

// New Game
function newGame() {
    createGrid()
    reset()
    start()
}