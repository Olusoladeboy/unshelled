const request = require('supertest')
const app = require('../index')

describe('GET /users', () => {
    it('responds with JSON array', async (done) => {
        await request(app)
            .get('/order-items')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toEqual([
                    { id: 1, name: 'Alice' },
                    { id: 2, name: 'Bob' },
                    { id: 3, name: 'Charlie' }
                ])
                done()
            })
    })
})
