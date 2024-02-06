const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { gameOfThronesEpisodes } = require("./data/gameOfThronesData.js");

/** 
 @typedef {import('./data/episodeType').Episode} Episode
*/

//You can delete this once you see the episodes have loaded ok.
summariseEpisodesToConsole(gameOfThronesEpisodes);

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

//route to get to the database - need to make reference to the gameOfThroneData.js
app.get("/tvshows", (req, res) => {
    console.log("req.query", req.query);
    const searchTerm = req.query.searchTerm;
    console.log("Search Term", searchTerm);
    res.render("pages/tvshows", {
        gameOfThronesEpisodes: gameOfThronesEpisodes,
    });
});

//each episode page
app.get("/tvshows/:episodeId", (req, res) => {
    const episodeId = req.params.episodeId;
    const episode = gameOfThronesEpisodes.find(function (ep) {
        return String(ep.id) === episodeId;
    });
    res.render("pages/episode", { episode });
});

function summariseEpisodesToConsole(episodes) {
    console.log(`Loaded ${episodes.length} episodes`);
    console.log("The first episode has name of " + episodes[0].name);
}

// Search bar
function filterArrayBySearchTerm(array, searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return array.filter((element) =>
        element.toLowerCase().includes(lowerCaseSearchTerm),
    );
}

app.get("/tvshows/:searchTerm", async (req, res) => {
    const searchTerm = req.params.searchTerm;
    const filteredResult = await filterArrayBySearchTerm(
        gameOfThronesEpisodes,
        searchTerm,
    );
    res.send(filteredResult);
});

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

/**
 * You can delete this function.  It demonstrates the use of the Episode type in JSDoc.
 * @param {Episode[]} episodes
 * @returns void
 */

// use the environment variable PORT, or 3000 as a fallback if it is undefined
const PORT_NUMBER = process.env.PORT ?? 3000;

//start the server listening indefinitely
app.listen(PORT_NUMBER, () => {
    console.log(
        `Your express app started listening on ${PORT_NUMBER} at ${new Date()}`,
    );
});
