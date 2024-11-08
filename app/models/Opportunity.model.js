import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/init.js';

class Opportunity extends Model {}

Opportunity.init(
    {
        id: {
        type: DataTypes.STRING,
        primaryKey: true,
        },
        location_id: {
        type: DataTypes.STRING,
        },
        name: {
        type: DataTypes.STRING,
        },
        contact_id: {
        type: DataTypes.STRING,
        },
        monetary_value: {
        type: DataTypes.DECIMAL(10, 2),
        },
        pipeline_id: {
        type: DataTypes.STRING,
        },
        pipeline_Stage_id: {
        type: DataTypes.STRING,
        },
        source: {
        type: DataTypes.STRING,
        },
        status: {
        type: DataTypes.STRING,
        },
        assigned_to: {
        type: DataTypes.STRING,
        },
        created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Opportunity',
        tableName: 'opportunities',
        timestamps: false,  
    }
);

export default Opportunity;