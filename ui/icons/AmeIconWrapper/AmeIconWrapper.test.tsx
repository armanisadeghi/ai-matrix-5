import { render, screen } from "@/test-utils";
import { AmeIconWrapper } from "./AmeIconWrapper";
import { IconSettings } from "@tabler/icons-react";

describe("AmeIconWrapper component", () => {
    it("has correct Next.js theming section link", () => {
        render(
            <AmeIconWrapper>
                <IconSettings />
            </AmeIconWrapper>,
        );
        expect(screen.getByText("this guide")).toHaveAttribute("href", "https://mantine.dev/guides/next/");
    });
});
