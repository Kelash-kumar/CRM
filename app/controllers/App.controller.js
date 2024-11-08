import ApiError from "../utils/ApiError.js";
import { createContact, updateContact } from "./Contact.controller.js";
import {
  createAppointment,
  updateAppointment,
} from "./Appointment.controller.js";
import {
  createOpportunity,
  updateOpportunity,
} from "./Opportunity.controller.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "./Product.controller.js";
import {createInvoice,updateInvoice,deleteInvoice} from "./Invoice.controller.js";


export default class AppController {
  static async index(req, res, next) {
    try {
      const webhookData = req.body;

      if (!webhookData.type) {
        return next(new ApiError(400, "Type is required"));
      }

      switch (webhookData.type) {
        case "ContactCreate":
          const newContact = await createContact(webhookData);
          res.status(201).json(newContact);
          break;
        case "ContactUpdate":
          const updatedContact = await updateContact(webhookData);
          res.status(201).json(updatedContact);
          break;
        case "AppointmentCreate":
          const appointmentCreated = await createAppointment(webhookData);
          res
            .status(201)
            .json({ message: "New Appointment created", appointmentCreated });
          break;
        case "AppointmentUpdate":
          const appointmentUpdated = await updateAppointment(webhookData);
          res.status(201).json({
            message: "Appointment updated successfully",
            appointmentUpdated,
          });
          break;
        case "OpportunityCreate":
          const opportunityCreated = await createOpportunity(webhookData);
          res
            .status(201)
            .json({ message: "Opportunity created", opportunityCreated });
          break;
        case "OpportunityUpdate":
          const opportunityUpdated = await updateOpportunity(webhookData);
          res.status(201).json({ opportunityUpdated });
          break;
        case "ProductCreate":
          const productCreated = await createProduct(webhookData);
          res.status(201).json({ productCreated });
          break;
        case "ProductUpdate":
          const productUpdated = await updateProduct(webhookData);
          res.status(201).json({ productUpdated });
          break;
        case "ProductDelete":
          const productDeleted = await deleteProduct(webhookData);
          res.status(201).json({ productDeleted });
        case "InvoiceCreate":
          const invoiceCreated = await createInvoice(webhookData);
          res.status(201).json({ invoiceCreated });
          break;
        case "InvoiceUpdate":
          const invoiceUpdated = await updateInvoice(webhookData);
          res.status(201).json({ invoiceUpdated });
          break;
        case "InvoiceDelete":
          const opportunityDeleted = await deleteInvoice(webhookData);
          res.status(201).json({ opportunityDeleted });
          break;
        default:
          throw new ApiError(400, "Invalid type");
      }
    } catch (error) {
      next(new ApiError(error.statusCode || 500, error.message));
    }
  }
}
