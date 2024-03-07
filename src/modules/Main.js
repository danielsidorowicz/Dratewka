import Location from "./location.js";

const gameExport = function () {
    let LocationArray = []
    let locationId = '47' // 47 = start
    let allowedDirections = []
    let allowedDirectionsAll = [
        "N", "North", "n", "north",
        "S", "South", "s", "south",
        "W", "West", "w", "west",
        "E", "East", "e", "east"
    ]
    let gameItems = []
    let locationItems = []
    let carriedItem = []
    let dependencies = []
    let okCounter = 0

    let dragonKilled = false
    let checkIfSheepMade = false

    let showGame = true
    let showGossip = false
    let showVocabulary = false


    const input = document.getElementById('input')

    function pressAnyKey() {
        document.getElementById("gameStuff").style.display = 'flex'
        showGame = true
        document.getElementById("vocabulary").style.display = 'none'
        showVocabulary = false
        document.getElementById("gossip").style.display = 'none'
        showGossip = false
        document.body.removeEventListener("keydown", pressAnyKey)
        input.value = ""
        input.focus()
    }

    function finishGame() {
        document.getElementById("game").style.display = "none"
        document.getElementById("imageStart").src = "./src/img/ending.png"
        document.getElementById("h1Start").style.display = "block"
        document.getElementById("h1Start").innerText = "Wygrałeś"
        document.getElementById("startingImages").style.display = "flex"
        setTimeout(() => {
            location.reload()
        }, 10000)
    }

    input.addEventListener("keypress", function (event) {

        let directionTransitionText = "You are going "
        if (event.key === "Enter") {
            let playerInput = input.value

            let playerInputSplit = playerInput.split(" ")

            if (allowedDirectionsAll.includes(playerInput)) {
                if (allowedDirections.includes(playerInput)) {
                    input.disabled = true
                    let locationIdSplit = locationId.split('')

                    if (playerInput == "N" || playerInput == "NORTH") {
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
                    } else if (playerInput == "S" || playerInput == "SOUTH") {
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
                    } else if (playerInput == "E" || playerInput == "EAST") {
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
                    } else if (playerInput == "W" || playerInput == "WEST") {
                        let checkLocationIdSplit0 = locationIdSplit[0]
                        let checkLocationIdSplit1 = locationIdSplit[1] - 1
                        let checkLocationId = `${checkLocationIdSplit0}${checkLocationIdSplit1}`
                        console.log(checkLocationId, dragonKilled);
                        if (checkLocationId == 42) {
                            if (dragonKilled) {
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
                            } else {
                                LocationArray.find((element) => {
                                    if (element.id == locationId) {
                                        directionTransitionText = ["You can't go that way...", "The dragon sleeps in a cave!"]
                                        updateGame(element, directionTransitionText)
                                    }
                                });
                            }

                        } else {
                            // console.log(locationId);
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
                    }
                } else {
                    document.getElementById('gameInputText').innerText = "You can't go that way"
                }
                input.value = ""
            } else if (playerInput == "V" || playerInput == "Vocabulary" || playerInput == "v" || playerInput == "vocabulary") {
                document.getElementById("gameStuff").style.display = 'none'
                showGame = false
                document.getElementById("vocabulary").style.display = 'flex'
                showVocabulary = true
                document.getElementById("gossip").style.display = 'none'
                showGossip = false
                document.body.addEventListener("keydown", pressAnyKey)
            } else if (playerInput == "G" || playerInput == "Gossip" || playerInput == "g" || playerInput == "gossip") {
                document.getElementById("gameStuff").style.display = 'none'
                showGame = false
                document.getElementById("vocabulary").style.display = 'none'
                showVocabulary = false
                document.getElementById("gossip").style.display = 'flex'
                showGossip = true
                document.body.addEventListener("keydown", pressAnyKey)
            } else if (playerInputSplit[0] == "TAKE" || playerInputSplit[0] == "T" || playerInputSplit[0] == "take" || playerInputSplit[0] == "t") {
                let wantedItem = playerInputSplit[1]
                if (locationItems.length != 0) {
                    locationItems.find((item, idx) => {
                        try {
                            if (item.itemName == wantedItem) {
                                if (carriedItem.length == 0) {
                                    gameItems.find((element) => {
                                        if (element.itemName == wantedItem) {
                                            if (element.usageFlag == 1) {
                                                let takingTransitionText = `You are taking ${element.displayText}`
                                                carriedItem.push(element)
                                                locationItems.splice(idx, 1)
                                                LocationArray.find((element) => {
                                                    if (element.id == locationId) {
                                                        updateGame(element, takingTransitionText)
                                                    }
                                                });
                                            } else {
                                                document.getElementById('gameInputText').innerText = "You can't carry it"
                                            }
                                        }
                                    });

                                } else {
                                    document.getElementById('gameInputText').innerText = "You are carrying something"
                                }
                            } else {
                                document.getElementById('gameInputText').innerText = "There isn't anything like that here"
                            }
                        } catch (error) {

                        }

                    })
                } else {
                    document.getElementById('gameInputText').innerText = "There isn't anything like that here"
                }

                input.value = ""
            } else if (playerInputSplit[0] == "DROP" || playerInputSplit[0] == "D" || playerInputSplit[0] == "drop" || playerInputSplit[0] == "d") {
                let wantedItem = playerInputSplit[1]
                if (carriedItem[0]) {
                    if (carriedItem[0].itemName == wantedItem) {
                        let usageItems = 0
                        for (let i = 0; i < locationItems.length; i++) {
                            if (locationItems[i].usageFlag == 1) {
                                usageItems++
                            }
                        }
                        if (usageItems < 3) {
                            locationItems.push(carriedItem[0])
                            let droppingTransitionText = `You are about to drop ${carriedItem[0].displayText}`
                            carriedItem = []
                            LocationArray.find((element) => {
                                if (element.id == locationId) {
                                    updateGame(element, droppingTransitionText)
                                }
                            });
                        } else {
                            document.getElementById('gameInputText').innerText = "You can't store any more here"
                        }
                    } else {
                        document.getElementById('gameInputText').innerText = "You are not carrying it"
                    }
                } else {
                    document.getElementById('gameInputText').innerText = "You are not carrying anything"
                }

                input.value = ""
            } else if (playerInputSplit[0] == "USE" || playerInputSplit[0] == "U" || playerInputSplit[0] == "use" || playerInputSplit[0] == "u") {
                if (carriedItem[0]) {
                    if (playerInputSplit[1]) {
                        let wantedItem = playerInputSplit[1]
                        if (carriedItem[0].itemName == wantedItem) {
                            gameItems.find((element) => {
                                if (element.itemName == wantedItem) {
                                    if (element.id == 36) {
                                        finishGame()
                                    } else {
                                        dependencies.find((depends) => {
                                            if (depends.itemID == element.id) {
                                                if (depends.locationID == locationId) {
                                                    gameItems.find((give) => {
                                                        if (give.id == depends.resultID) {
                                                            carriedItem = []
                                                            if (depends.staysAtLocation == 0) {
                                                                carriedItem.push(give)
                                                            } else {
                                                                locationItems.push(give)
                                                            }

                                                            if (depends.important == "OK") {
                                                                okCounter++
                                                            }
                                                            let usingTransitionText = depends.message
                                                            LocationArray.find((element) => {
                                                                if (element.id == locationId) {
                                                                    if (depends.itemID == 37) {
                                                                        // console.log(element);
                                                                        element.imgSrc = "deadDragon.bmp"
                                                                        dragonKilled = true
                                                                    }
                                                                    updateGame(element, usingTransitionText)
                                                                }
                                                            });
                                                        }
                                                    })
                                                } else {
                                                    document.getElementById('gameInputText').innerText = "Nothing happened"
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        } else {
                            document.getElementById('gameInputText').innerText = "You aren't carrying anything like that"
                        }
                    } else {
                        document.getElementById('gameInputText').innerText = "You aren't carrying anything like that"
                    }
                } else {
                    document.getElementById('gameInputText').innerText = "You aren't carrying anything"
                }
                input.value = ""
            } else {
                input.value = ""
                document.getElementById('gameInputText').innerText = "Try another word or V for vocabulary"
            }

        }

    })

    let counter = 0

    function displayTextArray(Text, element) {
        if (counter == 0) {
            document.getElementById('gameInputText').innerText = Text[counter]
            counter++;
            displayTextArray(Text, element)
        } else {
            setTimeout(function () {
                document.getElementById('gameInputText').innerText = Text[counter]
                counter++;

                if (counter < Text.length) {
                    displayTextArray(Text, element)
                }

                if (counter == Text.length) {
                    updateGameSpecifics(element)
                }
            }, 1500)
        }
    }

    function updateGameSpecifics(element) {
        setTimeout(() => {
            if (carriedItem.length == 0) {
                document.getElementById("gameCarryText").innerText = `You are carrying nothing`
            } else {
                document.getElementById("gameCarryText").innerText = `You are carrying ${carriedItem[0].displayText}`
            }

            locationItems = element.items
            if (locationItems.length != 0) {
                let showTextString = "You see "
                for (let i = 0; i < locationItems.length; i++) {
                    showTextString += locationItems[i].displayText
                    if (i != locationItems.length - 1) {
                        showTextString += ", "
                    }
                }
                document.getElementById('gameObjectsText').innerText = showTextString
            } else {
                document.getElementById('gameObjectsText').innerText = "You see nothing"
            }


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
        }, 1000)
    }

    function updateGame(element, TransitionText) {
        let useItems = []
        input.value = ""
        // console.log(checkIfSheepMade, okCounter);
        if (okCounter == 6 && !checkIfSheepMade) {
            checkIfSheepMade = true
            gameItems.find((item) => {
                if (item.id == 37) {
                    let howmany = element.items.length
                    for (let i = 0; i < howmany; i++) {
                        if (element.items[i].usageFlag == 1) {
                            useItems.push(element.items[i])
                        }
                    }
                    element.items = []
                    for (let i = 0; i < useItems.length; i++) {
                        element.items.push(useItems[i])
                    }
                    carriedItem = []
                    carriedItem.push(item)
                    // console.log(locationItems);
                    dependencies.find((sheep) => {
                        if (sheep.resultID == 37) {
                            let sheepTransitionText = sheep.message
                            LocationArray.find((element) => {
                                if (element.id == locationId) {
                                    updateGame(element, sheepTransitionText)
                                }
                            });
                        }
                    })

                }
            })

        } else {
            if (Array.isArray(TransitionText)) {
                counter = 0
                displayTextArray(TransitionText, element)
            } else {
                document.getElementById('gameInputText').innerText = TransitionText
                updateGameSpecifics(element)
            }
        }
    }

    fetch("./src/data/data.json")
        .then(response => response.json())
        .then(json => {
            gameItems = json.items
            dependencies = json.dependencies
            // console.log(dependencies)
            for (let i = 0; i < json.map.length; i++) {
                let locat = new Location(json.map[i].id, json.map[i].text, json.map[i].imgSrc, json.map[i].bgColor, json.map[i].directions, json.map[i].items)
                LocationArray.push(locat)
            }
            // console.log(LocationArray);
            LocationArray.find((element) => {
                if (element.id == locationId) {
                    // console.log(element);
                    updateGame(element)
                }
            });
        });

    let startPlayed = false
    let imageTimeout

    document.getElementById("startingImages").addEventListener("click", () => {
        if (!startPlayed) {
            let audio = new Audio('./src/audio/hejnal_8bit.mp3');
            audio.volume = 0.5
            audio.play()
            startPlayed = true


            document.getElementById("h1Start").style.display = "none"
            document.getElementById("imageStart").src = "./src/img/opis_A.jpg"

            imageTimeout = async () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        document.getElementById("imageStart").src = "./src/img/opis_B.jpg"
                        resolve("finished")
                    }, 10000);
                })
            }
            let check = async () => {
                let info = await imageTimeout()
                setTimeout(() => {
                    document.getElementById("startingImages").style.display = "none"
                    document.getElementById("game").style.display = "flex"
                }, 10000); //10000
            }
            check()
        }
    })
}

export { gameExport }