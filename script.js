class Cellule {
    constructor(x, y, hidden, bomb, flag, nbr) {
        this.element = document.createElement("div")
        this.element.className = "cell"
        this.x = x
        this.y = y
        this.hidden = hidden || true
        this.bomb = bomb || false
        this.flag = flag || false
        this.nbr = nbr || 0
    }

    //affectation des chiffres
    hisNbr() {
        const adjacentCoordinates = [
            { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
            { dx: -1, dy: 0 },                     { dx: 1, dy: 0 },
            { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 }
        ]

        let nbrBomb = 0

        for (const { dx, dy } of adjacentCoordinates) {
            let xAdjacent = this.x + dx
            let yAdjacent = this.y + dy
            
            let adjacentCellule = cellulesArray.find(cellule => cellule.x === xAdjacent && cellule.y === yAdjacent)
    
            if (adjacentCellule && adjacentCellule.bomb === true) {
                nbrBomb ++
            }
        }

        this.nbr = nbrBomb
    }

    // click droit
    leftClickOnCell() {

        this.unhide()

        if (this.nbr === 0) {

            const adjacentCoordinates = [
                { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
                { dx: -1, dy: 0 },                     { dx: 1, dy: 0 },
                { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 }
            ]

            for (let i in adjacentCoordinates) {
                let xAdjacent = this.x + adjacentCoordinates[i].dx
                let yAdjacent = this.y + adjacentCoordinates[i].dy
                let adjacentCellule = cellulesArray.find(cellule => cellule.x === xAdjacent && cellule.y === yAdjacent)
    
                if (adjacentCellule && adjacentCellule.hidden === true && adjacentCellule.flag === false) {
                    adjacentCellule.unhide()
                
                    if (adjacentCellule.nbr === 0) {
                        adjacentCellule.leftClickOnCell()
                    }
                }
            }
        }
    }

    // révéler une cellule
    unhide() {
        this.hidden = false

        switch (this.nbr) {
            case 0:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/empty.png" alt="empty">'
                break
            case 1:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/1.png" alt="1">'
                break
            case 2:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/2.png" alt="2">'
                break
            case 3:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/3.png" alt="3">'
                break
            case 4:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/4.png" alt="4">'
                break
            case 5:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/5.png" alt="5">'
                break
            case 6:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/6.png" alt="6">'
                break
            case 7:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/7.png" alt="7">'
                break
            case 8:
                this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/8.png" alt="8">'
                break
        }

        if (this.bomb === true) {
            this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" src="images/bomb.png" alt="bomb">'
            if (isLoose === false) {
                loose()
            }
        }
    }

    // click droit
    putRemoveFlag() {
        if (this.flag === false) {
            this.flag = true
            this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" oncontextmenu="rightClick(event, this)" src="images/flag.png" alt="flag">'
        } else {
            this.flag = false
            this.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" oncontextmenu="rightClick(event, this)" src="images/normal.png" alt="normal">'
        }
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

function stop() {
    clearInterval(interval)
    running = false
}

let cellulesArray = []
let isLoose = false
let firstClick = true
let nbr_bomb = 0

// grid
function createGrid() {

    // Initialisation
    let difficulty = document.getElementById("difficulty").value

    let gridContainer = document.getElementById("grid-container")

    gridContainer.innerHTML = ""

    let gridSize
    nbr_bomb = 0
    cellulesArray = []
    isLoose = false
    firstClick = true

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

            cellule.element.innerHTML = '<img class="innerCell" onclick="leftClick(event)" oncontextmenu="rightClick(event, this)" src="images/normal.png" alt="normal">'

        }
    }
}

//click gauche
function leftClick(event) {

    let cellule = cellulesArray.find(cellule => cellule.element === event.target.parentElement)

    // affectation des bombes si premier click
    if (firstClick === true) {
        firstClick = false
        bombedGrid(event.target)

    }

    // revelation de la cellule
    if (cellule.flag === false && cellule.hidden === true) {
        cellule.leftClickOnCell()
    }

    // verification si Win
    let unhiddenCell = 0

    for (let i in cellulesArray) {

        if (cellulesArray[i].hidden === false ) {
            unhiddenCell ++
        }
    }
    if (unhiddenCell == (cellulesArray.length - nbr_bomb) && isLoose === false) {
        win()
    }
}

// click droit
function rightClick(event) {
    event.preventDefault()

    let cellule = cellulesArray.find(cellule => cellule.element === event.target.parentElement)

    if (cellule.hidden === true) {
        cellule.putRemoveFlag()
    }
}

// affectation des bombes et des chiffres
function bombedGrid(clickedCell) {

    // initialisation
    let celluleClicked = cellulesArray.find(cellule => cellule.element === clickedCell.parentElement);
    let adjacentArray = []
    let nbr_bombInRest = nbr_bomb
    const adjacentCoordinates = [
        { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
        { dx: -1, dy: 0 },                     { dx: 1, dy: 0 },
        { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 }
    ]

    // collecter les cellules adjacentes
    for (let i in adjacentCoordinates) {
        let xAdjacent = celluleClicked.x + adjacentCoordinates[i].dx
        let yAdjacent = celluleClicked.y + adjacentCoordinates[i].dy
        let adjacentCellule = cellulesArray.find(cellule => cellule.x === xAdjacent && cellule.y === yAdjacent)
        if (adjacentCellule) {
            adjacentArray.push(adjacentCellule)
        }
    }

    // placer les bombes
    while (nbr_bombInRest > 0) {
        let x = Math.floor(Math.random() * max) + 1
        let y = Math.floor(Math.random() * max) + 1

        let cellule = cellulesArray.find((cellule) => cellule.x === x && cellule.y === y)

        // Vérifier si la cellule est valide pour placer une bombe
        if (cellule && !adjacentArray.includes(cellule) && cellule !== celluleClicked && cellule.bomb === false) {
            cellule.bomb = true
            nbr_bombInRest--
        }
    }

    // affectation des chiffres
    for (let cellule of cellulesArray) {
        cellule.hisNbr();
    }
}


// perdu
function loose () {
    stop()

    isLoose = true

    document.getElementById('h1').textContent = 'Loose'

    for (let i in cellulesArray) {
        cellulesArray[i].unhide()
    }
}

// gagné
function win() {
    stop()
    document.getElementById('h1').textContent = 'Win'
}

// nouvelle partie
function newGame() {
    createGrid()
    reset()
    start()

    document.getElementById('h1').textContent = ''
}