const Class = require('../models/class.model');
const { statusCodes } = require('../response/httpStatusCodes');
const { messages, customMessages } = require('../response/customMesages');

const createClassService = async (params = {}) => {
  try {
    const newClass = await Class.create({
      examName: params.name,
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

module.exports = { createClassService };