const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const Favour = require('../src/models/favour');
const { userOne, userOneID, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a favour', async () => {
    const response = await request(app)
    .post('/favour')
    .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
    .send({
        title: 'Favour title',
      description: 'Favour description',
      value: 2,
      urgency: 'Urgent',
      difficulty: 'Easy',
      categories: ['Physical', 'Social Media']
    })
    .expect(201)

    const favour = await Favour.findById(response.body.favour._id);
    expect(favour).not.toBeNull();
});
