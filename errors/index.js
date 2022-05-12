class CustomError extends Error {}

class InvalidCredentials extends CustomError {
  constructor() {
    super();
    this.message = `Invalid credentials`;
    this.errorCode = 403;
  }
}
class Unauthorized extends CustomError {
  constructor() {
    super();
    this.message = `Unauthorized`;
    this.errorCode = 401;
  }
}
class Forbidden extends CustomError {
  constructor() {
    super();
    this.message = `Forbidden`;
    this.errorCode = 403;
  }
}

class HackerAttempt extends CustomError {
  constructor() {
    super();
    this.message = `Don't try this again`;
    this.errorCode = 451;
  }
}

class TokenExpired extends CustomError {
  constructor() {
    super();
    this.message = `Token expired, please log in again`;
    this.errorCode = 401;
  }
}

class MissingHeader extends CustomError {
  constructor() {
    super();
    this.message = `Content-Type header is missing`;
    this.errorCode = 400;
  }
}

class InvalidFile extends CustomError {
  constructor(message) {
    super();
    this.message = message;
    this.errorCode = 400;
  }
}

class FileExists extends CustomError {
  constructor(fileName) {
    super();
    this.message =
      fileName + " already exists. Please change the name and upload again";
    this.errorCode = 500;
  }
}

class TaskNotFound extends CustomError {
  constructor(id) {
    super();
    this.message = `Task with id ${id} not found`;
    this.errorCode = 404;
  }
}
class UserNotFound extends CustomError {
  constructor(id) {
    super();
    this.message = `User with id ${id} not found`;
    this.errorCode = 404;
  }
}

class MessageNotFound extends CustomError {
  constructor(id) {
    super();
    this.message = `Message with id ${id} not found`;
    this.errorCode = 404;
  }
}

class WrongRole extends CustomError {
  constructor(id, role) {
    super();
    this.message = `User with id ${id} is not ${role}`;
    this.errorCode = 400;
  }
}

module.exports = {
  CustomError,
  InvalidCredentials,
  Unauthorized,
  TokenExpired,
  TaskNotFound,
  MessageNotFound,
  Forbidden,
  MissingHeader,
  UserNotFound,
  InvalidFile,
  FileExists,
  HackerAttempt,
  WrongRole
};
