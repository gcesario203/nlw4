import request from 'supertest'
import 'ts-jest'
import { getConnection } from 'typeorm'
import {app} from '../app'
import createConnection from '../database'

describe("Surveys",  ()=>
{
    let testingId = 0
    beforeAll(async ()=>
    {
        const connection = await createConnection();

        await connection.runMigrations();
    })

    afterAll(async ()=>
    {
        const connection = getConnection();
        await connection.dropDatabase()
        await connection.close()
    })


    it("Should be able to create a new survey", async()=>
    {
        const response = await request(app)
        .post("/surveys")
        .send(
        {
            title: "survey@example",
            description:"surveyExample"
        })
        
        let {id} = response.body

        testingId = id

        expect(response.status).toBe(201);
    })

    it("Should not able to create a survey same title",async() =>
    {
        const response = await request(app)
        .post("/surveys")
        .send(
        {
            title: "survey@example",
            description:"surveyExample"
        })

        expect(response.status).toBe(400);
    })

    it("it should be get all surveys",async() =>
    {
        const response = await request(app)
        .get("/surveys")

        expect(response.status).toBe(200);
    })

    it("it should to get a survey by id",async() =>
    {
        const response = await request(app)
        .get(`/surveys/${testingId}`)

        expect(response.status).toBe(200);
    })

    it("it should to delete a survey by id",async() =>
    {
        const response = await request(app)
        .delete(`/surveys/${testingId}`)

        expect(response.status).toBe(200);
    })

})