const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const controller = require('./book.controller');

describe.only('Books controller', () => {
  describe('When getting a list of books', () => {
    it('Should return ok', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      return controller.list(req, res).then(() => {
        return expect(res._getData().length).to.eql(4);
      });
    });
  });

  describe('When creating a book', () => {
    it('Should add the book to the database', () => {
      const book = {
        title: 'Test Book',
        author: 'John Q Public',
        publicationDate: '2018-01-01',
        isbn: '1234567890'
      };
      const req = httpMocks.createRequest({
        body: book
      });

      const res = httpMocks.createResponse();

      return controller.create(req, res).then(() => {
        return expect(res._getData().dataValues.title).to.eql(book.title);
      });
    });
  });
});