const db = require("../../config/database");
const ApiError = require("../../utils/ApiError");
const { formatDateTime } = require("../../utils/dateFormatConversion");

exports.createOpportunity = async (data) => {
  const {
    locationId,
    appId,
    id,
    name,
    source,
    contactId,
    pipelineId,
    pipelineStageId,
    status,
    dateAdded,
  } = data;

  const formattedDateAdded = formatDateTime(dateAdded);

  const insertOpportunityQuery = `INSERT INTO opportunities (id, location_id, name, contact_id, pipeline_id, pipeline_stage_id, source, status, created_at)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const opportunityValues = [
    id,
    locationId,
    name,
    contactId,
    pipelineId,
    pipelineStageId,
    source,
    status,
    formattedDateAdded,
  ];

  try {
    await db.query(insertOpportunityQuery, opportunityValues);

    return {
      id,
      locationId,
      appId,
      name,
      source,
      contactId,
      pipelineId,
      pipelineStageId,
      status,
      dateAdded,
    };
  } catch (error) {
    throw new ApiError(
      500,
      `Failed to create new opportunity: ${error.message}`
    );
  }
};

exports.updateOpportunity = async (data) => {
  const {
    locationId,
    appId,
    id,
    name,
    source,
    contactId,
    pipelineId,
    pipelineStageId,
    status,
    dateAdded,
  } = data;

  const formattedDateAdded = formatDateTime(dateAdded);

  const updateOpportunityQuery = `UPDATE opportunities
                                    SET location_id = ?, name = ?, contact_id = ?, pipeline_id = ?, pipeline_stage_id = ?, source = ?, status = ?, created_at = ?
                                    WHERE id = ?`;

  const opportunityValues = [
    locationId,
    name,
    contactId,
    pipelineId,
    pipelineStageId,
    source,
    status,
    formattedDateAdded,
    id,
  ];

  try {
   
    const findOpportunityQuery = `SELECT * FROM opportunities WHERE id = ?`;
    const [opportunity] = await db.query(findOpportunityQuery, [id]);
    if(opportunity.length==0) {
     return new ApiError(404, `Opportunity with id ${id} not found`);
    }
    await db.query(updateOpportunityQuery, opportunityValues);
    return {
      id,
      locationId,
      appId,
      name,
      source,
      contactId,
      pipelineId,
      pipelineStageId,
      status,
      dateAdded,
    };
  } catch (error) {
    throw new ApiError(500, `Failed to update opportunity: ${error.message}`);
  }
};
