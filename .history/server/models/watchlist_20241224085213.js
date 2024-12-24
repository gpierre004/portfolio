// models/watchlist.js
module.exports = (sequelize, DataTypes) => {
    const Watchlist = sequelize.define('Watchlist', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_added: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        reason: DataTypes.TEXT,
        symbol: {  // Changed from ticker to match transaction table
            type: DataTypes.STRING(10),
            allowNull: false
        },
        account: {  // Added to match transaction table
            type: DataTypes.STRING(50),
            allowNull: false
        },
        currentPrice: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        weekHigh52: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        percentBelow52WeekHigh: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        avgClose: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        sector: {
            type: DataTypes.STRING(100),
            defaultValue: ''
        },
        priceWhenAdded: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        priceChange: DataTypes.DOUBLE,
        lastUpdated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        interested: DataTypes.BOOLEAN,
        metrics: DataTypes.JSONB,
        industry: DataTypes.STRING(255)
    }, {
        tableName: 'watchlists',
        indexes: [
            {
                fields: ['symbol']
            },
            {
                fields: ['account']
            }
        ]
    });
    
    return Watchlist;
};