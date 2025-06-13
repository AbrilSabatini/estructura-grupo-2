class DatabaseError extends Error {
  constructor(error, message = "Database operation failed.") {
    let finalMessage;
    let statusCode = 500;

    switch (error.code) {
      case "ER_BAD_DB_ERROR":
        finalMessage = "Database not found.";
        break;
      case "ER_NO_SUCH_TABLE":
        finalMessage = "Table not found in the database.";
        break;
      case "ER_DUP_ENTRY":
        finalMessage = "Duplicate entry error. A record already exists with that value.";
        statusCode = 409;
        break;
      case "ECONNREFUSED":
      case "PROTOCOL_CONNECTION_LOST":
      case "ER_ACCESS_DENIED_ERROR":
      case "ENOTFOUND":
        finalMessage = "Database operation failed.";
        statusCode = 503;
        break;
      default:
        finalMessage = message;
    }

    super(finalMessage);

    this.name = "DatabaseError";
    this.code = error.code;
    this.statusCode = statusCode;
    this.originalError = error;
  }
}

module.exports = DatabaseError;
