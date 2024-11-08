const ApiError = require("../../utils/ApiError");
const {formatDateTime} = require("../../utils/dateFormatConversion");
const db = require("../../config/database");
const { log } = require("winston");

exports.createAppointment = async (data) => {

  const { locationId } = data;
  const {
    id,
    address,
    title,
    calendarId,
    contactId,
    appointmentStatus,
    source,
    startTime,
    endTime,
    dateAdded,
    dateUpdated,
  } = data.appointment;
  
  // convert the date strings to the correct format
  const formattedStartTime = formatDateTime(startTime);
  const formattedEndTime = formatDateTime(endTime);
  const formattedDateAdded = formatDateTime(dateAdded);
  const formattedDateUpdated = formatDateTime(dateUpdated);

  const insertAppointmentQuery = `INSERT INTO appointments (ghl_appointment_id, location_id, title, address,calendar_id, contact_id, appointment_status, source, start_time, end_time, date_added, date_updated)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

  const appointmentValues = [
    id,
    locationId,
    title,
    address,
    calendarId,
    contactId,
    appointmentStatus,
    source,
    formattedStartTime,
    formattedEndTime,
    formattedDateAdded,
    formattedDateUpdated,
  ];

 try {
  await db.query(insertAppointmentQuery, appointmentValues);
 } catch (error) {
 throw new ApiError(500, `Failed to create new appointment ${error.message}`,);
}

 return { id, title, address, calendarId, contactId, appointmentStatus, source, startTime, endTime, dateAdded, dateUpdated };
};

exports.updateAppointment = async (data) => {
  const {
    id,
    address,
    title,
    calendarId,
    contactId,
    appointmentStatus,
    source,
    startTime,
    endTime,
    dateUpdated,
  } = data.appointment;

  const formattedStartTime = formatDateTime(startTime);
  const formattedEndTime = formatDateTime(endTime);
  const formattedDateUpdated = formatDateTime(dateUpdated);

  const updateAppointmentQuery = `UPDATE appointments
    SET title = ?, address = ?, calendar_id = ?, contact_id = ?, appointment_status = ?, source = ?, start_time = ?, end_time = ?, date_updated = ?
    WHERE ghl_appointment_id = ?
  `;

  const appointmentValues = [
    title,
    address,
    calendarId,
    contactId,
    appointmentStatus,
    source,
    formattedStartTime,
    formattedEndTime,
    formattedDateUpdated,
    id,
  ];
  
  try {
    // find and update the appointment in the database
    const findAppointment = `SELECT * FROM appointments WHERE ghl_appointment_id = ?`;
    const [appointment] = await db.query(findAppointment, [id]);
    if(!appointment.length==0)
    {
      return new ApiError(404, `Appointment with id ${id} not found`);
    }
    await db.query(updateAppointmentQuery, appointmentValues);
  } catch (error) {
    throw new ApiError(500, `Failed to update appointment ${error.message}`);
  }

};

exports.deleteAppointment = async (data) => {
  const { id } = data.appointment;

  const deleteAppointmentQuery = `DELETE FROM appointments WHERE ghl_appointment_id = ?`;

  try {
    await db.query(deleteAppointmentQuery, [id]);
  } catch (error) {
    throw new ApiError(500, `Failed to delete appointment ${error.message}`);
  }
};