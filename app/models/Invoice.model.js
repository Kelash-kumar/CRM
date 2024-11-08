import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/init.js';

class Invoice extends Model {}

Invoice.init(
    {
        id: {
        type: DataTypes.STRING,
        primaryKey: true,
        },
        status: {
        type: DataTypes.STRING,
        },
        liveMode: {
        type: DataTypes.TINYINT,
        },
        amountPaid: {
        type: DataTypes.DECIMAL(10,2),
        },
        altId: {
        type: DataTypes.STRING,
        },
        altType: {
        type: DataTypes.STRING,
        },
        name: {
        type: DataTypes.STRING,
        },
        invoiceNumber: {
        type: DataTypes.STRING,
        },
        currency: {
        type: DataTypes.STRING,
        },
        issueDate: {
        type: DataTypes.DATE,
        },
        dueDate: {
        type: DataTypes.DATE,
        },
        amountDue: {
        type: DataTypes.DECIMAL(10,2),
        },
        createdAt: {
        type: DataTypes.DATE,
        },
        updatedAt: {
        type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: 'Invoice',
        tableName: 'invoices',
        timestamps: false,
    }
);

 export default Invoice;