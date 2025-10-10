import { Response } from "express";
import { Request } from "express-jwt";
import articlesCreateValidator from "./articlesCreateValidator";

function mockResponse() {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return response;
}

describe("Test articlesCreateValidator", function () {
  test("Request formatted correctly with all required fields", async function () {
    const mockReq = {
      body: {
        article: {
          title: "Test Article",
          description: "Test description",
          body: "Test body content",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(next).toHaveBeenCalled();
  });

  test("Request does not have body", async function () {
    const mockReq = {} as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: { body: ["can't be empty"] },
    });
  });

  test("Request body does not have article property", async function () {
    const mockReq = {
      body: {},
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Article is not an object", async function () {
    const mockReq = {
      body: { article: "not an object" },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Missing title field", async function () {
    const mockReq = {
      body: {
        article: {
          description: "Test description",
          body: "Test body content",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Missing description field", async function () {
    const mockReq = {
      body: {
        article: {
          title: "Test Article",
          body: "Test body content",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Missing body field", async function () {
    const mockReq = {
      body: {
        article: {
          title: "Test Article",
          description: "Test description",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Title is empty string", async function () {
    const mockReq = {
      body: {
        article: {
          title: "",
          description: "Test description",
          body: "Test body content",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Title is not a string", async function () {
    const mockReq = {
      body: {
        article: {
          title: 12345,
          description: "Test description",
          body: "Test body content",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Valid request with tagList", async function () {
    const mockReq = {
      body: {
        article: {
          title: "Test Article",
          description: "Test description",
          body: "Test body content",
          tagList: ["javascript", "testing"],
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(next).toHaveBeenCalled();
  });

  test("tagList is not an array", async function () {
    const mockReq = {
      body: {
        article: {
          title: "Test Article",
          description: "Test description",
          body: "Test body content",
          tagList: "not an array",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("tagList contains non-string elements", async function () {
    const mockReq = {
      body: {
        article: {
          title: "Test Article",
          description: "Test description",
          body: "Test body content",
          tagList: ["javascript", 123, "testing"],
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("tagList contains empty strings", async function () {
    const mockReq = {
      body: {
        article: {
          title: "Test Article",
          description: "Test description",
          body: "Test body content",
          tagList: ["javascript", "", "testing"],
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesCreateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });
});
