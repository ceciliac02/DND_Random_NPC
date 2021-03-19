{
    const api = 'https://www.dnd5eapi.co/api/races';
    const prop = document.querySelectorAll(".properties");
    const lorem = document.getElementById("lorem");

    

    class NPC {
        constructor(race, height, gender, hair, skinColor, trait1, trait2, trait3, profession) {
            this.race = race;
            this.height = height;
            this.gender = gender;
            this.hair = hair;
            this.skinColor = skinColor;
            this.trait1 = trait1;
            this.trait2 = trait2;
            this.trait3 = trait3;
            this.profession = profession;
        }
    }

    fetch (api)
        .then (response => {
            return response.json();
        })
        .then (data => {
            const results = data.results;
            //Grabs a race index from the api through a random number
            const raceIndex = randomRace(results.length);
            const race = results[raceIndex].name;
            //
            const height = heightModifier(race);
            //
            const gender = genderModifier();
            //Sets the attributes for the new random NPC instance
            let randomNPC = new NPC(race, height, gender);
            console.log(randomNPC);
            console.log(heightModifier("Human"));
        })

        //Randomizes a number based on the number of races available
        const randomRace = racesCount => {
            return Math.floor(Math.random() * (racesCount + 1));
        }

        function heightModifier (race) {
            let heightFeet;
            let heightInches = Math.floor(Math.random() * 10) + 1;
            let height;
            if (race === "Dwarf") {
                heightFeet = Math.floor(Math.random() * 4) + 1;
                if (heightFeet < 4) {
                    heightFeet = 4;
                }
            }
            else if (race === "Gnome" || race === "Halfling") {
                heightFeet = Math.floor(Math.random() * 3) + 1;
                if (heightFeet < 3) {
                    heightFeet = 3;
                }
            }
            else if (race === "Elf" || race === "Human" || race === "Half-Elf") {
                heightFeet = Math.floor(Math.random() * 5) + 1;
                if (heightFeet < 5) {
                    heightFeet = 5;
                }
            }
            else if(race === "Half-Orc" || race === "Dragonborn") {
                heightFeet = Math.floor(Math.random() * 6) + 1;
                if (heightFeet < 6) {
                    heightFeet = 6;
                }
            }
            height = heightFeet + "'" + heightInches + "\"";
            return height;
        }

        function genderModifier () {
            let gender;
            const number = Math.floor(Math.random() * 500) + 1;
            if (number < 200) {
                gender = "female";
            }
            else if (number > 200 && number < 400) {
                gender = "male";
            }
            else if (number > 400 && number < 450) {
                gender = "non-binary";
            }
            else {
                gender = "genderfluid";
            }
            return gender;
        }


    /*//Gets api data
    fetch (api) 
        .then (response => {
            return response.json();
        })
        .then (data => {
            const results = data.results;
            //The number of the selected race converted to variable for easier use
            const selectedNumber = randomRace();
            //The index of the chosen race
            const index = results[selectedNumber].index;
            const race = results[selectedNumber].name;
            const height = heightModifier(index);
            const gender = genderModifier();
            let randomNPC = new NPC(race, height, gender);
            console.log(randomNPC);
            displayRace(results[selectedNumber].name);
            displayHeight(height); 
            displayGender(gender);      
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
            else if (race === "gnome" || race === "halfling") {
                heightFeet = Math.floor(Math.random() * 3) + 1;
                if (heightFeet < 3) {
                    heightFeet = 3;
                }
            }
            else if (race === "elf" || race === "human" || race === "half-elf") {
                heightFeet = Math.floor(Math.random() * 5) + 1;
                if (heightFeet < 5) {
                    heightFeet = 5;
                }
            }
            else if(race === "half-orc" || race === "dragonborn") {
                heightFeet = Math.floor(Math.random() * 6) + 1;
                if (heightFeet < 6) {
                    heightFeet = 6;
                }
            }
            height = heightFeet + "'" + heightInches + "\"";
            return height;
        }

        //Lists the gender of the NPC
        function displayGender (gender) {
            const list = document.createElement("LI");
            const textNode = document.createTextNode(gender);
            list.appendChild(textNode);
            prop[0].appendChild(list);
        }

       //Modifies the gender of the NPC
        function genderModifier () {
            let gender;
            const number = Math.floor(Math.random() * 500) + 1;
            if (number < 200) {
                gender = "female";
            }
            else if (number > 200 && number < 400) {
                gender = "male";
            }
            else if (number > 400 && number < 450) {
                gender = "non-binary";
            }
            else {
                gender = "genderfluid";
            }
            return gender;
        }

        function hairModifier (race) {
            let hairLength;
            let hairColors = ["auburn", "brown", "black", "red", "white", "gray", "blonde", "teal", "green", "purple", "lilac", "maroon", "silver", "navy", "pink"];
            
            length: short, middle, long
            color: auburn, brown, black, red, white, gray, blonde, teal, 
            
        }
        
        */

}