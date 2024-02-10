const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { gameOfThronesEpisodes } = require("./data/breakingBadData.js");

/** 
 @typedef {import('./data/episodeType').Episode} Episode
*/

//configure the server's route handlers
app.get("/", (req, res) => {
    res.render("pages/index");
});

//page about KAsquared
app.get("/aboutus", (req, res) => {
    res.render("pages/aboutus");
});

//contacting KAsquared
app.get("/contactus", (req, res) => {
    res.render("pages/contactus");
});

//shows matching search term from the query part of the url
app.get("/tvshows", (req, res) => {
    const searchTerm = req.query.searchTerm;
    if (searchTerm === undefined) {
        //show all episodes to user
        res.render("pages/tvshows", {
            gameOfThronesEpisodes: gameOfThronesEpisodes,
        });
    } else {
        //show filtered episodes
        const filteredArray = filterArrayBySearchTerm(
            gameOfThronesEpisodes,
            searchTerm,
        );
        res.render("pages/tvshows", {
            gameOfThronesEpisodes: filteredArray,
        });
    }
});

function filterArrayBySearchTerm(array, searchTerm) {
    let filteredArray = [];
    for (let i = 0; i < array.length; i++) {
        if (
            array[i].summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            array[i].name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            filteredArray.push(array[i]);
        }
    }
    return filteredArray;
}

//each episode page
app.get("/tvshows/:episodeId", (req, res) => {
    const episodeId = req.params.episodeId;
    const episode = gameOfThronesEpisodes.find(function (ep) {
        return String(ep.id) === episodeId;
    });
    res.render("pages/episode", { episode });
});

// 404 page
app.get("/db-test", async (req, res) => {
    try {
        const dbResult = await query("select now()");
        const rows = dbResult.rows;
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(
            "Sorry, an error occurred on the server.  Ask the dev team to check the server logs at time " +
                new Date(),
        );
    }
});

// use the environment variable PORT, or 3000 as a fallback if it is undefined
const PORT_NUMBER = process.env.PORT ?? 3000;

//start the server listening indefinitely
app.listen(PORT_NUMBER, () => {
    console.log(
        `Your express app started listening on ${PORT_NUMBER} at ${new Date()}`,
    );
});
