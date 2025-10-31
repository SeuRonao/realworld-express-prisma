import articleViewer from "./articleViewer";

describe("articleViewer", () => {
  test("Returns article with favorited=false when no currentUser provided", () => {
    const mockAuthor = {
      username: "article-author",
      email: "author@example.com",
      password: "hashed-password",
      bio: "I write articles",
      image: "https://example.com/author.jpg",
      followedBy: [],
    };

    const mockArticle = {
      slug: "test-article-slug",
      title: "Test Article",
      description: "A test article description",
      body: "This is the article body content",
      tagList: [{ tagName: "javascript" }, { tagName: "testing" }],
      author: mockAuthor,
      authorUsername: "article-author",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-02T00:00:00Z"),
      _count: { favoritedBy: 5 },
    };

    const result = articleViewer(mockArticle as any);

    expect(result).toEqual({
      slug: "test-article-slug",
      title: "Test Article",
      description: "A test article description",
      body: "This is the article body content",
      tagList: ["javascript", "testing"],
      createdAt: mockArticle.createdAt,
      updatedAt: mockArticle.updatedAt,
      favorited: false,
      favoritesCount: 5,
      author: {
        username: "article-author",
        bio: "I write articles",
        image: "https://example.com/author.jpg",
        following: false,
      },
    });
  });

  test("Returns article with favorited=true when currentUser has favorited it", () => {
    const mockAuthor = {
      username: "article-author",
      email: "author@example.com",
      password: "hashed-password",
      bio: "I write articles",
      image: "https://example.com/author.jpg",
      followedBy: [],
    };

    const mockArticle = {
      slug: "favorited-article",
      title: "Favorited Article",
      description: "An article I like",
      body: "Great content here",
      tagList: [{ tagName: "react" }],
      author: mockAuthor,
      authorUsername: "article-author",
      createdAt: new Date("2024-01-03T00:00:00Z"),
      updatedAt: new Date("2024-01-03T00:00:00Z"),
      _count: { favoritedBy: 10 },
    };

    const currentUser = {
      username: "current-user",
      email: "current@example.com",
      password: "hashed",
      bio: null,
      image: null,
      favorites: [mockArticle],
    };

    const result = articleViewer(mockArticle as any, currentUser as any);

    expect(result).toEqual({
      slug: "favorited-article",
      title: "Favorited Article",
      description: "An article I like",
      body: "Great content here",
      tagList: ["react"],
      createdAt: mockArticle.createdAt,
      updatedAt: mockArticle.updatedAt,
      favorited: true,
      favoritesCount: 10,
      author: {
        username: "article-author",
        bio: "I write articles",
        image: "https://example.com/author.jpg",
        following: false,
      },
    });
  });

  test("Returns article with favorited=false when currentUser has not favorited it", () => {
    const mockAuthor = {
      username: "article-author",
      email: "author@example.com",
      password: "hashed-password",
      bio: null,
      image: null,
      followedBy: [],
    };

    const mockArticle = {
      slug: "not-favorited-article",
      title: "Not Favorited Article",
      description: "An article I haven't favorited",
      body: "Content here",
      tagList: [],
      author: mockAuthor,
      authorUsername: "article-author",
      createdAt: new Date("2024-01-04T00:00:00Z"),
      updatedAt: new Date("2024-01-04T00:00:00Z"),
      _count: { favoritedBy: 3 },
    };

    const otherArticle = {
      slug: "other-article",
      title: "Other",
      description: "Other",
      body: "Other",
      tagList: [],
      author: mockAuthor,
      authorUsername: "article-author",
      createdAt: new Date("2024-01-05T00:00:00Z"),
      updatedAt: new Date("2024-01-05T00:00:00Z"),
      _count: { favoritedBy: 0 },
    };

    const currentUser = {
      username: "current-user",
      email: "current@example.com",
      password: "hashed",
      bio: null,
      image: null,
      favorites: [otherArticle],
    };

    const result = articleViewer(mockArticle as any, currentUser as any);

    expect(result.favorited).toBe(false);
  });

  test("Transforms tagList to sorted array of tag names", () => {
    const mockAuthor = {
      username: "author",
      email: "author@example.com",
      password: "hashed",
      bio: null,
      image: null,
      followedBy: [],
    };

    const mockArticle = {
      slug: "tagged-article",
      title: "Tagged Article",
      description: "Article with tags",
      body: "Content",
      tagList: [{ tagName: "zulu" }, { tagName: "alpha" }, { tagName: "beta" }],
      author: mockAuthor,
      authorUsername: "author",
      createdAt: new Date("2024-01-06T00:00:00Z"),
      updatedAt: new Date("2024-01-06T00:00:00Z"),
      _count: { favoritedBy: 0 },
    };

    const result = articleViewer(mockArticle as any);

    expect(result.tagList).toEqual(["alpha", "beta", "zulu"]);
  });

  test("Returns article with following=true when currentUser follows author", () => {
    const currentUser = {
      username: "current-user",
      email: "current@example.com",
      password: "hashed",
      bio: null,
      image: null,
      favorites: [],
    };

    const mockAuthor = {
      username: "followed-author",
      email: "followed@example.com",
      password: "hashed-password",
      bio: "Popular author",
      image: "https://example.com/popular.jpg",
      followedBy: [currentUser],
    };

    const mockArticle = {
      slug: "followed-author-article",
      title: "Article by Followed Author",
      description: "Great content",
      body: "Amazing content",
      tagList: [],
      author: mockAuthor,
      authorUsername: "followed-author",
      createdAt: new Date("2024-01-07T00:00:00Z"),
      updatedAt: new Date("2024-01-07T00:00:00Z"),
      _count: { favoritedBy: 20 },
    };

    const result = articleViewer(mockArticle as any, currentUser as any);

    expect(result.author.following).toBe(true);
  });

  test("Handles empty tagList", () => {
    const mockAuthor = {
      username: "author",
      email: "author@example.com",
      password: "hashed",
      bio: null,
      image: null,
      followedBy: [],
    };

    const mockArticle = {
      slug: "no-tags-article",
      title: "No Tags Article",
      description: "Article without tags",
      body: "Content",
      tagList: [],
      author: mockAuthor,
      authorUsername: "author",
      createdAt: new Date("2024-01-08T00:00:00Z"),
      updatedAt: new Date("2024-01-08T00:00:00Z"),
      _count: { favoritedBy: 0 },
    };

    const result = articleViewer(mockArticle as any);

    expect(result.tagList).toEqual([]);
  });

  test("Includes correct favoritesCount from _count field", () => {
    const mockAuthor = {
      username: "author",
      email: "author@example.com",
      password: "hashed",
      bio: null,
      image: null,
      followedBy: [],
    };

    const mockArticle = {
      slug: "popular-article",
      title: "Popular Article",
      description: "Very popular",
      body: "Great content",
      tagList: [],
      author: mockAuthor,
      authorUsername: "author",
      createdAt: new Date("2024-01-09T00:00:00Z"),
      updatedAt: new Date("2024-01-09T00:00:00Z"),
      _count: { favoritedBy: 42 },
    };

    const result = articleViewer(mockArticle as any);

    expect(result.favoritesCount).toBe(42);
  });
});
