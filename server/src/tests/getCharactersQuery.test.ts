const { readFileSync } = require('fs');
import { parseSearchResult } from "../marvel_api/getCharactersQuery";

const JSON_MOCK_DATA = "./src/tests/mocks/rawBrowseResultMock.json";
const JSON_MOCK_PARSED = "./src/tests/mocks/browseResultMockParsed.json";

describe("Parse the data received from the Marvel api to get a list of characters", () => {
    const mockData = JSON.parse(readFileSync(JSON_MOCK_DATA, 'utf-8'));
    const mockParsed = JSON.parse(readFileSync(JSON_MOCK_PARSED, 'utf-8'));

    test('A normal response', () => {
        expect(parseSearchResult(mockData)).toEqual(mockParsed);
    });
});