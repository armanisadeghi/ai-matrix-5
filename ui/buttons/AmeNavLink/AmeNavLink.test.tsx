import { render, screen } from "@/test-utils";
import { AmeNavLink } from "./AmeNavLink";

describe("AmeNavLink component", () => {
    it("has correct Next.js theming section link", () => {
        render(<AmeNavLink label="Nav link" />);
        expect(screen.getByText("this guide")).toHaveAttribute("href", "https://mantine.dev/guides/next/");
    });
});
