import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { app } from "../../app";
import appDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUser } from "../../interface/user.interface";
import {
  loginMock,
  loginWithoutEmailMock,
  loginWithoutPasswordMock,
  loginWrongEmailMock,
  loginWrongPasswordMock,
} from "../../mocks/login.mock";
import {userPasswordHashMock } from "../../mocks/user.mock";

let connection: DataSource;
let userRepository: Repository<iUser>;

describe("Tests Login Routes", () => {
  beforeAll(async () => {
    await appDataSource
      .initialize()
      .then((res) => {
        connection = res;
        userRepository = res.getRepository(User);
      })
      .catch((err) => {
        console.log(err);
      });

    const createUser = userRepository.create(userPasswordHashMock);
    await userRepository.save(createUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST - /api/login -> Shouldn't be able to logged with wrong email ", async () => {
    const result = await request(app)
      .post("/api/login")
      .send(loginWrongEmailMock);

    expect(result.status).toBe(401);
    expect(result.body).toBe("Email or Password invaid");
  });

  it("POST - /api/login -> Shouldn't be able to logged with wrong password", async () => {
    const result = await request(app)
      .post("/api/login")
      .send(loginWrongPasswordMock);

    expect(result.status).toBe(401);
  });

  it("POST - /api/login -> Shouldn't be able to logged without email", async () => {
    const result = await request(app)
      .post("/api/login")
      .send(loginWithoutEmailMock);

    expect(result.status).toBe(400);
  });

  it("POST - /api/login -> Shouldn't be able to logged without password", async () => {
    const result = await request(app)
      .post("/api/login")
      .send(loginWithoutPasswordMock);

    expect(result.status).toBe(400);
  });

  it("POST - /api/login -> Should be able to logged", async () => {
    const result = await request(app).post("/api/login").send(loginMock);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");

  });
});
