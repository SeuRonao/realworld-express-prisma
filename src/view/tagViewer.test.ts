import tagViewer from "./tagViewer";

describe("tagViewer", () => {
  test("Returns tag name when provided valid tag object", () => {
    const mockTag = {
      tagName: "javascript",
    };

    const result = tagViewer(mockTag as any);

    expect(result).toBe("javascript");
  });

  test("Returns tag name for different tags", () => {
    const tags = [
      { tagName: "typescript" },
      { tagName: "react" },
      { tagName: "nodejs" },
      { tagName: "testing" },
    ];

    tags.forEach((tag) => {
      const result = tagViewer(tag as any);
      expect(result).toBe(tag.tagName);
    });
  });

  test("Handles tags with special characters", () => {
    const mockTag = {
      tagName: "c++",
    };

    const result = tagViewer(mockTag as any);

    expect(result).toBe("c++");
  });

  test("Handles tags with spaces", () => {
    const mockTag = {
      tagName: "machine learning",
    };

    const result = tagViewer(mockTag as any);

    expect(result).toBe("machine learning");
  });
});
