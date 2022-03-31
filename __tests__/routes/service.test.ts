import server from "../../src/server";
const request = require("supertest");

afterEach((done) => {
  server.close();
  done();
});

describe('routes/service', () => {
  it('should accept json file', async () => {
    const jsonFile = '[{"user": "user1", "amount": 100},{"user": "user2", "amount": 200}]';
    const response = await request(server)
    .post("/service")
    .send({
      "jsonFile": jsonFile,
    });
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual({
      "status": "success",
      "message": "Successfully processed",
      "data": JSON.parse(jsonFile),
    });
  });

  //should return 400 if json file is invalid
  it('should return 400 if json file is invalid', async () => {
    const jsonFile = '["user1", 100,{"user": "user2", "amount": 200}]';
    const response = await request(server)
    .post("/service")
    .send({
      "jsonFile": jsonFile
    });
    expect(response.status).toEqual(400);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual({
      "status": "failed",
      "message": "Invalid JSON file",
      "data": JSON.parse(jsonFile),
    });
  });
});