import { Response } from "express";
import { Request } from "express-jwt";
import articlesFeedValidator from "./articlesFeedValidator";

function mockResponse() {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return response;
}

describe("Test articlesFeedValidator", function () {
  test("Request with no query parameters", async function () {
    const mockReq = {
      query: {},
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesFeedValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Valid limit as string number", async function () {
    const mockReq = {
      query: { limit: "10" },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesFeedValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Valid offset as string number", async function () {
    const mockReq = {
      query: { offset: "20" },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesFeedValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Valid limit and offset", async function () {
    const mockReq = {
      query: { limit: "10", offset: "5" },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesFeedValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Limit is not a string", async function () {
    const mockReq = {
      query: { limit: 10 },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesFeedValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.json).toHaveBeenCalled();
    const callArg = mockRes.json.mock.calls[0][0];
    expect(callArg.errors.query).toContain("limit must be a string");
  });

  test("Offset is not a string", async function () {
    const mockReq = {
      query: { offset: 20 },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesFeedValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.json).toHaveBeenCalled();
    const callArg = mockRes.json.mock.calls[0][0];
    expect(callArg.errors.query).toContain("offset must be a string");
  });

  test("Limit is not a valid number", async function () {
    const mockReq = {
      query: { limit: "abc" },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesFeedValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.json).toHaveBeenCalled();
    const callArg = mockRes.json.mock.calls[0][0];
    expect(callArg.errors.query).toContain("limit is not a valid number");
  });

  test("Offset is not a valid number", async function () {
    const mockReq = {
      query: { offset: "xyz" },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesFeedValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.json).toHaveBeenCalled();
    const callArg = mockRes.json.mock.calls[0][0];
    expect(callArg.errors.query).toContain("offset is not a valid number");
  });
});
