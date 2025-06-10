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
    expect(response.body).toBeInstanceOf(Array); // Assuming choices is an array
  });

  it("GET /api/choice should return a computer choice", async () => {
    const response = await request(app).get("/api/choice");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id"); // Assuming computer choice has an `id`
  });

  it("POST /api/play should return round outcome", async () => {
    const payload = {
      player: 1, // Example player choice ID
      availableComputerChoices: [2, 3, 4], // Example computer choices
    };

    const response = await request(app).post("/api/play").send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result"); // Assuming round outcome has a `result`
  });
});
