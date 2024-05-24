import { Fieldset, Button, Group, SimpleGrid } from "@mantine/core";
import { ReactNode, Children, cloneElement } from "react";

interface AmeFieldsetProps {
  children: ReactNode;
  buttonLabel?: string;
  legend?: string;
  layout?: "single" | "double" | "triple" | "quad";
  showButton?: boolean;
  buttonWidth?: string;
  fieldsetWidth?: string;
}

function AmeFieldset({
  children,
  buttonLabel = "Submit",
  legend = "Information",
  layout = "single",
  showButton = true,
  buttonWidth = "auto",
  fieldsetWidth = "100%",
}: AmeFieldsetProps) {
  const cols =
    layout === "double"
      ? 2
      : layout === "triple"
        ? 3
        : layout === "quad"
          ? 4
          : 1;

  const content = (
    <SimpleGrid cols={cols} spacing="md">
      {Children.toArray(children).map((child: any, index) => (
        <div key={index} style={{ width: child.props.width || "100%" }}>
          {cloneElement(child, { ...child.props })}
        </div>
      ))}
    </SimpleGrid>
  );

  return (
    <Fieldset legend={legend} radius="lg" style={{ width: fieldsetWidth }}>
      {content}
      {showButton && (
        <Group justify="flex-end" mt="lg">
          <Button style={{ width: buttonWidth }}>{buttonLabel}</Button>
        </Group>
      )}
    </Fieldset>
  );
}

export default AmeFieldset;
