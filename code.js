{
    const api = 'https://www.dnd5eapi.co/api/equipment';

    fetch (api) 
        .then (response => {
            return response.json();
        })
        .then (data => {
            const results = data.results;
            return results
        })

        

}