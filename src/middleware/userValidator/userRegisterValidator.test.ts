import { Response } from "express";
import { Request } from "express-jwt";
import userRegisterValidator from "./userRegisterValidator";

function mockResponse() {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return response;
}

describe("Test userRegisterValidator", function () {
  test("Request formatted correctly with all required fields", async function () {
    const mockReq = {
      body: {
        user: {
          email: "test@example.com",
          password: "password123",
          username: "testuser",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Request does not have body", async function () {
    const mockReq = {} as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: { body: ["can't be empty"] },
    });
  });

  test("Request body does not have user property", async function () {
    const mockReq = {
      body: {},
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: { body: ["user object must be defined"] },
    });
  });

  test("User object missing password", async function () {
    const mockReq = {
      body: { user: { email: "test@example.com", username: "testuser" } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("User object missing email", async function () {
    const mockReq = {
      body: { user: { password: "password123", username: "testuser" } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("User object missing username", async function () {
    const mockReq = {
      body: { user: { email: "test@example.com", password: "password123" } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Password is not a string", async function () {
    const mockReq = {
      body: {
        user: {
          email: "test@example.com",
          password: 12345,
          username: "testuser",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Email is not a string", async function () {
    const mockReq = {
      body: {
        user: { email: 12345, password: "password123", username: "testuser" },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Username is not a string", async function () {
    const mockReq = {
      body: {
        user: {
          email: "test@example.com",
          password: "password123",
          username: 12345,
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Multiple fields have wrong types", async function () {
    const mockReq = {
      body: {
        user: { email: 12345, password: 67890, username: true },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userRegisterValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });
});
