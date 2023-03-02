"use strict";
const { readFileSync } = require('fs');
const { parseSearchResult } = require("./../marvel_api/getCharactersQuery");
const JSON_MOCK_DATA = "./src/tests/mocks/rawBrowseResultMock.json";
const JSON_MOCK_PARSED = "./src/tests/mocks/browseResultMockParsed.json";
describe("Parse the data received from the Marvel api to get a list of characters", () => {
    const mockData = JSON.parse(readFileSync(JSON_MOCK_DATA));
    const mockParsed = JSON.parse(readFileSync(JSON_MOCK_PARSED));
    test('A normal response', () => {
        expect(parseSearchResult(mockData)).toEqual(mockParsed);
    });
    test('An empty response', () => {
        expect(parseSearchResult({})).toStrictEqual([]);
    });
    test('An invalid response', () => {
        expect(parseSearchResult({ "error": "invalid response" })).toStrictEqual([]);
    });
});
