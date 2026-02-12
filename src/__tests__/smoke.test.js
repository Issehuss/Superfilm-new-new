import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TermsPage from "../pages/Terms.jsx";
import { SuperFilmFooter } from "../pages/AboutPage.jsx";
import ErrorBoundary from "../components/ErrorBoundary";

describe("Smoke tests", () => {
  it("renders Terms page with heading and last updated text", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/terms"]}>
          <TermsPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole("heading", { name: /terms.*conditions/i })).toBeInTheDocument();
    expect(screen.getByText(/last updated:/i)).toBeInTheDocument();
  });

  it("renders footer links", () => {
    render(
      <MemoryRouter>
        <SuperFilmFooter />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /about us/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /terms/i })).toHaveAttribute("href", "/terms");
  });

  it("catches errors via ErrorBoundary", () => {
    const Boom = () => {
      throw new Error("boom");
    };
    render(
      <ErrorBoundary fallback={<div data-testid="fallback">fallback</div>}>
        <Boom />
      </ErrorBoundary>
    );
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
  });
});
