const ApiError = require("../../utils/ApiError");
const db = require("../../config/database");
const { formatDateTime } = require("../../utils/dateFormatConversion");

exports.createContact = async (data) => {
  // 1. Insert the primary contact data
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

  //convert dateAdded to a valid date format
  const formattedDateAdded = formatDateTime(dateAdded);
  const insertContactQuery = `INSERT INTO contacts (id, location_id, first_name, last_name, email, phone, source, tags, country,date_added)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  const contactValues = [
    id,
    locationId,
    firstName,
    lastName,
    email,
    phone,
    source,
    JSON.stringify(tags),
    country,
    formattedDateAdded,
  ];

  try {
    await db.query(insertContactQuery, contactValues);
  } catch (error) {
    throw new ApiError(500, "Failed to create new contact");
  }

  // 2. here Inserting  each custom field data

  const insertCustomFieldQuery = `INSERT INTO contact_custom_field_values (contact_id, field_id, field_value) VALUES (?, ?, ?)`;
  for (const field of customFields) {
    const { id: customFieldId, value } = field;
    const valueIntoString = Array.isArray(value)
      ? JSON.stringify(value)
      : JSON.stringify([value]);
    try {
      await db.query(insertCustomFieldQuery, [
        id,
        customFieldId,
        valueIntoString,
      ]);
    } catch (error) {
      throw new ApiError(
        500,
        `Failed to insert custom field ${customFieldId} for contact`
      );
    }
  }

  return {
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
  };
};

exports.updateContact = async (data) => {
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

  let formattedDateAdded = null;
  if (dateAdded) {
    const parsedDate = new Date(dateAdded);
    if (!isNaN(parsedDate.getTime())) {
      formattedDateAdded = parsedDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    } else {
      throw new Error("Invalid date format for dateAdded");
    }
  }

  const updateContactQuery = `UPDATE contacts SET location_id = ?, first_name = ?, last_name = ?, email = ?, phone = ?, source = ?, tags = ?, country = ?, date_added = ? WHERE id = ?`;

  const contactUpdatedValues = [
    locationId,
    firstName,
    lastName,
    email,
    phone,
    source,
    JSON.stringify(tags),
    country,
    formattedDateAdded,
    id,
  ];

  try {
    const findContactQuery = `SELECT * FROM contacts WHERE id = ?`;
    const [contact] = await db.query(findContactQuery, [id]);
    if (contact.length === 0) {
      return new ApiError(404, `Contact with id ${id} not found`);
    }
    await db.query(updateContactQuery, contactUpdatedValues);
  } catch (error) {
    return new ApiError(500, "Failed to update contact");
  }
  // 2. Update each custom field data

  const updateCustomFieldQuery = `UPDATE contact_custom_field_values SET field_value = ? WHERE contact_id = ? AND field_id = ?`;
  for (const field of customFields) {
    const { id: customFieldId, value } = field;
    const valueIntoString = Array.isArray(value)
      ? JSON.stringify(value)
      : JSON.stringify([value]);

    try {
      await db.query(updateCustomFieldQuery, [
        id,
        customFieldId,
        valueIntoString,
      ]);
    } catch (error) {
      throw new ApiError(
        500,
        `Failed to update custom field ${customFieldId} for contact`
      );
    }
  }

  return {
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
  };
};
