const { CustomError } = require("../errors");

module.exports = {
  errorHandler(error, req, res, next) {
    if (error instanceof CustomError) {
      console.log("Error is an instance of custom error class");
      res.status(error.errorCode).json({ error: error.message });
    } else if (error instanceof SyntaxError) {
      res.status(400).json({ error: "Invalid JSON" });
    } else {
      console.error(error);
      res.status(500).json({
        error: "Something went wrong, please contact your system admin",
      });
    }
  },
};
