import Location from "./src/modules/location.js";


let LocationArray = []
let locationId = '47' // 47 = start
let allowedDirections = []
const input = document.getElementById('input')


input.addEventListener("keypress", function (event) {
    let directionTransitionText = "You are going "
    if (event.key === "Enter") {
        let playerInput = input.value
        if (allowedDirections.includes(playerInput)) {
            input.disabled = true
            let locationIdSplit = locationId.split('')

            if (playerInput == "N" || playerInput == "North" || playerInput == "n" || playerInput == "north") {
                locationIdSplit[0]--
                locationIdSplit[0] = locationIdSplit[0].toString()
                locationId = locationIdSplit.join('')
                directionTransitionText += "north..."
                LocationArray.find((element) => {
                    if (element.id == locationId) {
                        // console.log(element);
                        updateGame(element, directionTransitionText)
                    }
                });
            } else if (playerInput == "S" || playerInput == "South" || playerInput == "s" || playerInput == "south") {
                locationIdSplit[0]++
                locationIdSplit[0] = locationIdSplit[0].toString()
                locationId = locationIdSplit.join('')
                directionTransitionText += "south..."
                LocationArray.find((element) => {
                    if (element.id == locationId) {
                        // console.log(element);
                        updateGame(element, directionTransitionText)
                    }
                });
            } else if (playerInput == "E" || playerInput == "East" || playerInput == "e" || playerInput == "east") {
                locationIdSplit[1]++
                locationIdSplit[1] = locationIdSplit[1].toString()
                locationId = locationIdSplit.join('')
                directionTransitionText += "east..."
                LocationArray.find((element) => {
                    if (element.id == locationId) {
                        // console.log(element);
                        updateGame(element, directionTransitionText)
                    }
                });
            } else if (playerInput == "W" || playerInput == "West" || playerInput == "w" || playerInput == "west") {
                locationIdSplit[1]--
                locationIdSplit[1] = locationIdSplit[1].toString()
                locationId = locationIdSplit.join('')
                directionTransitionText += "west..."
                LocationArray.find((element) => {
                    if (element.id == locationId) {
                        // console.log(element);
                        updateGame(element, directionTransitionText)
                    }
                });
            }
            input.value = ""
        } else {
            input.value = ""
            document.getElementById('gameInputText').innerText = "You can't go that way"
        }

    }
})

function updateGame(element, directionTransitionText) {
    document.getElementById('gameInputText').innerText = directionTransitionText
    setTimeout(() => {
        allowedDirections = []
        let textToGo = 'You can go '
        document.getElementById('imgGameShow').src = `./src/img/${element.imgSrc}`
        document.getElementById('imgGameShow').style.backgroundColor = element.bgColor
        document.getElementById('gameInfoText').innerHTML = element.text
        if (element.directions.includes('N')) {
            document.getElementById('northBlock').style.display = 'none'
            textToGo += 'N '
            allowedDirections.push('N', 'n', 'North', 'north')
        } else {
            document.getElementById('northBlock').style.display = 'block'
        }

        if (element.directions.includes('S')) {
            document.getElementById('southBlock').style.display = 'none'
            textToGo += 'S '
            allowedDirections.push('S', 's', 'South', 'south')
        } else {
            document.getElementById('southBlock').style.display = 'block'
        }

        if (element.directions.includes('W')) {
            document.getElementById('westBlock').style.display = 'none'
            textToGo += 'W '
            allowedDirections.push('W', 'w', 'West', 'west')
        } else {
            document.getElementById('westBlock').style.display = 'block'
        }

        if (element.directions.includes('E')) {
            document.getElementById('eastBlock').style.display = 'none'
            textToGo += 'E '
            allowedDirections.push('E', 'e', 'East', 'east')
        } else {
            document.getElementById('eastBlock').style.display = 'block'
        }

        document.getElementById('gameDirectionText').innerText = textToGo
        input.disabled = false
        input.focus()
        document.getElementById('gameInputText').innerText = "What now?"
    }, 500)
}

fetch("./src/data/data.json")
    .then(response => response.json())
    .then(json => {
        for (let i = 0; i < json.map.length; i++) {
            let locat = new Location(json.map[i].id, json.map[i].text, json.map[i].imgSrc, json.map[i].bgColor, json.map[i].directions)
            LocationArray.push(locat)
        }
        console.log(LocationArray);
        LocationArray.find((element) => {
            if (element.id == locationId) {
                // console.log(element);
                updateGame(element)
            }
        });
    });