const Subject = require('../models/subject.model');
const { statusCodes } = require('../response/httpStatusCodes');
const { messages, customMessages } = require('../response/customMesages');
const Class = require("../models/class.model");
const Exam = require("../models/exam.model");
const createSubjectService = async (params = {}) => {
  try {
    const newClass = await Subject.create({
      subjectName: params.name,
    });

    return {
      status: true,
      data: newClass,
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

const deleteSubjectService = async (params = {}) => {
    try {
      const { subjectId } = params;
  
      const deletedSubject = await Subject.findByIdAndDelete(subjectId);
  
      if (deletedSubject) {
        return {
          status: true,
          message: messages.success,
          statusCode: statusCodes.HTTP_OK,
        };
      } else {
        return {
          status: false,
          message: messages.subjectNotFound,
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
  
  const listSubjectsService = async () => {
    try {
      const subjects = await Subject.findall();
  
      return {
        status: true,
        data: subjects,
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

  const updateSubjectByIdService = async (subjectId, params = {}) => {
    try {
      const updatedSubject = await Subject.findByIdAndUpdate(subjectId, params, {new: true});
  
      if (updatedSubject) {
        return {
          status: true,
          data: updatedSubject,
          message: messages.success,
          statusCode: statusCodes.HTTP_OK,
        };
      } else {
        return {
          status: false,
          message: messages.subjectNotFound,
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
  

const mapClassToSubjectService = async (classId, subjectId) => {
    try {
      const classExists = await Class.findById(classId);
      const subjectExists = await Subject.findById(subjectId);
  
      if (!classExists || !subjectExists) {
        return {
          status: false,
          statusCode: statusCodes.NOT_FOUND,
          message: messages.NOT_FOUND,
          data: null,
        };
      }
      if (classExists.subject) {
        return {
          status: false,
          statusCode: statusCodes.BAD_REQUEST,
          message: messages.CLASS_ALREADY_MAPPED,
          data: null,
        };
      }
      classExists.subject = subjectId;
      await classExists.save();
      return {
        status: true,
        statusCode: statusCodes.SUCCESS,
        message: messages.MAPPING_SUCCESSFUL,
        data: null,
      };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        statusCode: statusCodes.INTERNAL_SERVER_ERROR,
        message: messages.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  };
  
  

const mapClassSubjectExamService = async (classId, subjectId, examId) => {
    try {
      const classExists = await Class.findById(classId);
      const subjectExists = await Subject.findById(subjectId);
      const examExists = await Exam.findById(examId);
  
      if (!classExists || !subjectExists || !examExists) {
        return {
          status: false,
          statusCode: statusCodes.NOT_FOUND,
          message: messages.NOT_FOUND,
          data: null,
        };
      }
      if (classExists.subject || subjectExists.class) {
        return {
          status: false,
          statusCode: statusCodes.BAD_REQUEST,
          message: messages.CLASS_SUBJECT_ALREADY_MAPPED,
          data: null,
        };
      }
      classExists.subject = subjectId;
      await classExists.save();
      subjectExists.class = classId;
      subjectExists.exam = examId;
      await subjectExists.save();
      return {
        status: true,
        statusCode: statusCodes.SUCCESS,
        message: messages.MAPPING_SUCCESSFUL,
        data: null,
      };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        statusCode: statusCodes.INTERNAL_SERVER_ERROR,
        message: messages.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  };
  

    

  
  
  module.exports = {

    mapClassSubjectExamService,
    createSubjectService,
    deleteSubjectService,
    listSubjectsService,
    updateSubjectByIdService,
    mapClassToSubjectService,
    mapClassSubjectExamService
  };

