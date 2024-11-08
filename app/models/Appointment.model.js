import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/init.js';

class Appointment extends Model {}

Appointment.init(
    {
     
        ghl_appointment_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        },
        location_id: {
        type: DataTypes.STRING,
        },
        title: {
        type: DataTypes.STRING,
        },
        address: {
        type: DataTypes.STRING,
        },
        calendar_id: {
        type: DataTypes.STRING,
        },
        contact_id: {
        type: DataTypes.STRING,
        },
        appointment_status: {
        type: DataTypes.ENUM('confirmed', 'pending', 'cancelled'),
        },
        source: {
        type: DataTypes.STRING,
        },
        start_time: {
        type: DataTypes.DATE,
        },
        end_time: {
        type: DataTypes.DATE,
        },
        date_added: {
        type: DataTypes.DATE,
        },
        date_updated: {
        type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: 'Appointment',
        tableName: 'appointments',
        timestamps: false,
    }
);

export default Appointment;