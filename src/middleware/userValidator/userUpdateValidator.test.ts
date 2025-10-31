import { Response } from "express";
import { Request } from "express-jwt";
import userUpdateValidator from "./userUpdateValidator";

function mockResponse() {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return response;
}

describe("Test userUpdateValidator", function () {
  test("Request formatted correctly with optional fields", async function () {
    const mockReq = {
      body: {
        user: {
          email: "newemail@example.com",
          bio: "New bio",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userUpdateValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Request does not have body", async function () {
    const mockReq = {} as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userUpdateValidator(mockReq, mockRes as unknown as Response, next);
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
    await userUpdateValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: { body: ["user property must exist"] },
    });
  });

  test("User property is not an object", async function () {
    const mockReq = {
      body: { user: "not an object" },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userUpdateValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: { body: ["user must be an object"] },
    });
  });

  test("Empty user object passes validation", async function () {
    const mockReq = {
      body: { user: {} },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userUpdateValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("User contains unaccepted fields", async function () {
    const mockReq = {
      body: {
        user: {
          email: "test@example.com",
          invalidField: "should not be here",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userUpdateValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Valid update with all optional fields", async function () {
    const mockReq = {
      body: {
        user: {
          email: "updated@example.com",
          username: "newusername",
          password: "newpassword",
          image: "https://example.com/image.jpg",
          bio: "Updated bio",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userUpdateValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Valid update with single field", async function () {
    const mockReq = {
      body: {
        user: {
          bio: "Just updating my bio",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await userUpdateValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });
});
