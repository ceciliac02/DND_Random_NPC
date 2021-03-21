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
            //Sets the height
            const height = heightModifier(race);
            //Sets the gender
            const gender = genderModifier();
            //Sets the hair
            const hairHeight = hairHeightModifier(race);
            const hairColor = hairColorModifier(race);
            const hair = hairHeight + " " + hairColor + " hair";
            //Sets the skin color
            const skinColor = skinColorModifier(race);
            //Sets the first trait of the NPC
            const traitOne = adjectives();
            //
            const traitTwo = quirks();
            //Sets the attributes for the new random NPC instance
            let randomNPC = new NPC(race, height, gender, hair, skinColor, traitOne, traitTwo);
            console.log(randomNPC);
            console.log(raceIndex);
        })

        //Randomizes a number based on the number of races available
        const randomRace = racesCount => {
            return Math.floor(Math.random() * (racesCount));
        }

        //Randomizes a height based on the race
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
            else if (race === "Elf" || race === "Human" || race === "Half-Elf" || race === "Tiefling") {
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

        //Randomizes a gender
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

        //Randomizes a hair length
        function hairHeightModifier (race) {
            if (race === "Dragonborn") {
                return null;
            }
            else {
                const randomNumber = Math.floor(Math.random() * 3);
                console.log(randomNumber);
                switch (randomNumber) {
                    case 0: 
                        return "short";
                        break;
                    case 1:
                        return "medium-length";
                        break;
                    case 2:
                        return "long";
                        break;
                }
            }
        }

        //Randomizes a hair color
        function hairColorModifier (race) {
            if (race === "Dragonborn") {
                return null;
            }
            else {
                let hairColors = ["auburn", "brown", "black", "red", "white", "gray", "blonde", "teal", "green", "purple", "lilac", "maroon", "silver", "navy", "pink"];
                const randomNumber = Math.floor(Math.random() * hairColors.length);
                return hairColors[randomNumber];
            }
        }

        //Randomizes a skin tone based on race
        function skinColorModifier (race) {
            let skinColor = ["light", "fair", "beige", "tan", "deep tan", "light-brown", "dark"];
            let randomNumber;
            if (race === "Dragonborn") {
                skinColor = ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"];
            }
            else if (race === "Elf" || race === "Half-Elf") {
                skinColor.push("copper");
                skinColor.push("bronze");
                skinColor.push("bluish-white");
            }
            else if (race === "Tiefling") {
                skinColor.push("dark red");
                skinColor.push("brick red");
                skinColor.push("purple");
            }
            else if (race === "Half-Orc") {
                skinColor = ["gray", "green"];
            }
            else if (race === "Gnome") {
                skinColor.push("gray");
            }
            randomNumber = Math.floor(Math.random() * skinColor.length);
            return skinColor[randomNumber];
        }

        function adjectives () {
            const traits = ["brave", "cowardly", "snippy", "humble", "impatient", "patient", "nosey", "easygoing", "uptight", "funny", "serious", "aggressive", "arrogant", "cheerful", "grumpy", "artistic", "logical", "thick-headed", "daft", "boastful", "bright", "cunning", "calm", "suspicious", "cautious", "charming", "confident", "clever", "considerate", "cool", "cooperative", "wise", "cultured", "stubborn", "deranged", "dignified", "devoted", "eccentric", "emotional", "energetic", "friendly", "gentle", "meek", "modest", "quiet", "rational", "sensitive", "thoughtful", "philosophical","chatty", "level-headed", "perceptive", "dense", "diabolical","innocent", "corrupt", "offensive", "spiteful", "hateful", "wicked", "vain"];

            const index = Math.floor(Math.random() * traits.length);
            return traits[index];
        }

        function quirks () {
            const quirk = ["stutters", "has a lisp", "scarred", "blind", "deaf", "wears glasses", "fidgets", "has piercings", "sick", "talks loudly", "talks quietly", "foul breath", "sweats when lying", "breathes heavily", "talks slowly", "talks quickly", "breaks into song", "carries around a stuffed animal", "always sits facing the north", "clears their throat frequently", "laughs loudly", "sniffs frequently", "paces when in thought", "talks to themselves", "carries around snacks", "handles things delicately", "missing a limb", "carries around books", "sneezes when nervous", "germophobe", "hears voices", "has an invisible friend", "talks to plants", "talk to animals", "always seen drinking tea", "obsessed with symmetry", "narcoleptic", "always seen drinking alcohol", "carries around a sketchbook", "bites lips", "mute", "wears their heart on a sleeve"];
            const index = Math.floor(Math.random() * quirk.length);
            if (quirk[index] === "scarred") {
                let completeQuirk;
                let details = ["on the right eye", "on the left eye", "on the right cheek", "on the left cheek", "on the neck", "along their back", "along their arms", "on their torso", "along their legs"];
                const detailsIndex = Math.floor(Math.random() * details.length);
                completeQuirk = quirk[index] + " " + details[detailsIndex];
                return completeQuirk;
            }
            else if (quirk[index] === "blind") {
                let details = ["on the left eye", "on the right eye", "on both eyes"];
                let completeQuirk;
                const detailsIndex = Math.floor(Math.random() * details.length);
                completeQuirk = quirk[index] + " " + details[detailsIndex];
                return completeQuirk;
            }
            else if (quirk[index] === "deaf") {
                let details = ["on the left ear", "on the right ear", "on both ears"];
                let completeQuirk;
                const detailsIndex = Math.floor(Math.random() * details.length);
                completeQuirk = quirk[index] + " " + details[detailsIndex];
                return completeQuirk;
            }
            else if (quirk[index] === "missing a limb") {
                let details = ["left leg", "right leg", "left arm", "right arm", "both legs", "both arms"];
                let completeQuirk;
                const detailsIndex = Math.floor(Math.random() * details.length);
                completeQuirk = quirk[index] + ": " + details[detailsIndex];
                return completeQuirk;
            }
            const quirkIndex = Math.floor(Math.random() * quirk.length);
            return quirk[quirkIndex];
        }
}