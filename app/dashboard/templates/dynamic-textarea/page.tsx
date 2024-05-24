// Path: app/dashboard/templates/dynamic-textarea/page.tsx
"use client"; // This ensures the component is treated as a client component
import React, { useState } from "react";
import { Textarea, ActionIcon, Group, Box } from "@mantine/core";
import { MdPermMedia } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";

const DynamicTextarea = () => {
  const [value, setValue] = useState("");
  const [collapsed, setCollapsed] = useState(false); // State to track collapse

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  const toggleExpand = () => {
    setCollapsed(!collapsed); // Toggle the collapse state
  };

  const handleUpload = () => {
    // Trigger file upload logic here
  };

  const handleDelete = () => {
    setValue(""); // Clear the textarea
  };

  return (
    <Box
      style={{
        border: "0.5px solid #E0E0E0",
        borderRadius: 12,
        padding: 8,
        cursor: "pointer",
        boxShadow: collapsed ? "none" : "0px 0px 8px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={() => {
        if (!collapsed) {
          // Only apply glow effect if not collapsed
          document.getElementById(
            "dynamic-textarea-container",
          ).style.boxShadow = "0px 0px 12px rgba(0, 0, 0, 0.2)";
        }
      }}
      onMouseLeave={() => {
        if (!collapsed) {
          document.getElementById(
            "dynamic-textarea-container",
          ).style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.1)";
        }
      }}
      onClick={toggleExpand}
      id="dynamic-textarea-container"
    >
      <Group
        justify="space-between"
        style={{ width: "100%", alignItems: "center" }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: "normal",
            color: "#909090",
          }}
        >
          SYSTEM
        </div>
        <div>
          <ActionIcon
            size="sm"
            onClick={handleUpload}
            style={{ color: "#909090" }}
          >
            <MdPermMedia />
          </ActionIcon>
          <ActionIcon
            size="sm"
            onClick={handleDelete}
            style={{ color: "#909090" }}
          >
            <RiDeleteBin3Line />
          </ActionIcon>
          <ActionIcon
            size="sm"
            onClick={toggleExpand}
            style={{ color: "#909090" }}
          >
            <FaExpandArrowsAlt />
          </ActionIcon>
        </div>
      </Group>
      <Textarea
        value={value}
        onChange={handleChange}
        autosize
        size="xs"
        variant="unstyled"
        minRows={2}
        maxRows={collapsed ? 2 : undefined}
        placeholder="Enter system message..."
        style={{
          marginTop: 4,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderColor: "#E0E0E0",
          overflow: "hidden",
        }}
      />
    </Box>
  );
};

export default DynamicTextarea;
