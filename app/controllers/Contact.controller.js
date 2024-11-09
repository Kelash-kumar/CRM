import ApiError from "../utils/ApiError.js";
import Contact from "../models/Contact.model.js";
import ContactCustomFieldValue from "../models/ContactCustomFieldValues.model.js";
import { formatDateTime } from "../utils/dateFormatConversion.js";
import sequelize from "../configs/init.js";

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
  const transaction = await sequelize.transaction();

  try {
    const newContact = await Contact.create(
      {
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
      },
      { transaction }
    );

    const customFieldValues = customFields.map((field) => ({
      contact_id: newContact.id,
      field_id: field.id,
      field_value: Array.isArray(field.value)
        ? JSON.stringify(field.value)
        : String(field.value),
    }));

    await ContactCustomFieldValue.bulkCreate(customFieldValues, {
      transaction,
    });

    await transaction.commit();
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
    await transaction.rollback();
    throw new ApiError(500, `Failed to create new contact: ${error.message}`);
  }
}

export async function updateContact(data) {
  const {
    locationId,
    id,
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

  const formattedDateAdded = dateAdded ? formatDateTime(dateAdded) : null;
  const transaction = await sequelize.transaction();

  try {
    const contact = await Contact.findByPk(id, { transaction });
    if (!contact) {
      throw new ApiError(404, 'Contact not found');
    }

    await contact.update(
      {
        location_id: locationId,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        source,
        tags: JSON.stringify(tags),
        country,
        date_added: formattedDateAdded,
      },
      { transaction }
    );

    if (customFields && customFields.length > 0) {
      await ContactCustomFieldValue.destroy({
        where: { contact_id: id },
        transaction,
      });

      const customFieldValues = customFields.map((field) => ({
        contact_id: id,
        field_id: field.id,
        field_value: Array.isArray(field.value)
          ? JSON.stringify(field.value)
          : String(field.value),
      }));

      await ContactCustomFieldValue.bulkCreate(customFieldValues, {
        transaction,
      });
    }

    await transaction.commit();
    return {
      id: contact.id,
      locationId: contact.location_id,
      firstName: contact.first_name,
      lastName: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      source: contact.source,
      tags: JSON.parse(contact.tags),
      country: contact.country,
      dateAdded: contact.date_added,
      customFields,
    };
  } catch (error) {
    await transaction.rollback();
    throw new ApiError(500, `Failed to update contact: ${error.message}`);
  }
}
