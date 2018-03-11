class VersionQueries {
    static findPropertyVersions() {
        return `
            SELECT      prov.id as id,
                        pro.id as propertyId,
                        pro.host as host,
                        pro.address as address,
                        pro.airbnbId as airbnbId,
                        pro.numberOfBedrooms as numberOfBedrooms,
                        pro.numberOfBathrooms as numberOfBathrooms,
                        pro.incomeGenerated as incomeGenerated,
                        prov.version as version
            FROM        property as pro
            INNER JOIN  property_version as prov ON prov.propertyId = pro.id
            WHERE       pro.id = :propertyId
            ORDER BY    DESC
            `
    }

    static findLastVersion() {
        return `
            SELECT      prov.version as version
            FROM        property as pro
            INNER JOIN  property_version as prov ON prov.propertyId = pro.id
            WHERE       pro.id = :propertyId
            ORDER BY    DESC
            LIMIT       1
        `
    }

    static create() {
        return `
            INSERT INTO property_version (id, propertyId, host, address, airbnbId, numberOfBedrooms, numberOfBathrooms, incomeGenerated, version) VALUES 
            (
                :id,
                :propertyId,
                :host,
                :address,
                :airbnbId,
                :numberOfBedrooms,
                :numberOfBathrooms,
                :incomeGenerated,
                :version
            )
        `
    }
}

module.exports = exports = VersionQueries
