import request from 'supertest'
import 'ts-jest'
import {app} from '../app'
import createConnection from '../database'

describe("Users",  ()=>
{
    let testingId = 0
    beforeAll(async ()=>
    {
        const connection = await createConnection();

        await connection.runMigrations();
    })

    it("Should be able to create a new user", async()=>
    {
        const response = await request(app)
        .post("/users")
        .send(
        {
            email: "user@example",
            name:"userExample"
        })

        console.log(response.body)
        let {id} = response.body

        testingId = id

        expect(response.status).toBe(201);
    })

    it("Should not able to create a user with a existing e-mail",async() =>
    {
        const response = await request(app)
        .post("/users")
        .send(
        {
            email: "user@example",
            name:"userExample"
        })

        expect(response.status).toBe(400);
    })

    it("it should be get all users",async() =>
    {
        const response = await request(app)
        .get("/users")

        expect(response.status).toBe(200);
    })

    it("it should to get a user by id",async() =>
    {
        const response = await request(app)
        .get(`/users/${testingId}`)

        expect(response.status).toBe(200);
    })

    it("it should to delete a user by id",async() =>
    {
        const response = await request(app)
        .delete(`/users/${testingId}`)

        expect(response.status).toBe(200);
    })

})