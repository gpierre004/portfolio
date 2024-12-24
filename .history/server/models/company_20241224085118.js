// models/company.js
module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        symbol: {  // Changed from ticker to match transaction table
            type: DataTypes.STRING(10),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        sector: DataTypes.STRING(255),
        industry: DataTypes.STRING(255),
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'companies',
        indexes: [
            {
                fields: ['symbol']
            }
        ]
    });
    return Company;
};