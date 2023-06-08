const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
    createClassService
} = require("../services/classservice");

const {mapClassToSubjectService}=require('../services/subjectservice')

const createClass = async (req, res) => {
  const params = req.body;
  const result = await createClassService({ ...params });
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

const mapClassToSubject = async (req, res) => {
    const { classId, subjectId } = req.body;
    const result = await mapClassToSubjectService(classId, subjectId);
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

  const mapClassToSubjectExam = async (req, res) => {
    const { classId, subjectId ,examId } = req.body;
    const result = await mapClassToSubjectService(classId, subjectId ,examId);
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
module.exports = { createClass ,mapClassToSubject,mapClassToSubjectExam}