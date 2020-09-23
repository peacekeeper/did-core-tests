const request = require("supertest");

const { app } = require("did-core-test-server");

const allTests = require("./test-all.json");
const allTestResults = require("./test-all-results.json");

let api;

beforeAll(async () => {
  await app.ready();
  api = request(app.server);
});

afterAll(async () => {
  await app.close();
});

it("did key should pass all tests", async () => {
  const response = await api
    .post("/test")
    .set("Accept", "application/json")
    .send(allTests);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(allTestResults);
});
