import { DefaultError } from './DefaultError';

describe('DefaultError', () => {
  it('should return correct message for each status', () => {
    let error = new DefaultError(401);
    expect(error.getDefaultMessage()).toEqual('Api Key unauthorized');

    error = new DefaultError(422);
    expect(error.getDefaultMessage()).toEqual('Pagination exceeded limit');
  });
});
