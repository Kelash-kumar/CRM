import ApiError from "../utils/ApiError.js";
import Opportunity from "../models/Opportunity.model.js";
import { formatDateTime } from "../utils/dateFormatConversion.js";

export async function createOpportunity(webhookData) {
  const {
    locationId,
    id,
    name,
    source,
    contactId,
    pipelineId,
    pipelineStageId,
    status,
    dateAdded,
  } = webhookData;

  try {
    const newOpportunity = await Opportunity.create({
      id,
      location_id: locationId,
      name,
      source,
      contact_id: contactId,
      pipeline_id: pipelineId,
      pipeline_stage_id: pipelineStageId,
      status,
      date_added: formatDateTime(dateAdded),
      date_updated: formatDateTime(dateAdded),
    });

    return newOpportunity.toJSON();
  } catch (error) {
    throw new ApiError(500, `Failed to create opportunity: ${error.message}`);
  }
}

export async function updateOpportunity(webhookData) {
  const {
    locationId,
    id,
    name,
    source,
    contactId,
    pipelineId,
    pipelineStageId,
    status,
    dateAdded,
  } = webhookData;

  try {
    const opportunity = await Opportunity.findByPk(id);
    if (!opportunity) {
      throw new ApiError(404, `Opportunity with ID ${id} not found`);
    }

    await opportunity.update({
      location_id: locationId,
      name,
      source,
      contact_id: contactId,
      pipeline_id: pipelineId,
      pipeline_Stage_id: pipelineStageId,
      status,
      date_added: formatDateTime(dateAdded),
      date_updated: formatDateTime(dateAdded),
    });
    return opportunity.toJSON();
  } catch (error) {
    throw new ApiError(500, `Failed to update opportunity: ${error.message}`);
  }
}
