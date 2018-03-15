describe('Property route tests', function() {
    let propertyId = '0'
    const propertyData = {
        "host": "Ruben",
        "address": {
            "line1": "Flat 9",
            "line4": "8 Westbourne Terrace",
            "postCode": "W3 3UL",
            "city": "London",
            "country": "U.K."
        },
        "airbnbId": 3512500,
        "numberOfBedrooms": 1,
        "numberOfBathrooms": 1,
        "incomeGenerated": 2000.34
    }

    context('POST', function() {
        it('it should create a property', async function() {
            const { body } = await request
                .post('/properties')
                .send(propertyData)
                .expect(200)

            expect(body).to.be.an('object').not.empty
            expect(body).to.have.property('status').to.be.true
            expect(body).to.have.property('message').to.be.empty
            expect(body).to.have.property('data').not.empty

            propertyId = body.data.id
        })

        it('it should have create a new version', async function() {
            let { body } = await request
                .get(`/properties/${propertyId}/versions`)
                .expect(200)
            
            expect(body).to.have.property('status').to.be.true
            expect(body).to.have.property('message').to.be.empty
            expect(body).to.have.property('data').not.empty
            expect(body.data).to.be.an('array').with.length(1)

            const [version] = body.data
            expect(version).to.have.a.property('propertyId', propertyId)
            expect(version).to.have.a.property('version', 1)
        })
    })

    context('GET /', function() {
        it('it should get all properties', async function() {
            const { body } = await request
                .get('/properties')
                .expect(200)

            expect(body).to.be.an('object').not.empty
            expect(body).to.have.a.property('status').to.be.true
            expect(body).to.have.a.property('message').to.be.empty
            expect(body).to.have.a.property('data').that.is.an('array').not.empty
        })

        it('it should get one property', async function() {
            const { body } = await request
                .get(`/properties/${propertyId}`)
                .expect(200)

            expect(body).to.be.an('object').not.empty
            expect(body).to.have.a.property('status').to.be.true
            expect(body).to.have.a.property('message').to.be.empty
            expect(body).to.have.a.property('data').that.is.an('object').not.empty
        })
    })

    context('UPDATE', function() {
        it('it should update a property', async function() {
            let { body } = await request
                .put(`/properties/${propertyId}`)
                .send({ numberOfBedrooms: 2 })
                .expect(200)

            expect(body).to.have.property('status').to.be.true
            expect(body).to.have.property('message').to.be.empty
            expect(body).to.have.property('data').not.empty
            expect(body.data).to.have.a.property('id', propertyId)

            let res = await request.get(`/properties/${propertyId}`)
            expect(res.body.data.numberOfBedrooms).to.be.equal(2)
        })

        it('it should have create a new version', async function() {
            let { body } = await request
                .get(`/properties/${propertyId}/versions`)
                .expect(200)
            
            expect(body).to.have.property('status').to.be.true
            expect(body).to.have.property('message').to.be.empty
            expect(body).to.have.property('data').not.empty
            expect(body.data).to.be.an('array').with.length(2)

            const [version2, version1] = body.data
            expect(version1).to.have.a.property('version', 1)
            expect(version1).to.have.a.property('propertyId', propertyId)
            expect(version2).to.have.a.property('version', 2)
            expect(version2).to.have.a.property('propertyId', propertyId)
        })
    })

    context('DELETE', function() {
        it('it should delete a property', async function() {
            const { body } = await request
                .delete(`/properties/${propertyId}`)
                .expect(200)

            expect(body).to.have.property('status').to.be.true
            expect(body).to.have.property('message').to.be.empty
            expect(body).to.have.property('data').that.is.an('object').not.empty
        })

        it('it should have deleted all the versions of the property', async function() {
            let { body } = await request
                .get(`/properties/${propertyId}/versions`)
                .expect(200)
            
            expect(body).to.have.property('status').to.be.true
            expect(body).to.have.property('message').to.be.empty
            expect(body).to.have.property('data').empty
        })
    })
    
})
