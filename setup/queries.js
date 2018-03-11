class SetupQueries {
    static dropDb() {
        return `DROP SCHEMA IF EXISTS {{dbName}}`
    }

    static createDb() {
        return `CREATE SCHEMA IF NOT EXISTS {{dbName}}`
    }

    static createPropertiesTable() {
        return `
            CREATE TABLE IF NOT EXISTS properties (
                id varchar(36) NOT NULL DEFAULT '',
                host varchar(255) DEFAULT NULL,
                address varchar(255) CHARACTER SET utf8 DEFAULT NULL,
                airbnbId int(11) NOT NULL,
                numberOfBedrooms int(11) NOT NULL,
                numberOfBathrooms int(11) NOT NULL,
                incomeGenerated double(20,2) NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        `
    }

    static createPropertyVersionsTable() {
        return `
        CREATE TABLE IF NOT EXISTS property_versions (
            id varchar(36) NOT NULL DEFAULT '',
            propertyId varchar(36) NOT NULL DEFAULT '',
            host varchar(255) DEFAULT NULL,
            address varchar(255) CHARACTER SET utf8 DEFAULT NULL,
            airbnbId int(11) NOT NULL,
            numberOfBedrooms int(11) NOT NULL,
            numberOfBathrooms int(11) NOT NULL,
            incomeGenerated double(20,2) NOT NULL,
            version int(3) NOT NULL DEFAULT 1,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        `
    }

    static cleanPropertiesTable() {
        return `DELETE FROM properties`
    }

    static cleanPropertyVersionsTable() {
        return `DELETE FROM property_versions`
    }

    static insertPropertiesTableContent() {
        return `
            INSERT INTO properties (id, host, address, airbnbId, numberOfBedrooms, numberOfBathrooms, incomeGenerated) VALUES 
            (
                :id,
                :host,
                :address,
                :airbnbId,
                :numberOfBedrooms,
                :numberOfBathrooms,
                :incomeGenerated
            )
        `
    }

    static insertPropertyVersionsTableContent() {
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
}

module.exports = exports = {
    dropDb: SetupQueries.dropDb,
    createDb: SetupQueries.createDb,
    createPropertiesTable: SetupQueries.createPropertiesTable,
    createPropertyVersionsTable: SetupQueries.createPropertyVersionsTable,
    cleanPropertiesTable: SetupQueries.cleanPropertiesTable,
    cleanPropertyVersionsTable: SetupQueries.cleanPropertyVersionsTable,
    insertPropertiesTableContent: SetupQueries.insertPropertiesTableContent,
    insertPropertyVersionsTableContent: SetupQueries.insertPropertyVersionsTableContent
}
