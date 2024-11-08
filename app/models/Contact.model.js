import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/init.js';

class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    country: {
      type: DataTypes.STRING,
    },
    date_added: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: false,
  }
);

export default Contact;
