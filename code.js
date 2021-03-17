{
    const api = 'https://www.dnd5eapi.co/api/equipment';

    fetch (api) 
        .then (response => {
            return response.json();
        })
        .then (data => {
            const results = data.results;
            const selectedNumber = randomNumber();
            console.log(results[selectedNumber]);
        })

        function randomNumber () {
            const selectedNumber = Math.floor(Math.random() * 231);
            return selectedNumber;
        }

        randomNumber();


}