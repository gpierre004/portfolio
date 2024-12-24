// models/transaction.js
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        run_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        account: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        action: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        symbol: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        exchange_quantity: {
            type: DataTypes.DECIMAL(15, 3),
            defaultValue: 0
        },
        exchange_currency: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        quantity: {
            type: DataTypes.DECIMAL(15, 3),
            defaultValue: 0
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true
        },
        exchange_rate: {
            type: DataTypes.DECIMAL(15, 6),
            defaultValue: 0
        },
        commission: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0
        },
        fees: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0
        },
        accrued_interest: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true
        },
        settlement_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'transactions',
        indexes: [
            {
                fields: ['run_date']
            },
            {
                fields: ['account']
            },
            {
                fields: ['symbol']
            }
        ]
    });

    return Transaction;
};