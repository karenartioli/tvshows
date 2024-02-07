/**
 * Returns a random d6 die roll from 1-6.
 * @returns {string}
 */
function episodeCode(Season, Episode) {
    let paddedSeason = Season.toString().padStart(2, "0");

    let paddedEpisode = Episode.toString().padStart(2, "0");

    let result = `S${paddedSeason}E${paddedEpisode}`;

    return result;
}

exports.episodeCode = episodeCode;
