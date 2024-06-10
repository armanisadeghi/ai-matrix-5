import React, { useState } from "react"; // Removed useRef
import { rem, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface AmeSearchInputProps extends Partial<TextInputProps> {
  w?: number | string;
}

const SearchIcon = (): JSX.Element => {
  return <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />;
};

const AmeSearchInput: React.FC<AmeSearchInputProps> = ({
  w,
  value, 
  onChange, 
  ...others
}: AmeSearchInputProps) => {
const [internalValue, setInternalValue] = useState<string>(String(value) || "search..."); 

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue); 
    onChange?.(event); 
};

  return (
    <TextInput
      placeholder={"search"}
      size="sm"
      leftSection={<SearchIcon />}
      w={w}
      value={internalValue} 
      onChange={handleChange} 
      onFocus={() => {}} 
      styles={{ section: { pointerEvents: "none" } }}
      aria-label={others.placeholder}
      {...others}
    />
  );
};

export default AmeSearchInput;
