import profileViewer from "./profileViewer";

describe("profileViewer", () => {
  test("Returns profile with following=false when no currentUser provided", () => {
    const mockUser = {
      username: "john-doe",
      bio: "Software developer",
      image: "https://example.com/avatar.jpg",
      email: "john@example.com",
      password: "hashed-password",
      followedBy: [],
    };

    const result = profileViewer(mockUser as any);

    expect(result).toEqual({
      username: "john-doe",
      bio: "Software developer",
      image: "https://example.com/avatar.jpg",
      following: false,
    });
  });

  test("Returns profile with following=true when currentUser is following", () => {
    const currentUser = {
      username: "jane-smith",
      email: "jane@example.com",
      password: "hashed-password",
      bio: null,
      image: null,
    };

    const mockUser = {
      username: "john-doe",
      bio: "Software developer",
      image: "https://example.com/avatar.jpg",
      email: "john@example.com",
      password: "hashed-password",
      followedBy: [currentUser],
    };

    const result = profileViewer(mockUser as any, currentUser as any);

    expect(result).toEqual({
      username: "john-doe",
      bio: "Software developer",
      image: "https://example.com/avatar.jpg",
      following: true,
    });
  });

  test("Returns profile with following=false when currentUser is not following", () => {
    const currentUser = {
      username: "jane-smith",
      email: "jane@example.com",
      password: "hashed-password",
      bio: null,
      image: null,
    };

    const otherUser = {
      username: "other-user",
      email: "other@example.com",
      password: "hashed-password",
      bio: null,
      image: null,
    };

    const mockUser = {
      username: "john-doe",
      bio: "Software developer",
      image: "https://example.com/avatar.jpg",
      email: "john@example.com",
      password: "hashed-password",
      followedBy: [otherUser],
    };

    const result = profileViewer(mockUser as any, currentUser as any);

    expect(result).toEqual({
      username: "john-doe",
      bio: "Software developer",
      image: "https://example.com/avatar.jpg",
      following: false,
    });
  });

  test("Handles null bio and image fields correctly", () => {
    const mockUser = {
      username: "john-doe",
      bio: null,
      image: null,
      email: "john@example.com",
      password: "hashed-password",
      followedBy: [],
    };

    const result = profileViewer(mockUser as any);

    expect(result).toEqual({
      username: "john-doe",
      bio: null,
      image: null,
      following: false,
    });
  });
});
