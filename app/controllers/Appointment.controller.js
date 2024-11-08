import ApiError from "../utils/ApiError.js";
import Appointment from "../models/Appointment.model.js";
import { formatDateTime } from "../utils/dateFormatConversion.js";

export async function createAppointment(webhookData) {
  const { locationId } = webhookData;
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
  } = webhookData.appointment;

  try {
    const newAppointment = await Appointment.create({
      ghl_appointment_id: id,
      location_id: locationId,
      title,
      address,
      calendar_id: calendarId,
      contact_id: contactId,
      appointment_status: appointmentStatus,
      source,
      start_time: formatDateTime(startTime),
      end_time: formatDateTime(endTime),
      date_added: formatDateTime(dateAdded),
      date_updated: formatDateTime(dateAdded),
    });

    return newAppointment.toJSON();
  } catch (error) {
    throw new ApiError(500, `Failed to create appointment: ${error.message}`);
  }
}

export async function updateAppointment(webhookData) {
  const { locationId } = webhookData;
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
  } = webhookData.appointment;

  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      throw new ApiError(404, `Appointment with ID ${id} not found`);
    }

    await appointment.update({
      ghl_appointment_id: id,
      location_id: locationId,
      title,
      address,
      calendar_id: calendarId,
      contact_id: contactId,
      appointment_status: appointmentStatus,
      source,
      start_time: formatDateTime(startTime),
      end_time: formatDateTime(endTime),
      date_added: formatDateTime(dateAdded),
      date_updated: formatDateTime(dateAdded),
    });

    return appointment.toJSON();
  } catch (error) {
    throw new ApiError(500, `Failed to update appointment: ${error.message}`);
  }
}

export async function deleteAppointment(id) {
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      throw new ApiError(404, `Appointment with ID ${id} not found`);
    }

    await appointment.destroy();
    return { message: `Appointment with ID ${id} deleted` };
  } catch (error) {
    throw new ApiError(500, `Failed to delete appointment: ${error.message}`);
  }
}
