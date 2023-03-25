import request from "supertest"
import { DataSource, Repository } from "typeorm";
import { app } from "../../app";
import appDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUser } from "../../interface/user.interface";
import { contactMock, contactWithoutEmailMock, contactWithoutNameMock, contactWithoutPhoneNumber } from "../../mocks/contact.mock";
import { login2Mock, loginMock } from "../../mocks/login.mock";
import { user2PasswordHashMock, userMock, userPasswordHashMock } from "../../mocks/user.mock";

let connecion: DataSource
let userRepository: Repository<iUser>

let user = null
let user2 = null

let token = ""
let token2 = ""

const contacts_arr = []

const contactUpdateMock = {
    "number": "(21) 99999-8888"
}

describe("Tests Contact Routes", () => {

    beforeAll( async () => {

        await appDataSource.initialize().then(async (res) => {

            connecion = res
            userRepository = res.getRepository(User)

        }).catch( error => {
            console.log(error)
        })

        let createUser = userRepository.create(userPasswordHashMock)
        let createUser2 = userRepository.create(user2PasswordHashMock)

        user = createUser

        await userRepository.save(createUser)
        await userRepository.save(createUser2)

        const tokenUser = await request(app).post("/api/login").send(loginMock)
        const tokenUser2 = await request(app).post("/api/login").send(login2Mock)

        token = tokenUser.body.token
        token2 = tokenUser2.body.token

    })

    afterAll( async () => {

        user = null
        user2 = null

        token = ""
        token2 = ""

        contacts_arr.pop()

        connecion.destroy()

    })

    it("Post - /api/contact/register -> Shouldn't be able to create a contact without name", async () => {

        const result = await  request(app).post("/api/contact/register")
        .send(contactWithoutNameMock).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(400)
        expect(result.body.error.errors[0]).toBe("name is a required field")

    })

    it("Post - /api/contact/register -> Shouldn't be able to create a contact without email", async () => {

        const result = await request(app).post("/api/contact/register")
        .send(contactWithoutEmailMock).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(400)
        expect(result.body.error.errors[0]).toBe("email is a required field")

    })

    it("Post - /api/contact/register -> Shouldn't be able to create a contact without phone number", async () => {

        const result = await request(app).post("/api/contact/register")
        .send(contactWithoutPhoneNumber).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(400)
        expect(result.body.error.errors[0]).toBe("phone_number is a required field")

    })

    it("Post - /api/contact/register -> Shouldn't be able to create a contact without authentication ", async () => {

        const result = await request(app).post("/api/contact/register")
        .send(contactMock)

        expect(result.status).toBe(401)

    })

    it("Post - /api/contact/register -> Should be able to create a contact", async () => {

        const result = await request(app).post("/api/contact/register")
        .send(contactMock).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(201)
        expect(result.body).toHaveProperty("name")
        expect(result.body).toHaveProperty("email")
        expect(result.body).toHaveProperty("phone_number")
        expect(result.body).toHaveProperty("id")
        expect(result.body).toHaveProperty("registred_at")

        contacts_arr.push(result.body)

    })

    it("PATCH - /api/contact/update/:id -> Shouldn't be able to update a contact without authentication", async () => {

        const result = await request(app).patch(`/api/contact/update/${contacts_arr[0].id}`).send(contactMock)

        expect(result.status).toBe(401)

    })

    it("PATCH - /api/contact/update/:id -> Shouldn't be able to update a contact that user not created", async () => {

        const result = await request(app).patch(`/api/contact/update/${contacts_arr[0].id}`)
        .send(contactMock).set("Authorization", `Bearer ${token2}`)

        expect(result.status).toBe(401)
        expect(result.body).toBe("Only who that created the contact is able to update or delete")

    })

    it("PATCH - /api/contact/update/:id -> Shouldn't be able to update a contact that not exist", async () => {

        const result = await request(app).patch("/api/contact/update/1555")
        .send(contactMock).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(404)

    })

    it("PATCH - /api/contact/update/:id -> Should be able to update a contact", async () => {

        const result = await request(app).patch(`/api/contact/update/${contacts_arr[0].id}`)
        .send(contactMock).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(200)

    })

    it("DELETE - /api/contact/delete/:id -> Shouldn't able to delete a contact that not exist", async () => {

        const result = await request(app).delete("/api/contact/delete/11111")
        .set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(404)

    })

    it("DELETE - /api/contact/delete/:id -> Shouldn't be able to delete a contact that user not created", async () => {

        const result = await request(app).delete(`/api/contact/delete/${contacts_arr[0].id}`)
        .set("Authorization", `Bearer ${token2}`)

        expect(result.status).toBe(401)
        expect(result.body).toBe("Only who that created the contact is able to update or delete")

    })

    it("DELETE - /api/contact/delete/:id -> Should able to delete a user", async () => {

        const result = await request(app).delete(`/api/contact/delete/${contacts_arr[0].id}`)
        .set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(204)

    })

})