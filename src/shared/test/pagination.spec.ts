import { Pagination } from '../pagination';

describe('Pagination', () => {
  describe('given there is 35 items in total', () => {
    const total = 35;
    describe('and requested for first page with 20 items', () => {
      let pagination: Pagination;
      beforeEach(() => {
        pagination = new Pagination({ page: 1, perPage: 20 });
      });
      describe('when checking pagination status', () => {
        it('should return 0 offset', () => {
          expect(pagination.offset).toEqual(0);
        });
        it('should return there is 2 pages', () => {
          expect(pagination.getTotalPages(total)).toEqual(2);
        });
        it('should return there are more pages', () => {
          expect(pagination.hasMore(total)).toEqual(true);
        });
      });
    });

    describe('and requested for second page with 20 items', () => {
      let pagination: Pagination;
      beforeEach(() => {
        pagination = new Pagination({ page: 2, perPage: 20 });
      });
      describe('when checking pagination status', () => {
        it('should return 0 offset', () => {
          expect(pagination.offset).toEqual(20);
        });
        it('should return there is 2 pages', () => {
          expect(pagination.getTotalPages(total)).toEqual(2);
        });
        it("should return there isn't more pages", () => {
          expect(pagination.hasMore(total)).toEqual(false);
        });
      });
    });
  });
});
