import { render, screen } from "@testing-library/react";

import CreateFolder from "./App";
import React from "react";

test("renders learn react link", () => {
  render(<CreateFolder />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
