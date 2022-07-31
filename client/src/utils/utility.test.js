import { createRequestHeaders } from './utility';

describe('createRequestHeaders()', () => {
  it('returns request headers object without authorization property', () => {
    // Arrange
    const token = null;
    // Act
    const headers = createRequestHeaders(token);
    // Assert
    expect(headers).not.toHaveProperty('Authorization');
  });
  it('returns request headers object with authorization property', () => {
    // Arrange
    const token = 'someToken';
    // Act
    const headers = createRequestHeaders(token);
    // Assert
    expect(headers).toHaveProperty('Authorization');
  });
});
