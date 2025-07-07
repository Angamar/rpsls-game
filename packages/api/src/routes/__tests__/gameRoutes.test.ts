import request from "supertest";
import express from "express";
import gameRoutes from "../gameRoutes.js";

const app = express();
app.use(express.json());
app.use("/api", gameRoutes);

describe("Game Routes", () => {
  it("GET /api/choices should return choices", async () => {
    const response = await request(app).get("/api/choices");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /api/choice should return a computer choice", async () => {
    const response = await request(app).get("/api/choice");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("POST /api/play should return round outcome", async () => {
    const payload = {
      player: 1,
      availableComputerChoices: [2, 3, 4],
    };

    const response = await request(app).post("/api/play").send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
  });
});
