import userViewer from "./userViewer";

describe("userViewer", () => {
  test("Returns user object with token when provided valid user and token", () => {
    const mockUser = {
      email: "john@example.com",
      username: "john-doe",
      password: "hashed-password",
      bio: "Software developer",
      image: "https://example.com/avatar.jpg",
    };

    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.token";

    const result = userViewer(mockUser as any, mockToken);

    expect(result).toEqual({
      user: {
        email: "john@example.com",
        username: "john-doe",
        token: mockToken,
        bio: "Software developer",
        image: "https://example.com/avatar.jpg",
      },
    });
  });

  test("Handles null bio and image fields correctly", () => {
    const mockUser = {
      email: "jane@example.com",
      username: "jane-smith",
      password: "hashed-password",
      bio: null,
      image: null,
    };

    const mockToken = "test-token-123";

    const result = userViewer(mockUser as any, mockToken);

    expect(result).toEqual({
      user: {
        email: "jane@example.com",
        username: "jane-smith",
        token: mockToken,
        bio: null,
        image: null,
      },
    });
  });

  test("Includes token in response", () => {
    const mockUser = {
      email: "test@test.com",
      username: "tester",
      password: "hashed",
      bio: "Test bio",
      image: "test.jpg",
    };

    const mockToken = "unique-jwt-token-abc123";

    const result = userViewer(mockUser as any, mockToken);

    expect(result.user.token).toBe(mockToken);
  });

  test("Does not include password in response", () => {
    const mockUser = {
      email: "secure@example.com",
      username: "secure-user",
      password: "should-not-be-exposed",
      bio: "Security conscious",
      image: null,
    };

    const mockToken = "secure-token";

    const result = userViewer(mockUser as any, mockToken);

    expect(result.user).not.toHaveProperty("password");
  });
});
