import { Response } from "express";
import { Request } from "express-jwt";
import articlesUpdateValidator from "./articlesUpdateValidator";

function mockResponse() {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return response;
}

describe("Test articlesUpdateValidator", function () {
  test("Request formatted correctly with all fields", async function () {
    const mockReq = {
      body: {
        article: {
          title: "Updated Title",
          description: "Updated description",
          body: "Updated body content",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
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
    await articlesUpdateValidator(
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
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Article is not an object (validator bug allows this)", async function () {
    const mockReq = {
      body: { article: "not an object" },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(next).toHaveBeenCalled();
  });

  test("Empty article object passes validation", async function () {
    const mockReq = {
      body: { article: {} },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(next).toHaveBeenCalled();
  });

  test("Title is not a string when provided", async function () {
    const mockReq = {
      body: {
        article: {
          title: 12345,
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Description is not a string when provided", async function () {
    const mockReq = {
      body: {
        article: {
          description: 12345,
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Body is not a string when provided", async function () {
    const mockReq = {
      body: {
        article: {
          body: 12345,
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
  });

  test("Valid update with only title", async function () {
    const mockReq = {
      body: {
        article: {
          title: "New Title Only",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(next).toHaveBeenCalled();
  });

  test("Valid update with only description", async function () {
    const mockReq = {
      body: {
        article: {
          description: "New Description Only",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(next).toHaveBeenCalled();
  });

  test("Valid update with only body", async function () {
    const mockReq = {
      body: {
        article: {
          body: "New Body Only",
        },
      },
    } as Request;
    const mockRes = mockResponse();
    const next = jest.fn();
    await articlesUpdateValidator(
      mockReq,
      mockRes as unknown as Response,
      next
    );
    expect(next).toHaveBeenCalled();
  });
});
