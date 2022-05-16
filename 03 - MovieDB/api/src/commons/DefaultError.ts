export class DefaultError extends Error {
  status: number;

  constructor(status: number) {
    super();
    this.status = status;
  }

  getDefaultMessage(): string {
    switch (this.status) {
      case 401:
        return 'Api Key unauthorized';
      case 422:
        return 'Pagination exceeded limit';
      default:
        return 'Unknow error';
    }
  }
}
