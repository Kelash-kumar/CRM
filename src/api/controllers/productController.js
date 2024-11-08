const ApiError = require("../../utils/ApiError");
const db = require("../../config/database");
const { formatDateTime } = require("../../utils/dateFormatConversion");

exports.createProduct = async (data) => {
  const { _id, name, productType, availableInStore, userId } = data;
  const createdAt = formatDateTime(new Date());
  const updatedAt = formatDateTime(new Date());
  const productInsertQuery = `INSERT INTO products (id, name, productType, availableInStore, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const productValues = [
    _id,
    name,
    productType,
    availableInStore,
    userId,
    createdAt,
    updatedAt,
  ];

  try {
    await db.query(productInsertQuery, productValues);
    return {_id, name, productType, availableInStore, userId, createdAt, updatedAt};
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.updateProduct = async (data) => {
    const { _id, name, productType, availableInStore, userId } = data;
    const updatedAt = formatDateTime(new Date());
    const productUpdateQuery = `UPDATE products SET name = ?, productType = ?, availableInStore = ?, userId = ?, updatedAt = ? WHERE id = ?`;
    const productValues = [name, productType, availableInStore, userId, updatedAt, _id];
    
    try {
        const [isProductExist] = await db.query(`SELECT * FROM products WHERE id = ?`, [_id]);
        if (isProductExist.length === 0) {
            throw new ApiError(404, "The product does not exist");
        }
        await db.query(productUpdateQuery, productValues);
        return {_id, name, productType, availableInStore, userId, updatedAt};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

exports.deleteProduct = async (data) => {
    const { _id } = data;
    const productDeleteQuery = `DELETE FROM products WHERE id = ?`;
    
    try {
        const [isProductExist] = await db.query(`SELECT * FROM products WHERE id = ?`, [_id]);
        if (isProductExist.length === 0) {
            throw new ApiError(404, "The product does not exist");
        }
        await db.query(productDeleteQuery, [_id]);
        return {message: "Product deleted successfully"};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}