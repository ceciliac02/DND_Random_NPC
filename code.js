{
    const api = 'https://www.dnd5eapi.co/api/races';
    const race = document.getElementById("race");
    const prop = document.querySelectorAll(".properties");
    const lorem = document.getElementById("lorem");

    //The number of the selected race converted to variable for easier use
    const selectedNumber = randomRace();

    //Gets api data
    fetch (api) 
        .then (response => {
            return response.json();
        })
        .then (data => {
            const results = data.results;
            //The index of the chosen race
            const index = results[selectedNumber].index;
            displayRace(results[selectedNumber].name);
            let height = heightModifier(index);
            displayHeight(height);       
        })

        //Rolls for a random number for the race index
        function randomRace () {
            const selectedNumber = Math.floor(Math.random() * 8);
            return selectedNumber;
        }

        //Replaces the list text to the selected race
        function displayRace (name) {
            race.innerText = name;
        }

        //Lists the height of the race
        function displayHeight (height) {
            const list = document.createElement("LI");
            const textNode = document.createTextNode(height);
            list.appendChild(textNode);
            prop[0].appendChild(list);
        }

        //Randomizes a height for the race
        function heightModifier (race) {
            let heightFeet;
            let heightInches = Math.floor(Math.random() * 10) + 1;
            let height;
            if (race === "dwarf") {
                heightFeet = Math.floor(Math.random() * 4) + 1;
                if (heightFeet < 4) {
                    heightFeet = 4;
                }
            }
            if (race === "gnome" || race === "halfling") {
                heightFeet = Math.floor(Math.random() * 3) + 1;
                if (heightFeet < 3) {
                    heightFeet = 3;
                }
            }
            if (race === "elf" || race === "human" || race === "half-elf") {
                heightFeet = Math.floor(Math.random() * 5) + 1;
                if (heightFeet < 5) {
                    heightFeet = 5;
                }
            }
            if (race === "half-orc" || race === "dragonborn") {
                heightFeet = Math.floor(Math.random() * 6) + 1;
                if (heightFeet < 6) {
                    heightFeet = 6;
                }
            }
            height = heightFeet + "'" + heightInches + "\"";
            return height;
        }
        


}