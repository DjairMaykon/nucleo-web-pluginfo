export class DefaultError extends Error {
  status: 401 | 422;

  constructor(status: 401 | 422) {
    super();
    this.status = status;
  }

  getDefaultMessage(): string {
    switch (this.status) {
      case 401:
        return 'Api Key unauthorized';
      case 422:
        return 'Pagination exceeded limit';
    }
  }
}
