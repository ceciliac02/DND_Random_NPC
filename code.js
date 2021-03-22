{
    const api = 'https://www.dnd5eapi.co/api/races';
    const raceHTML = document.getElementById("race");
    const heightHTML = document.getElementById("height");
    const genderHTML = document.getElementById("gender");
    const skinHTML = document.getElementById("skinColor");
    const hairHTML = document.getElementById("hair");
    const traitOne = document.getElementById("trait1");
    const traitTwo = document.getElementById("trait2");
    const traitThree = document.getElementById("trait3");
    const attitudeHTML = document.getElementById("attitude");
    const professionHTML = document.getElementById("profession");
    const button = document.getElementById("random");

    window.addEventListener('load', function () {
        displayLabels();
        randomizeNpc();
    })

    class NPC {
        constructor(race, height, gender, hair, skinColor, adjective, quirk, hobby, attitude, profession) {
            this.race = race;
            this.height = height;
            this.gender = gender;
            this.hair = hair;
            this.skinColor = skinColor;
            this.adjective = adjective;
            this.quirk = quirk;
            this.hobby = hobby;
            this.attitude = attitude;
            this.profession = profession;
        }
    }

    function randomizeNpc() {
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
            const hair = hairModifier(hairHeight, hairColor);
            //Sets the skin color
            const skinColor = skinColorModifier(race);
            //Sets the first trait of the NPC
            const adjective = adjectives();
            //Sets the NPC's quirk
            const quirk = quirks();
            //Sets the NPC's hobby
            const hobby = hobbies();
            //Sets the attitude toward the PC
            const attitude = attitudeTowardsPC();
            //Sets their profession
            const npcProfession = profession();
            //Sets the attributes for the new random NPC instance
            let randomNPC = new NPC(race, height, gender, hair, skinColor, adjective, quirk, hobby, attitude, npcProfession);
            displayLabels();
            displayNPC(randomNPC);
        })
    }

    //Gives labels to all the traits
    function displayLabels () {
        const div = document.createElement("DIV");
        const labels = ["Race", "Height", "Gender", "Skin/Scales", "Hair", "Trait", "Quirk", "Hobby", "Attitude Toward PC", "Profession"];
        const HTMLs = [raceHTML, heightHTML, genderHTML, skinHTML,  hairHTML, traitOne, traitTwo, traitThree, attitudeHTML, professionHTML];
        for (let i = 0; i < labels.length; i++) {
            let label = "<div>" + labels[i] + "</div>";
            console.log(HTMLs[i]);
            HTMLs[i].innerHTML = label;
        }
    }

    //Takes the NPC class attributes and displays them
    function displayNPC (npc) {
        raceHTML.innerHTML += npc.race;
        heightHTML.innerHTML += npc.height;
        genderHTML.innerHTML += npc.gender;
        hairHTML.innerHTML += npc.hair;
        traitOne.innerHTML += npc.adjective;
        traitTwo.innerHTML += npc.quirk;
        traitThree.innerHTML += npc.hobby;
        attitudeHTML.innerHTML += npc.attitude;
        professionHTML.innerHTML += npc.profession;
        if (npc.race === "Dragonborn") {
            skinHTML.innerHTML += npc.skinColor + " scales"; 
        }
        else {
            skinHTML.innerHTML += npc.skinColor + " skin tone";
        }
    }

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

    //Adds the two hair attributes together
    function hairModifier (height, color) {
        if (height === null) {
            return "none!";
        }
        else {
            return height + " " + color + " hair";
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

    //Randomizes an adjective
    function adjectives () {
        const traits = ["brave", "cowardly", "snippy", "humble", "impatient", "patient", "nosey", "easygoing", "uptight", "funny", "serious", "aggressive", "arrogant", "cheerful", "grumpy", "artistic", "logical", "thick-headed", "daft", "boastful", "bright", "cunning", "calm", "suspicious", "cautious", "charming", "confident", "clever", "considerate", "cool", "cooperative", "wise", "cultured", "stubborn", "deranged", "dignified", "devoted", "eccentric", "emotional", "energetic", "friendly", "gentle", "meek", "modest", "quiet", "rational", "sensitive", "thoughtful", "philosophical","chatty", "level-headed", "perceptive", "dense", "diabolical","innocent", "corrupt", "offensive", "spiteful", "hateful", "wicked", "vain"];

        const index = Math.floor(Math.random() * traits.length);
        return traits[index];
    }

    //Randomizes a quirk
    function quirks () {
        const quirk = ["stutters", "has a lisp", "scarred", "blind", "deaf", "wears glasses", "fidgets", "has piercings", "sick", "talks loudly", "talks quietly", "foul breath", "sweats when lying", "breathes heavily", "talks slowly", "talks quickly", "breaks into song", "carries around a stuffed animal", "always sits facing the north", "clears their throat frequently", "laughs loudly", "sniffs frequently", "paces when in thought", "talks to themselves", "carries around snacks", "handles things delicately", "missing a limb", "carries around books", "sneezes when nervous", "germophobe", "hears voices", "has an invisible friend", "talks to plants", "talk to animals", "always seen drinking tea", "obsessed with symmetry", "narcoleptic", "always seen drinking alcohol", "carries around a sketchbook", "bites lips", "mute", "wears their heart on a sleeve", "lazy eye", "bites their nails", "walks around barefoot", "limps", "mumbles", "very punctual", "vegetarian/vegan", "yawns a lot", "picks their nose", "high pitched voice", "low-pitched voice", "nasally voice", "raspy voice", "sonorous voice", "melodic voice", "snorts when laughing", "squints a lot", "talks with their hands", "laughs at their own jokes", "cleans incessantly", "has a catchphrase", "doesn't like eye contact", "likes to talk about their deity", "is bad at keeping secrets", "cracks their knucles frequently"];
        const index = Math.floor(Math.random() * quirk.length);
        if (quirk[index] === "scarred") {
            let details = ["on the right eye", "on the left eye", "on the right cheek", "on the left cheek", "on the neck", "along their back", "along their arms", "on their torso", "along their legs"];
            let completeQuirk;
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

    //Randomizes a hobby
    function hobbies () {
        const hobby = ["likes to read", "likes to draw", "makes jewelry", "journals", "collects trinkets", "plays dragonchess", "studies history", "likes to bake", "likes to cook", "refurnishes old furniture", "likes windowshopping", "plays an instrument", "writes poetry", "likes to play sports", "writes jokes", "loves barfights", "creates experiments", "beekeeps", "likes to tattoo", "creates clothing", "loves to tinker", "likes to decorate", "likes to hike", "likes to swim", "woodcarves", "likes to play card games", "likes to knit", "teaches kids", "likes to gamble", "streetfights", "goes hunting", "likes to flirt", "practices magic", "likes stonecarving", "rides horses", "likes fortune telling", "likes to storytell","makes dolls", "studies the stars", "loves exercising", "loves dancing", "rock climbs", "loves to clean", "reads to children", "meditates", "likes to gossip"];
        const randomNumber = Math.floor(Math.random() * hobby.length);
        return hobby[randomNumber];
    }

    //Randomizes an attitude
    function attitudeTowardsPC () {
        const attitudes = ["hostile", "neutral", "warm", "friendly", "lustful", "scared", "nervous", "shy", "cold", "cynical", "playful", "apathetic", "sweet", "disgusted", "patronzing", "appreciative", "boastful", "awestruck"];
        const randomNumber = Math.floor(Math.random() * attitudes.length);
        return attitudes[randomNumber];
    }

    //Randomizes a profession
    function profession () {
        const professions = ["animal handler", "beekeeper", "farmer", "falconer", "fisher", "forager", "hunter", "horse trainer", "miller", "ranger", "shepherd", "stablehand", "trapper", "woodcutter", "zookeeper", "architect", "acrobat", "carpenter", "stonemason", "actor", "chef", "dancer", "glasspainter", "minstrel", "musician", "painter", "playwright", "poet", "sculptor", "singer", "tattooist", "banker", "brothel owner", "shopkeep", "collector", "guild master", "innkeeper", "peddler", "tradesman", "courier", "herald", "linguist", "messenger", "town crier", "translator", "armorer", "blacksmith", "bookbinder", "bowyer", "brewer", "candlemaker", "cartwright", "engraver", "fletcher", "furniture artisan", "glassmaker", "goldsmith", "hatter", "jeweler", "leatherworker", "locksmith", "tailor", "taxidermist", "tinker", "toymaker", "woodcarver", "assassin", "bandit", "burglar", "cutpurse", "crime boss", "kidnapper", "loan shark", "outlaw", "pirate", "poacher", "smuggler", "thief", "apprentice", "archaeologist", "archivist", "astrologer", "botanist", "cartographer", "chemist", "historian", "librarian", "mathematician", "professor", "scholar", "theologian", "aristocrat", "courtier", "diplomat", "duke/duchess", "baron/baroness", "diplomat", "emperor/empress", "judge", "king/queen", "knight", "noble", "orator", "prince/princess", "steward", "squire", "tax collector", "ward", "alchemist", "apothecary", "doctor", "healer", "midwife", "mortician", "nurse", "surgeon", "veterinarian", "baker", "barkeep", "barmaid", "butcher", "cook", "distiller", "florist", "gardener", "gravedigger", "housemaid", "laborer", "maid/butler", "miner", "sex-worker", "slave", "tavern worker", "vermin catcher", "mage", "necromancer" , "sage", "oracle", "witch", "bodyguard", "bailiff", "captain", "city watch", "investigator", "executioner", "guard", "mercenary", "sentinel", "scout", "soldier", "spy", "tactician", "warden", "acolyte", "archbishop", "bishop", "clergy", "cultist", "cult leader", "priest", "pope", "inqusitor", "missionary", "monk", "prophet", "boatman", "caravaneer", "ferrymen", "sailor", "sea captain", "shipwright", "adventurer", "beggar", "bounty hunter", "deserter", "disgraced noble", "elder", "exile", "traveler", "gambler", "hermit", "housewife/househusband", "pilgrim", "refugee", "urchin", "squatter"];
        const randomNumber = Math.floor(Math.random() * professions.length);
        return professions[randomNumber];
    }

    button.addEventListener('click', function () {

        randomizeNpc();
    });
}