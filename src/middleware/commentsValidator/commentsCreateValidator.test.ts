import { Response } from "express";
import { Request } from "express-jwt";
import commentCreateValidator from "./commentCreateValidator";

// The mock response creation in order to reset mock calls
function mockResponse() {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return response;
}

describe("Test commentsCreateValidator", function () {
  test("Request formatted correctly", async function () {
    const mockReq = {
      body: { comment: { body: "Test comment body" } },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    commentCreateValidator(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });
  test("Request does not have comment property in body", async function () {
    const mockReq = {
      body: {},
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    commentCreateValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });
  test("Comment inside body of request is not an object", async function () {
    const mockReq = {
      body: { comment: "This should be an object instead" },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    commentCreateValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });
  test("There is no string property inside comment on the body", async function () {
    const mockReq = {
      body: { comment: {} },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    commentCreateValidator(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.status).toBeCalledWith(400);
  });
});
