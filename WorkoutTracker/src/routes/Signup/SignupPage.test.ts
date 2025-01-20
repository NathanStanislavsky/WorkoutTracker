import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/svelte";
import SignupPage from "./+page.svelte";

describe("SignupPage", () => {
  it("renders signup form with all required inputs and submit button", () => {
    render(SignupPage);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });
});
