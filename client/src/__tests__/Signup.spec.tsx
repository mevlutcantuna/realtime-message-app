import Signup from "../features/user/Signup";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock('firebase/auth',() => {

})

const setup = () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
};

describe("Signup tests", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("should signup page render", () => {
    setup();
    expect(screen.getAllByText(/Signup/i)[0]).toBeInTheDocument();
  });

  it("should signup correctly", async () => {
    const user = userEvent.setup();
    setup();

    await user.type(screen.getByTestId("fullName"), "Can Tuna");
    await user.type(screen.getByTestId("email"), "mttuna90@gmail.com");
    await user.type(screen.getByTestId("password"), "123123");
  });
});
