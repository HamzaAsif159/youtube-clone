const HttpStatus = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

class HttpException extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(HttpStatus.NOT_FOUND, message);
  }
}

module.exports = { BadRequestException, NotFoundException };
