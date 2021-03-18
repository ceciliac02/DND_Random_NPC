{
    const api = 'https://www.dnd5eapi.co/api/races';
    const race = document.getElementById("race");
    const lorem = document.getElementById("lorem");

    const selectedNumber = randomNumber();

    fetch (api) 
        .then (response => {
            return response.json();
        })
        .then (data => {
            const results = data.results;
            displayRace(results[selectedNumber].name);
            console.log(infoModifier(results[selectedNumber].index));
            console.log(results[selectedNumber].index);
        })

        fetch (api)

        function randomNumber () {
            const selectedNumber = Math.floor(Math.random() * 8);
            return selectedNumber;
        }

        function displayRace (name) {
            race.innerText = name;
        }

        function infoModifier (race) {
            let heightFeet;
            let heightInches = Math.floor(Math.random() * 10) + 1;
            let height;
            if (race === "dwarf") {
                heightFeet = Math.floor(Math.random() * 4) + 1;
                if (heightFeet < 3) {
                    heightFeet = 3;
                }
            }
            if (race === "gnome" || race === "halfling") {
                heightFeet = Math.floor(Math.random() * 3) + 1;
                if (heightFeet < 2) {
                    heightFeet = 2;
                }
            }
            if (race === "half-orc") {
                heightFeet = Math.floor(Math.random() * 5) + 1;
                if (heightFeet < 4) {
                    heightFeet = 4;
                }
            }
            height = heightFeet + "'" + heightInches + "\"";
            return height;
        }
        


}