import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/init.js';


class Product extends Model {}

Product.init(
    {
        id: {
        type: DataTypes.STRING,
        primaryKey: true,
        },
        name: {
        type: DataTypes.STRING,
        },
        productType: {
        type: DataTypes.STRING,
        },
        availableInStore: {
        type: DataTypes.BOOLEAN,
        },
        userId: {
        type: DataTypes.STRING,
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
        modelName: 'Product',
        tableName: 'products',
        timestamps: false,
    }
);

export default Product;
