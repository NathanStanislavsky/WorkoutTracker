import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import SigninPage from "./+page.svelte";

describe("Signin Page", () => {
    it("renders signin form with all required inputs and submit button", () => {
      render(SigninPage);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toBeInTheDocument();
    });
  });