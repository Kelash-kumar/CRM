import ApiError from "../utils/ApiError.js";
import Contact from "../models/Contact.model.js";
import ContactCustomFieldValue from "../models/ContactCustomFieldValues.model.js";
import { formatDateTime } from "../utils/dateFormatConversion.js";

export async function createContact(data) {
  const {
    id,
    locationId,
    firstName,
    lastName,
    email,
    phone,
    source,
    tags,
    country,
    dateAdded,
    customFields,
  } = data;
  const formattedDateAdded = formatDateTime(dateAdded);

  try {
    // Insert the primary contact data
    const newContact = await Contact.create({
      id,
      location_id: locationId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      source,
      tags: JSON.stringify(tags),
      country,
      date_added: formattedDateAdded,
    });

    // Insert custom field values
    // const customFieldPromises = customFields.map((field) => {
    //   const { id: customFieldId, value } = field;
    //   const valueIntoString = Array.isArray(value)
    //     ? JSON.stringify(value)
    //     : JSON.stringify([value]);

    //   return ContactCustomFieldValue.create({
    //     contactId: newContact.id,
    //     fieldId: customFieldId,
    //     fieldValue: valueIntoString,
    //   });
    // });

    // await Promise.all(customFieldPromises);

    return {
      id: newContact.id,
      locationId: newContact.location_id,
      firstName: newContact.first_name,
      lastName: newContact.last_name,
      email: newContact.email,
      phone: newContact.phone,
      source: newContact.source,
      tags: JSON.parse(newContact.tags),
      country: newContact.country,
      dateAdded: newContact.date_added,
      customFields,
    };
  } catch (error) {
    throw new ApiError(500, `Failed to create new contact: ${error.message}`);
  }
}

export  async function updateContact(data) {
  const {
    id,
    locationId,
    firstName,
    lastName,
    email,
    phone,
    source,
    tags,
    country,
    dateAdded,
    customFields,
  } = data;
  const formattedDateAdded = formatDateTime(dateAdded);

  try {
    // Find the existing contact
    const existingContact = await Contact.findByPk(id);
    if (!existingContact) {
      throw new ApiError(404, `Contact with ID ${id} not found`);
    }

    // Update the primary contact data
    await existingContact.update({
      location_id: locationId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      source,
      tags: JSON.stringify(tags),
      country,
      date_added: formattedDateAdded,
    });

    // // Update the custom field values
    // const customFieldPromises = customFields.map(async (field) => {
    //   const { id: customFieldId, value } = field;
    //   const valueIntoString = Array.isArray(value)
    //     ? JSON.stringify(value)
    //     : JSON.stringify([value]);

    //   // Find the existing custom field value or create a new one
    //   let customFieldValue = await ContactCustomFieldValue.findOne({
    //     where: {
    //       contactId: id,
    //       fieldId: customFieldId,
    //     },
    //   });

    //   if (!customFieldValue) {
    //     customFieldValue = await ContactCustomFieldValue.create({
    //       contactId: id,
    //       fieldId: customFieldId,
    //       fieldValue: valueIntoString,
    //     });
    //   } else {
    //     await customFieldValue.update({ fieldValue: valueIntoString });
    //   }
    // });

    // await Promise.all(customFieldPromises);

    // Fetch the updated contact data
    // const updatedContact = await Contact.findByPk(id, {
    //   include: [
    //     {
    //       model: ContactCustomFieldValue,
    //       as: 'customFields',
    //     },
    //   ],
    // });

    return {
      id: updatedContact.id,
      locationId: updatedContact.location_id,
      firstName: updatedContact.first_name,
      lastName: updatedContact.last_name,
      email: updatedContact.email,
      phone: updatedContact.phone,
      source: updatedContact.source,
      tags: JSON.parse(updatedContact.tags),
      country: updatedContact.country,
      dateAdded: updatedContact.date_added,
      customFields: updatedContact.customFields.map((field) => ({
        id: field.fieldId,
        value: JSON.parse(field.fieldValue),
      })),
    };
  } catch (error) {
    throw new ApiError(500, `Failed to update contact: ${error.message}`);
  }
}