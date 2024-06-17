import { UUID } from '../uuid';
import { InvalidArgumentException } from '../exceptions/invalid-argument.exception';

const VALID_UUID = '90066c08-3de3-49bc-bbc3-9c1cbf4369ad';

describe('UUID vo', () => {
  it('should throw if creating with invalid uuid', () => {
    expect(() => UUID.createFromExisting('wrong id')).toThrow(
      InvalidArgumentException,
    );
  });

  it('should create with valid uuid', () => {
    const uuid = UUID.createFromExisting(VALID_UUID);
    expect(uuid.toString()).toEqual(VALID_UUID);
  });

  it('should correctly validate uuid', () => {
    expect(UUID.isValidId(VALID_UUID)).toEqual(true);
    expect(UUID.isValidId('wrong')).toEqual(false);
  });

  it('should create correctly create new uuid', () => {
    const uuid = UUID.createNew();
    expect(UUID.isValidId(uuid.toString())).toEqual(true);
  });
});
