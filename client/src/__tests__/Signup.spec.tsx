import Signup from "../features/user/Signup";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { createUserWithEmailAndPassword } from "firebase/auth";

const setup = () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
};

describe("Signup tests", () => {
  it("should signup page render", () => {
    setup();
    expect(screen.getAllByText(/Signup/i)[0]).toBeInTheDocument();
  });

  it("should signup correctly", async () => {});
});
