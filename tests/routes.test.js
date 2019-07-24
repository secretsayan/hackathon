var jsonSchema =  require('jest-json-schema'); 
expect.extend(jsonSchema.matchers);

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

    test('testing schema', async function(){
        const response = await request(app).get('/event/all');
        const schema = {
            required: [
                'eventId',
                '_id',
                'name',
                'description',
                'startDate',
                'endDate',
                'status',
                'noOfTeams',
                'maxTeamSize',
                'prizes',
                'hackathonHost',                
            ],
            properties:{
                'eventId':{
                    'type': 'integer',
                },
                '_id':{
                    'type': 'string',
                },
                'name':{
                    'type': 'string',
                },
                'description':{
                    'type': 'string',
                },
                'startDate':{
                    'type': 'string',
                },
                'endDate':{
                    'type': 'string',
                },
                'status':{
                    'type': 'string',
                },
                'noOfTeams':{
                    'type': 'integer',
                },
                'maxTeamSize':{
                    'type': 'integer',
                },
                'prizes':{
                    'type': 'integer',
                },
            }
        };
        expect(response.schema).toMatchSchema(schema);
    });
});