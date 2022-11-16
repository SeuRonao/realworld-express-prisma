import { Response } from "express";
import { Request } from "express-jwt";
import commentCreateValidator from "./commentCreateValidator";

describe("Test commentsCreateValidator", function () {
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(() => mockRes),
  } as unknown as Response;
  const next = jest.fn();

  test("Request formatted correctly", async function () {
    const mockReq = {
      body: { comment: { body: "Test comment body" } },
    } as Request;
    commentCreateValidator(mockReq, mockRes, next);
    expect(next).toHaveBeenCalled();
  });
  test("Request does not have comment property in body", async function () {
    const mockReq = {
      body: {},
    } as Request;
    commentCreateValidator(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(400);
  });
  test("Comment inside body of request is not an object", async function () {
    const mockReq = {
      body: { comment: "This should be an object instead" },
    } as Request;
    commentCreateValidator(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(400);
  });
  test("There is no string property inside comment on the body", async function () {
    const mockReq = {
      body: { comment: {} },
    } as Request;
    commentCreateValidator(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(400);
  });
});
