import { Character } from "../types/Character";

const request = require("supertest");
import app from './../app';

describe("GET /superteam", () => {
    const mockCharacter: Character = {
        id: "-10",
        name: "Mock hero that doesn't exist",
        description: "He doesn't have a description",
        thumbnail: "test.jpg",
        inSuperteam: false
    }
    beforeAll(async () => {
        await request(app).post("/superteam/addOrRemoveCharacter").send(mockCharacter);
    })
    afterAll(async () => {
        await request(app).post("/superteam/addOrRemoveCharacter").send(mockCharacter);
    })
    it("should return 200", async () => {
        const response = await request(app).get("/superteam");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBeFalsy();
    });
    it("should return a list of characters", async () => {
        const response = await request(app).get("/superteam");
        expect(response.body.length >= 1).toBeTruthy();
    });
});