import { hash } from 'bcrypt';
import { describe, it, expect } from 'vitest';

import {
  comparePassword,
  generateId,
  getTokenFromHeader,
  signToken,
} from './utility';

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

describe('signToken()', () => {
  it('returns a string', async () => {
    // Arrange
    const username = 'john_doe';

    //Act
    const token = await signToken(username);

    // Assert
    expect(token).toBeTypeOf('string');
  });
});

describe('comparePassword()', async () => {
  it('returns true if plainTextPassword and hashedPassword are the same', async () => {
    // Arrange
    const plainTextPassword = 'testPassword';
    const saltRounds = 10;

    //Act
    const hashedPassword = await hash(plainTextPassword, saltRounds);

    const isValid = await comparePassword(plainTextPassword, hashedPassword);

    // Assert
    expect(isValid).toBeTruthy();
  });
});

describe('generateId()', () => {
  it('returns a string with 10 characters', async () => {
    //Act
    const token = generateId();

    // Assert
    expect(token).toBeTypeOf('string').toHaveLength(10);
  });
});
