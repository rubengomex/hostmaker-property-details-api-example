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
            FROM        properties as pro
            INNER JOIN  property_versions as prov ON prov.propertyId = pro.id
            WHERE       prov.propertyId = :propertyId
            ORDER BY    version DESC
            `
    }

    static findLastVersion() {
        return `
            SELECT      prov.version as version
            FROM        properties as pro
            INNER JOIN  property_versions as prov ON prov.propertyId = pro.id
            WHERE       pro.id = :propertyId
            ORDER BY    version DESC
            LIMIT       1
        `
    }

    static create() {
        return `
            INSERT INTO property_versions (id, propertyId, host, address, airbnbId, numberOfBedrooms, numberOfBathrooms, incomeGenerated, version) VALUES 
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

    static removePropertyVersions() {
        return `DELETE FROM property_versions WHERE propertyId = :propertyId`
    }
}

module.exports = exports = VersionQueries
