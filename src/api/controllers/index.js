const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const {
  createContact,
  updateContact,
} = require("../controllers/contactController");
const {
  createAppointment,
  updateAppointment,
} = require("../controllers/appointmentController");
const {
  createOpportunity,
  updateOpportunity,
} = require("../controllers/OpportunityController");
const { createProduct,updateProduct } = require("../controllers/productController");

exports.webhook = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.type) {
      return next(new ApiError(400, "Type is required"));
    }

    switch (data.type) {
      case "ContactCreate":
        const newContact = await createContact(data);
        res.status(201).json({ message: "New Contact created", newContact });
        break;
      case "ContactUpdate":
        const updatedContact = await updateContact(data);
        res
          .status(201)
          .json({ message: "Contact updated successfully", updatedContact });
        break;
      case "AppointmentCreate":
        const appointmentCreated = await createAppointment(data);
        res
          .status(201)
          .json({ message: "New Appointment created", appointmentCreated });
        break;
      case "AppointmentUpdate":
        const appointmentUpdated = await updateAppointment(data);
        res.status(201).json({
          message: "Appointment updated successfully",
          appointmentUpdated,
        });
        break;
      case "OpportunityCreate":
        const opportunityCreated = await createOpportunity(data);
        res
          .status(201)
          .json({ message: "Opportunity created", opportunityCreated });
        break;
      case "OpportunityUpdate":
        const opportunityUpdated = await updateOpportunity(data);
        res.status(201).json({ opportunityUpdated });
        break;
      case "ProductCreate":
        const productCreated = await createProduct(data);
        res.status(201).json({ productCreated });
        break;
      case "ProductUpdate":
        const productUpdated = await updateProduct(data);
        res.status(201).json({ productUpdated });
        break;  
      default:
        res
          .status(200)
          .json({ message: "Webhook received, data type not matched " });
    }
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
});
