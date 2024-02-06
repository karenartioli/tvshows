const { gameOfThronesEpisodes } = require("./data/gameOfThronesData");

app.get("/tvshows", (req, res) => {
    console.log("req.query", req.query);
    const searchTerm = req.query.searchTerm;
    console.log("Search Term", searchTerm);
    res.render("pages/tvshows", {
        gameOfThronesEpisodes: gameOfThronesEpisodes,
    });
});

// We want to achieve: as a result, an array of objects containing all keys for every episode that has the specific search term in either the name OR summary.

// create an empty array - filteredArray[]
// for loop - loop through every element of the original array (gameOfThronesEpisodes) which are objects containing all info about episodes
// check if the name or the summary contains the search term
// if yes - push the object for this episode to the filteredArray
// if no - carry on with the next iteration, don't do anything
// when all elements (objects) were checked, then finish the loop and return the result.

let filteredArray = [];
for (let i = 0; i < gameOfThronesEpisodes.length; i++) {
    if (
        gameOfThronesEpisodes.summary.includes(searchTerm) ||
        gameOfThronesEpisodes.name.includes(searchTerm)
    ) {
        filteredArray.push(gameOfThronesEpisodes[i]);
    }
    return filteredArray;
}
