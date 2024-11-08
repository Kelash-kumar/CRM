import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/init.js';
import Contact from './Contact.model.js';

class ContactCustomFieldValue extends Model {}

ContactCustomFieldValue.init({
    contact_id: {
        type: DataTypes.STRING,
        references: {
            model: Contact,
            key: 'id'
        }
    },
    field_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    field_value: {
        type: DataTypes.JSON
    }
}, {
    sequelize,
    modelName: 'ContactCustomFieldValue',
    tableName: 'contact_custom_field_values',
    timestamps: false
});

export default ContactCustomFieldValue;