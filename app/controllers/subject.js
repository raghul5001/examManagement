const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  createSubjectService,
  listSubjectsService,
  updateSubjectService,
  deleteSubjectService,
} = require("../services/subjectservice");

const createSubject = async (req, res) => {
  const params = req.body;
  const result = await createSubjectService({ ...params });
  if (!result.status) {
    return sendErrorResponse(req, res, result.statusCode, result.message, []);
  } else {
    return sendSuccessResponse(
      req,
      res,
      result.statusCode,
      result.message,
      result.data
    );
  }
};

const getSubject = async (req, res) => {
  const subjectId = req.params.subjectId;
  const result = await listSubjectsService(subjectId);
  if (!result.status) {
    return sendErrorResponse(req, res, result.statusCode, result.message, []);
  } else {
    return sendSuccessResponse(
      req,
      res,
      result.statusCode,
      result.message,
      result.data
    );
  }
};

const updateSubject = async (req, res) => {
  const subjectId = req.params.subjectId;
  const params = req.body;
  const result = await updateSubjectService(subjectId, params);
  if (!result.status) {
    return sendErrorResponse(req, res, result.statusCode, result.message, []);
  } else {
    return sendSuccessResponse(
      req,
      res,
      result.statusCode,
      result.message,
      result.data
    );
  }
};

const deleteSubject = async (req, res) => {
  const subjectId = req.params.subjectId;
  const result = await deleteSubjectService(subjectId);
  if (!result.status) {
    return sendErrorResponse(req, res, result.statusCode, result.message, []);
  } else {
    return sendSuccessResponse(
      req,
      res,
      result.statusCode,
      result.message,
      result.data
    );
  }
};

module.exports = { createSubject, getSubject, updateSubject, deleteSubject };
