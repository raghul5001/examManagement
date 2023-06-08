const {
  registerUserService,
  loginUserService,
} = require("../services/registerservice");
const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");

const register = async (req, res) => {
  const params = req.body;
  const result = await registerUserService({ ...params });
  if (!result.status) {
    return sendErrorResponse(req, res, result.statusCodes, result.messages, []);
  } else {
    return sendSuccessResponse(req, res, result.statusCodes, result.messages, {
      id: result.data.id,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUserService({ email });
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      statusCodes.HTTP_NOT_FOUND,
      messages.dataNotFound,
      []
    );
  } else {
    let match = await bcrypt.compare(password, result.data.password);
    if (!match)
      return sendErrorResponse(req, res, 400, "password not match", []);
    const token = generateToken({ user, id: result?.data?._id });
    return sendSuccessResponse(req, res, result.statusCodes, result.messages, {
      token,
    });
  }
};

module.exports = { register, login };
