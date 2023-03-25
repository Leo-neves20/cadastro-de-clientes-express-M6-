import { beforeEach } from "node:test";
import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { app } from "../../app";
import appDataSource from "../../data-source";
import { iUser } from "../../interface/user.interface";
import User from "../../entities/user.entity";
import { hashSync } from "bcrypt";
import { userMock } from "../../mocks/user.mock";
import {
  loginMock,
  loginWithoutEmailMock,
  loginWithoutPasswordMock,
  loginWrongEmailMock,
  loginWrongPasswordMock,
} from "../../mocks/login.mock";

const loginUser2Mock = {
  email: "alex@mail.com",
  password: "1234",
};

const userWithoutPasswordMock = {
  name: "leonardo",
  email: "leo@mail.com",
  phone_number: "(21) 98888-7654",
};

const userWithoutNameMock = {
  email: "leo@mail.com",
  password: "1234",
  phone_number: "(21) 98888-7654",
};

const userWithoutPhoneNumberMock = {
  name: "leonardo",
  email: "leo@mail.com",
  password: "1234",
};

const userWithoutEmailMock = {
  name: "leonardo",
  password: "1234",
  phone_number: "(21) 98888-7654",
};

const contactMock = {
  name: "alex",
  email: "alex22@mail.com",
  phone_number: "2199999-8888",
};

const contactWithoutNameMock = {
  email: "alex22@mail.com",
  phone_number: "2199999-8888",
};

const contactWithoutEmailMock = {
  name: "alex",
  phone_number: "2199999-8888",
};

const contactWithoutPhoneNumber = {
  name: "alex",
  email: "alex22@mail.com",
};

const updateEmailExistsMock = {
  email: "leo@mail.com",
};

const updateMock = {
  name: "alex sander",
};

let connection: DataSource;
let userRepository: Repository<iUser>;

let userCreated = null;
let users = [];

//================================================== Users Routes =====================================================//

describe("Tests User Routes -> Shouldn't be able to create a user with a email have already registred by other user", () => {
  beforeAll(async () => {
    await appDataSource
      .initialize()
      .then(async (res) => {
        connection = res;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
    users.pop();
  });

  it("POST - /api/user/register -> Should be able create a user", async () => {
    const result = await request(app).post("/api/user/register").send(userMock);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("email");
    expect(result.body).not.toHaveProperty("password");
    expect(result.body).toHaveProperty("created_at");

    users.push(result.body);

  });

  it("POST - /api/user/register -> Shouldn't be able to create a user with a email have already registred by other user",
  async () => {

      const result = await request(app).post("/api/user/register").send(userMock)

      expect(result.status).toBe(400)

  })

  it("POST - /api/user/register -> Shouldn't be able to create a user without a password field",
  async () => {

      const result = await request(app).post("/api/user/register").send(userWithoutPasswordMock)

      expect(result.status).toBe(400)
      expect(result.body.error.errors[0]).toBe("Password is a required field")

  })

  it("POST - /api/user/register -> Shouldn't be able to create a user without a name field",
  async () => {

      const result = await request(app).post("/api/user/register").send(userWithoutNameMock)

      expect(result.status).toBe(400)
      expect(result.body.error.errors[0]).toBe("Name is a required field")

  })

  it("POST - /api/user/register -> Shouldn't be able to create a user without a email field",
  async () => {

      const result = await request(app).post("/api/user/register").send(userWithoutEmailMock)

      expect(result.status).toBe(400)
      expect(result.body.error.errors[0]).toBe("Email is a required field")

  })

  it("POST - /api/user/register -> Shouldn't be able to create a user without a phone number field",
  async () => {

      const result = await request(app).post("/api/user/register").send(userWithoutPhoneNumberMock)

      expect(result.status).toBe(400)
      expect(result.body.error.errors[0]).toBe("Phone number is a required field")

  })

  it("GET - /api/user/list -> Shouldn't be able to list users without authentication", async () => {

      const result = await request(app).get("/api/user/list")

      expect(result.status).toBe(401)

  })

  it("GET - /api/user/list -> Should be able to list users", async () => {

      const login = await request(app).post("/api/login").send(loginMock)
      const result = await request(app).get("/api/user/list").set("Authorization", `Bearer ${login.body.token}`)
      
      expect(result.status).toBe(200)
      expect(result.body).toMatchObject(users)

  })

  it("PATCH - /api/user/update/:id -> Shouldn't be able to update user that does not exist", async () => {

      const login = await request(app).post("/api/login").send(loginMock)
      const result = await request(app).patch("/api/user/update/4").send(updateMock).set("Authorization", `Bearer ${login.body.token}`)

      expect(result.status).toBe(404)
      expect(result.body).toBe("user not found")

  })

  it("PATCH - /api/user/update/:id -> Shouldn't be able to update email that already exist", async () => {

      const login = await request(app).post("/api/login").send(loginMock)
      const result = await request(app).patch(`/api/user/update/${users[0].id}`).send(updateEmailExistsMock).set("Authorization", `Bearer ${login.body.token}`)

      expect(result.status).toBe(400)
      expect(result.body).toBe("Email already registred in other account")

  })

  it("PATCH - /api/user/update/:id -> Shouldn't be able to update user without authentication ", async () => {

      await request(app).post("/api/login").send(loginMock)
      const result = await request(app).patch(`/api/user/update/${users[0].id}`).send(updateMock)

      expect(result.status).toBe(401)

  })

  it("PATCH - /api/user/update/:id -> Should be able to update user", async () => {

      const login = await request(app).post("/api/login").send(userMock)
      const result = await request(app).patch(`/api/user/update/${users[0].id}`).set("Authorization", `Bearer ${login.body.token}`).send(updateMock)

      expect(result.status).toBe(200)
      expect(result.body).toStrictEqual({...users[0], ...updateMock})

  })

  it("DELETE - /api/user/update/:id -> Shouldn't be able to delete user that does not exist", async () => {

      const login = await request(app).post("/api/login").send(loginMock)
      const result = await request(app).patch("/api/user/update/4").send(updateMock).set("Authorization", `Bearer ${login.body.token}`)

      expect(result.status).toBe(404)
      expect(result.body).toBe("user not found")

  })

  it("DELETE - /api/user/update/:id -> Shouldn't be able to delete without authentication ", async () => {

      const login = await request(app).post("/api/login").send(loginMock)
      const result = await request(app).delete(`/api/user/delete/${users[0].id}`)

      expect(result.status).toBe(401)

  })

  it("DELETE - /api/user/update/:id -> Should be able to delete a user", async () => {

      const login = await request(app).post("/api/login").send(loginMock)
      const result = await request(app).delete(`/api/user/delete/${users[0].id}`).set("Authorization", `Bearer ${login.body.token}`)

      expect(result.status).toBe(204)

  })
});
