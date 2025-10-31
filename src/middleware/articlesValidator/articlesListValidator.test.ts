import { Response } from "express";
import { Request } from "express-jwt";
import articlesListValidator from "./articlesListValidator";

function mockResponse() {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return response;
}

describe("Test articlesListValidator", function () {
  test("Request with no query parameters", async function () {
    const mockReq = {
      query: {},
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Valid request with all query parameters", async function () {
    const mockReq = {
      query: {
        tag: "javascript",
        author: "john-doe",
        favorited: "jane-smith",
        limit: "10",
        offset: "5",
      },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Tag is not a string", async function () {
    const mockReq = {
      query: { tag: 123 },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.json).toHaveBeenCalled();
    const callArg = mockRes.json.mock.calls[0][0];
    expect(callArg.errors.query).toContain("tag must be a string");
  });

  test("Author is not a string", async function () {
    const mockReq = {
      query: { author: 123 },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.json).toHaveBeenCalled();
    const callArg = mockRes.json.mock.calls[0][0];
    expect(callArg.errors.query).toContain("author must be a string");
  });

  test("Favorited is not a string", async function () {
    const mockReq = {
      query: { favorited: 123 },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.json).toHaveBeenCalled();
    const callArg = mockRes.json.mock.calls[0][0];
    expect(callArg.errors.query).toContain("favorited must be a string");
  });

  test("Limit is not a string", async function () {
    const mockReq = {
      query: { limit: 10 },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
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
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
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
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
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
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.json).toHaveBeenCalled();
    const callArg = mockRes.json.mock.calls[0][0];
    expect(callArg.errors.query).toContain("offset is not a valid number");
  });

  test("Valid limit and offset as string numbers", async function () {
    const mockReq = {
      query: { limit: "15", offset: "10" },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Valid request with only tag filter", async function () {
    const mockReq = {
      query: { tag: "typescript" },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });

  test("Valid request with only author filter", async function () {
    const mockReq = {
      query: { author: "test-author" },
    } as unknown as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesListValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });
});
