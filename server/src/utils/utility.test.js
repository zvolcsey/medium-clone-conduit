import { getTokenFromHeader } from './utility';

describe('getTokenFromHeader()', () => {
  it('returns the testToken string without the Token keyword', () => {
    // Arrange
    const tokenFromHeader = 'Token testToken';

    //Act

    const token = getTokenFromHeader(tokenFromHeader);

    // Assert
    expect(token).toBe(tokenFromHeader.split(' ')[1]);
  });
  it('returns null if Token keyword is missing', () => {
    // Arrange
    const tokenFromHeader = 'testToken';

    //Act
    const token = getTokenFromHeader(tokenFromHeader);
    // Assert
    expect(token).toBeNull();
  });
});
