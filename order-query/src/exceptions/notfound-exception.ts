export class NotFoundException extends Error {
    message: string;
  
    constructor(message: string) {
      super(message);
      this.message = message;
      Object.setPrototypeOf(this, NotFoundException.prototype);
    }
  }