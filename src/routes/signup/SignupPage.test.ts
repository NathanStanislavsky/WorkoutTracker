import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import SignupPage from "./+page.svelte";

describe("SignupPage", () => {
  it("renders signup form with all required inputs and submit button", () => {
    render(SignupPage);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("does not allow submission if one or more fields are empty", async () => {
    const user = userEvent.setup();
    render(SignupPage);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const weightInput = screen.getByLabelText(/weight/i);
    const ageInput = screen.getByLabelText(/age/i);
    const signUpButton = screen.getByRole("button", { name: /sign up/i });

    await user.click(signUpButton);

    expect(usernameInput).toBeInvalid();
    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
    expect(weightInput).toBeInvalid();
    expect(ageInput).toBeInvalid();
  });
});
