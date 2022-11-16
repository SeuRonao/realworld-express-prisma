import { Response } from "express";
import { Request } from "express-jwt";
import createComment from "./createComment";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import commentCreatePrisma from "../../utils/db/comment/commentCreatePrisma";
import commentViewer from "../../view/commentViewer";

jest.mock("../../utils/db/user/userGetPrisma");
jest.mock("../../utils/db/comment/commentCreatePrisma");
jest.mock("../../view/commentViewer");

const mockedUserGetPrisma = jest.mocked(userGetPrisma);
const mockedCommentCreatePrisma = jest.mocked(commentCreatePrisma);
const mockedCommentViewer = jest.mocked(commentViewer);

const mockRes = {
  status: jest.fn().mockReturnThis(),
  sendStatus: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

const next = jest.fn();

const mockUser = {
  username: "test-user-username",
  bio: null,
  email: "test-user@email.com",
  image: null,
  password: "test-user-password",
  follows: [],
  followedBy: [],
  authored: [],
  favorites: [],
};
const mockComment = {
  articleSlug: "test-slug",
  authorUsername: "test-user-username",
  body: "test-comment-body",
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1,
  author: mockUser,
};

const mockView = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  body: "test-comment-body",
  author: { ...mockUser, following: false },
};

describe("Create Comment Controller", function () {
  test("Success path", async function () {
    const mockReq = {
      params: {
        slug: "test-slug",
      },
      body: {
        comment: { body: "Test comment" },
      },
      auth: {
        user: {
          username: "test-user",
        },
      },
    } as unknown as Request;
    mockedUserGetPrisma.mockResolvedValueOnce(mockUser);
    mockedCommentCreatePrisma.mockResolvedValueOnce(mockComment);
    mockedCommentViewer.mockReturnValue(mockView);
    await createComment(mockReq, mockRes as unknown as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(mockRes.sendStatus).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalled();
  });
  test("User does not exist path", async function () {
    const mockReq = {
      params: {
        slug: "test-slug",
      },
      body: {
        comment: { body: "Test comment" },
      },
      auth: {
        user: { username: "test-user" },
      },
    } as unknown as Request;
    mockedUserGetPrisma.mockResolvedValueOnce(null);
    await createComment(mockReq, mockRes as unknown as Response, next);
    expect(mockRes.sendStatus).toHaveBeenCalledWith(401);
  });
  test("Comment cannot be created", async function () {
    const mockReq = {
      params: {
        slug: "test-slug",
      },
      body: {
        comment: { body: "Test comment" },
      },
      auth: {
        user: { username: "test-user" },
      },
    } as unknown as Request;
    mockedUserGetPrisma.mockResolvedValueOnce(mockUser);
    mockedCommentCreatePrisma.mockRejectedValueOnce(Error("teste"));
    await createComment(mockReq, mockRes as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });
});
