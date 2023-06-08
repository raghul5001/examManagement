const Exam = require('../models/exam.model');
const { statusCodes } = require('../response/httpStatusCodes');
const { messages } = require('../response/customMesages');

const createExamService = async (params = {}) => {
  try {
    const newExam = await Exam.create({
      examName: params.name,
    });

    return {
      status: true,
      data: newExam,
      message: messages.success,
      statusCode: statusCodes.HTTP_OK,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
    };
  }
};

const listExamsService = async () => {
  try {
    const exams = await Exam.find();

    return {
      status: true,
      data: exams,
      message: messages.success,
      statusCode: statusCodes.HTTP_OK,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
    };
  }
};

const updateExamByIdService = async (examId, params = {}) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(examId, params, {
      new: true,
    });

    if (updatedExam) {
      return {
        status: true,
        data: updatedExam,
        message: messages.success,
        statusCode: statusCodes.HTTP_OK,
      };
    } else {
      return {
        status: false,
        message: messages.examNotFound,
        statusCode: statusCodes.HTTP_NOT_FOUND,
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
    };
  }
};

const deleteExamByIdService = async (examId) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(examId);

    if (deletedExam) {
      return {
        status: true,
        message: messages.success,
        statusCode: statusCodes.HTTP_OK,
      };
    } else {
      return {
        status: false,
        message: messages.examNotFound,
        statusCode: statusCodes.HTTP_NOT_FOUND,
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
    };
  }
};

module.exports = {
  createExamService,
  listExamsService,
  updateExamByIdService,
  deleteExamByIdService,
};
