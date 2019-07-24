const router = require('../routes/events');
const app = require('../app.js');
const request =  require('supertest');

describe('testing events all', () => {
    test('status code check', async () =>{
        const response = await request(app).get('/event/all');
        expect(response.statusCode).toBe(200);
                      
    });

    test('time check', async ()=>{
        const response = await request(app).get('/event/all');
        expect(response).toBeDefined();
    });
});