import { Response } from "express";
import { Request } from "express-jwt";
import commentCreateValidator from "./commentCreateValidator";

function notImplementedYet() {
  throw new Error("Not implemented yet");
}

describe("Test commentsCreateValidator", function () {
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(() => mockRes),
  } as unknown as Response;
  const next = jest.fn();
  test("Request formatted correctly", function () {
    const mockReq = {
      body: { comment: { body: "Test comment body" } },
    } as Request;
    commentCreateValidator(mockReq, mockRes as unknown as Response, next);
  });
  test("Request does not have comment property in body", notImplementedYet);
  test("Comment inside body of request is not an object", notImplementedYet);
  test(
    "There is no string property inside comment on the body",
    notImplementedYet
  );
});
