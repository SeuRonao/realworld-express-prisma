import commentViewer from "./commentViewer";

describe("commentViewer", () => {
  test("Returns comment with author profile when no currentUser provided", () => {
    const mockAuthor = {
      username: "comment-author",
      email: "author@example.com",
      password: "hashed-password",
      bio: "I write comments",
      image: "https://example.com/author.jpg",
      followedBy: [],
    };

    const mockComment = {
      id: 1,
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-02T00:00:00Z"),
      body: "This is a great article!",
      author: mockAuthor,
      authorUsername: "comment-author",
      articleSlug: "test-article",
    };

    const result = commentViewer(mockComment as any);

    expect(result).toEqual({
      id: 1,
      createdAt: mockComment.createdAt,
      updatedAt: mockComment.updatedAt,
      body: "This is a great article!",
      author: {
        username: "comment-author",
        bio: "I write comments",
        image: "https://example.com/author.jpg",
        following: false,
      },
    });
  });

  test("Returns comment with author profile showing following=true when currentUser follows author", () => {
    const currentUser = {
      username: "current-user",
      email: "current@example.com",
      password: "hashed",
      bio: null,
      image: null,
    };

    const mockAuthor = {
      username: "comment-author",
      email: "author@example.com",
      password: "hashed-password",
      bio: "I write comments",
      image: "https://example.com/author.jpg",
      followedBy: [currentUser],
    };

    const mockComment = {
      id: 2,
      createdAt: new Date("2024-01-03T00:00:00Z"),
      updatedAt: new Date("2024-01-03T00:00:00Z"),
      body: "Thanks for sharing!",
      author: mockAuthor,
      authorUsername: "comment-author",
      articleSlug: "another-article",
    };

    const result = commentViewer(mockComment as any, currentUser as any);

    expect(result).toEqual({
      id: 2,
      createdAt: mockComment.createdAt,
      updatedAt: mockComment.updatedAt,
      body: "Thanks for sharing!",
      author: {
        username: "comment-author",
        bio: "I write comments",
        image: "https://example.com/author.jpg",
        following: true,
      },
    });
  });

  test("Returns comment with author profile showing following=false when currentUser does not follow author", () => {
    const currentUser = {
      username: "current-user",
      email: "current@example.com",
      password: "hashed",
      bio: null,
      image: null,
    };

    const otherUser = {
      username: "other-user",
      email: "other@example.com",
      password: "hashed",
      bio: null,
      image: null,
    };

    const mockAuthor = {
      username: "comment-author",
      email: "author@example.com",
      password: "hashed-password",
      bio: null,
      image: null,
      followedBy: [otherUser],
    };

    const mockComment = {
      id: 3,
      createdAt: new Date("2024-01-04T00:00:00Z"),
      updatedAt: new Date("2024-01-04T00:00:00Z"),
      body: "Interesting perspective",
      author: mockAuthor,
      authorUsername: "comment-author",
      articleSlug: "yet-another-article",
    };

    const result = commentViewer(mockComment as any, currentUser as any);

    expect(result).toEqual({
      id: 3,
      createdAt: mockComment.createdAt,
      updatedAt: mockComment.updatedAt,
      body: "Interesting perspective",
      author: {
        username: "comment-author",
        bio: null,
        image: null,
        following: false,
      },
    });
  });

  test("Handles comments with null bio and image for author", () => {
    const mockAuthor = {
      username: "minimal-author",
      email: "minimal@example.com",
      password: "hashed-password",
      bio: null,
      image: null,
      followedBy: [],
    };

    const mockComment = {
      id: 4,
      createdAt: new Date("2024-01-05T00:00:00Z"),
      updatedAt: new Date("2024-01-05T00:00:00Z"),
      body: "Short comment",
      author: mockAuthor,
      authorUsername: "minimal-author",
      articleSlug: "minimal-article",
    };

    const result = commentViewer(mockComment as any);

    expect(result).toEqual({
      id: 4,
      createdAt: mockComment.createdAt,
      updatedAt: mockComment.updatedAt,
      body: "Short comment",
      author: {
        username: "minimal-author",
        bio: null,
        image: null,
        following: false,
      },
    });
  });
});
