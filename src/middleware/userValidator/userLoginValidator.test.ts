import { Response } from "express";
import { Request } from "express-jwt";
import userLoginValidator from "./userLoginValidator";

function mockResponse() {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return response;
}

describe("Test userLoginValidator", function () {
  test("Request formatted correctly with valid email and password", async function () {
    const mockReq = {
      body: { user: { email: "test@example.com", password: "password123" } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userLoginValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Request does not have body", async function () {
    const mockReq = {} as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userLoginValidator(mockReq, mockRes as unknown as Response, next);
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
    await userLoginValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: { body: ["user object must be defined"] },
    });
  });

  test("User object does not have password property", async function () {
    const mockReq = {
      body: { user: { email: "test@example.com" } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userLoginValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("User object does not have email property", async function () {
    const mockReq = {
      body: { user: { password: "password123" } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userLoginValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Password is not a string", async function () {
    const mockReq = {
      body: { user: { email: "test@example.com", password: 12345 } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userLoginValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Email is not a string", async function () {
    const mockReq = {
      body: { user: { email: 12345, password: "password123" } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userLoginValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Both email and password have wrong types", async function () {
    const mockReq = {
      body: { user: { email: 12345, password: 67890 } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userLoginValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });
});
