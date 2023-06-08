const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  createExamService,
   listExamsService,
  updateExamService,
  deleteExamService,
  getExamsService
} = require("../services/examservice");

const createExam = async (req, res) => {
  const params = req.body;
  const result = await createExamService({ ...params });
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


const getExams = async (req, res) => {
  const result = await listExamsService();
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

const updateExam = async (req, res) => {
  const examId = req.params.examId;
  const params = req.body;
  const result = await updateExamService(examId, params);
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

const deleteExam = async (req, res) => {
  const examId = req.params.examId;
  const result = await deleteExamService(examId);
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

module.exports = { createExam, getExam, getExams, updateExam, deleteExam };
