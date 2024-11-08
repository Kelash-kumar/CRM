import ApiError from "../utils/ApiError.js";
import Product from "../models/Product.model.js";
import { formatDateTime } from "../utils/dateFormatConversion.js";

export async function createProduct(webhookData) {
    const { _id, name, productType, availableInStore, userId } = webhookData;
    try {
        const newProduct = await Product.create({
            id: _id,
            name,
            productType,
            availableInStore,
            userId,
            createdAt: formatDateTime(new Date()),
            updatedAt: formatDateTime(new Date()),
        });

        return newProduct.toJSON();
    } catch (error) {
        throw new ApiError(500, `Failed to create product: ${error.message}`);
    }
};

export async function updateProduct(webhookData) {
 const { _id, name, productType, availableInStore, userId } = webhookData;
    try {
        const product = await Product.findByPk(_id);
        if (!product) {
            throw new ApiError(404, `Product with ID ${_id} not found`);
        }
        await product.update({
            name,
            productType,
            availableInStore,
            userId,
            updatedAt: formatDateTime(new Date()),
        });
        return product.toJSON();
    } catch (error) {
        throw new ApiError(500, `Failed to update product: ${error.message}`);
    }
};

export async function deleteProduct(webhookData) {
    const { _id } = webhookData;
    try {
        const product = await Product.findByPk(_id);
        if (!product) {
            throw new ApiError(404, `Product with ID ${_id} not found`);
        }
        await product.destroy();
        return { message: `Product with ID ${_id} deleted successfully` };
    } catch (error) {
        throw new ApiError(500, `Failed to delete product: ${error.message}`);
    }
};
