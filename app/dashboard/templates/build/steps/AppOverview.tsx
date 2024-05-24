import React from "react";
import AmeFieldset from "../../../../../ui/fieldset/AmeFieldset";
import { TextInput, Space } from "@mantine/core";

const AppOverview = () => {
  return (
    <div>
      <h3>Application Overview</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <AmeFieldset
          legend="App Basics"
          buttonLabel="Save"
          showButton={false}
          fieldsetWidth="49%"
        >
          <TextInput label="Name" placeholder="My New App" />
          <TextInput label="Description" placeholder="Describe your app" />
        </AmeFieldset>
        <AmeFieldset
          legend="App Basics"
          buttonLabel="Save"
          showButton={false}
          fieldsetWidth="49%"
        >
          <TextInput label="Name" placeholder="My New App" />
          <TextInput label="Description" placeholder="Describe your app" />
        </AmeFieldset>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Space h="xs" />
        <AmeFieldset legend="More Details" layout="double" showButton={false}>
          <TextInput label="Name" placeholder="My New App" />
          <TextInput label="Description" placeholder="Describe your app" />
          <TextInput label="Name" placeholder="My New App" />
          <TextInput label="Description" placeholder="Describe your app" />
          <TextInput label="Name" placeholder="My New App" />
          <TextInput label="Description" placeholder="Describe your app" />
        </AmeFieldset>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Space h="xs" />
        <AmeFieldset legend="More Details" layout="triple" showButton={false}>
          <TextInput label="Name" placeholder="My New App" />
          <TextInput label="Description" placeholder="Describe your app" />
          <TextInput label="Name" placeholder="My New App" />
          <TextInput label="Description" placeholder="Describe your app" />
          <TextInput label="Name" placeholder="My New App" />
          <TextInput label="Description" placeholder="Describe your app" />
        </AmeFieldset>
      </div>
    </div>
  );
};

export default AppOverview;
