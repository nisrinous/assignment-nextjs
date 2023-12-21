import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Hero from "../components/hero";
import Dashboard from "../pages/news/index";

jest.mock("axios", () => ({
  get: jest.fn().mockResolvedValue({ data: [] }),
}));

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Hero", () => {
  it("renders a heading", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

describe("Dashboard Component", () => {
  beforeEach(() => {
    useSWR.mockReturnValue({
      data: [
        {
          id: 1,
          title: "Mock News",
          desc: "Mock description",
          image: "mock-image-url",
          isPremium: false,
          like: 10,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-01-01T00:00:00Z",
          category: "world",
          share: 5,
          likers: [],
        },
      ],
    });
  });

  it("renders the Dashboard component", async () => {
    render(<Dashboard />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Search news...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId("trending-card")).toHaveLength(5);

      expect(screen.getByText("Latest News")).toBeInTheDocument();
      expect(screen.getByText("Premium")).toBeInTheDocument();

      expect(screen.getByText("World")).toBeInTheDocument();
      expect(screen.getByText("Entertainment")).toBeInTheDocument();
      expect(screen.getByText("Music")).toBeInTheDocument();
    });
  });

  it("filters news based on search query", async () => {
    render(<Dashboard />);
    const searchInput = screen.getByPlaceholderText("Search news...");
    fireEvent.change(searchInput, { target: { value: "Mock" } });

    await waitFor(() => {
      expect(screen.getAllByTestId("news-card")).toHaveLength(1);
    });
  });
});
