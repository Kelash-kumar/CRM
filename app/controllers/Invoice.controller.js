import ApiError from "../utils/ApiError.js";
import Invoice from "../models/Invoice.model.js";
import { formatDateTime } from "../utils/dateFormatConversion.js";

export async function createInvoice(webhookData) {
  const {
    _id,
    status,
    liveMode,
    amountPaid,
    altId,
    altType,
    name,
    invoiceNumber,
    currency,
    issueDate,
    dueDate,
    amountDue,
    createdAt,
    updatedAt,
  } = webhookData;
  try {
    const newInvoice = await Invoice.create({
      id:_id,
      status,
      liveMode,
      amountPaid,
      altId,
      altType,
      name,
      invoiceNumber,
      currency,
      issueDate,
      dueDate: formatDateTime(dueDate),
      amountDue,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt),
    });
    return newInvoice.toJSON();
  } catch (error) {
    throw new ApiError(500, `Failed to create invoice: ${error.message}`);
  }
};

export async function updateInvoice(webhookData) {
    const {
        _id,
        status,
        liveMode,
        amountPaid,
        altId,
        altType,
        name,
        invoiceNumber,
        currency,
        issueDate,
        dueDate,
        amountDue,
        createdAt,
        updatedAt,
      } = webhookData;

      try {
        const invoice = await Invoice.findByPk(_id);
        if (!invoice) {
          throw new ApiError(404, `Invoice with ID ${_id} not found`);
        }
        await invoice.update({
            id:_id,
            status,
            liveMode,
            amountPaid,
            altId,
            altType,
            name,
            invoiceNumber,
            currency,
            issueDate,
            dueDate: formatDateTime(dueDate),
            amountDue,
            createdAt: formatDateTime(createdAt),
            updatedAt: formatDateTime(updatedAt),
        });
        return invoice.toJSON
      } catch (error) {
         throw new ApiError(500, `Failed to update invoice: ${error.message}`);
      }
};

export async function deleteInvoice(webhookData) {
    try {
        const { _id } = webhookData;
        const invoice = await Invoice.findByPk(_id);
        if (!invoice) {
            throw new ApiError(404, `Invoice with ID ${_id} not found`);
        }
        await invoice.destroy();
        return { message: `Invoice with ID ${_id} deleted successfully` };
    } catch (error) {
        throw new ApiError(500, `Failed to delete invoice: ${error.message}`);
    }
};
