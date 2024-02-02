const { episodeCode } = require("./episodecode");

test("episodeCode", () => {
        expect(episodeCode(1,2)).toBe("S01E02");
});

test("episodeCode", () => {
    expect(episodeCode(99,50)).toBe("S99E50");
});

test("episodeCode", () => {
    expect(episodeCode(1000,200)).toBe("S1000E200");
});
