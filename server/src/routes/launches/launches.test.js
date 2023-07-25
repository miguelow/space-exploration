const request = require('supertest')
const app = require('../../app')
const {
    mongoConnect, 
    mongoDisconnect
} = require('../../services/mongo')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect()
    })
    afterAll(async () =>{
        await mongoDisconnect()
    })

    describe("Test GET /launches", () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })
    
    describe("Test POST /launches", () => {
    
        const launchData = {
            mission: 'test',
            rocket: 'rocketname',
            target: 'madrid',
            launchDate: "March 1, 2024"
        }
    
        const launchDataWithoutDate = {
            mission: 'test',
            rocket: 'rocketname',
            target:'madrid',
        }
    
        const launchDataInvalidDate = {
            ...launchData,
            launchDate: "invalid date"
        }
    
        test('It should respond with 201 created', async () => {
            const response = await request(app)
            .post('/launches')
            .send(launchData)
            .expect('Content-Type', /json/)
            .expect(201)
            
            const requestDate = new Date(launchData.launchDate).valueOf
            const responseDate = new Date(response.body.launchDate).valueOf
            expect(responseDate).toBe(requestDate)
    
            //To check the body use hest assertions
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })
    
        test('It should catch missing required properties', async () => {
            const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)
    
            expect(response.body).toStrictEqual({
                error: 'All fields are required'
            })
        })
        
        test('It should catch invalid dates', async () => {
            const response = await request(app)
            .post('/launches')
            .send(launchDataInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)
    
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date format'
            })
        })
    })

})
