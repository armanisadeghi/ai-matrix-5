import { Broker } from "@/types/broker";

// OPTIMIZE: errors in this file

export const customBrokers: Broker[] = [
    {
        id: "custom-broker1",
        displayName: "Company Name",
        dataType: "string",
        description: "Enter the displayName of the company",
        userId: "user1",
        matrixId: "matrix1",
        officialName: "Official Company Name",
        componentType: "Input"
        /* component: {
            defaultValue: "AME",
            label: "Company Name",
            type: "Input",
            placeholder: "Company Name",
        }, */
    },
    {
        id: "custom-broker2",
        displayName: "Company Address",
        dataType: "string",
        description: "Enter the address of the company",
        userId: "user2",
        matrixId: "matrix2",
        officialName: "Official Company Address",
        componentType: "Input"
/*         component: {
            type: "Input",
            placeholder: "Company Address",
            defaultValue: "USA",
            label: "Company Address",
        }, */
    },
    {
        id: "custom-broker3",
        displayName: "Is Tech Company",
        dataType: "boolean",
        description: "Specify if the company is a tech company",
        userId: "user3",
        matrixId: "matrix3",
        officialName: "Official Tech Company",
        componentType: "YesNo"
/* 
        component: {
            type: "YesNo",
            label: "Is Tech Company",
            defaultValue: "yes",
        }, */
    },
    {
        id: "custom-broker4",
        displayName: "Number of Employees",
        dataType: "number",
        description: "Specify the number of employees",
        userId: "user4",
        matrixId: "matrix4",
        officialName: "Official Number of Employees",
        componentType: "Slider"
/*         component: {
            type: "Slider",
            defaultValue: 7,
            min: 1,
            max: 10,
            step: 1,
            label: "Number of employees",
        }, */
    },
    {
        id: "custom-broker5",
        displayName: "Tech Stack",
        dataType: "string[]",
        description: "Select the tech stack used by the company",
        userId: "user5",
        matrixId: "matrix5",
        officialName: "Official Tech Stack",
        componentType: "Select"
/*         component: {
            type: "Select",
            options: ["React", "Next.js", "Angular", "Vue.js"],
            defaultValue: "React",
            label: "Tech Stack",
        }, */
    },
];

export const systemBrokers: Broker[] = [
    {
        id: "system-broker6",
        displayName: "First Name",
        dataType: "string",
        description: "your first displayName",
        userId: "user6",
        matrixId: "matrix6",
        officialName: "Official First Name",
        componentType: "Input"
/*         component: {
            defaultValue: "",
            label: "Name",
            type: "Input",
            placeholder: "Enter your first displayName",
        }, */
    },
    {
        id: "system-broker7",
        displayName: "Last Name",
        dataType: "string",
        description: "your last displayName",
        userId: "user7",
        matrixId: "matrix7",
        officialName: "Official Last Name",
        componentType: "Input"
/*         component: {
            defaultValue: "",
            label: "Last Name",
            type: "Input",
            placeholder: "Enter your last displayName",
        }, */
    },
    {
        id: "system-broker8",
        displayName: "Email",
        dataType: "string",
        description: "your email address",
        userId: "user8",
        matrixId: "matrix8",
        officialName: "Official Email",
        componentType: "Input"
/*         component: {
            defaultValue: "",
            label: "Email",
            type: "Input",
            placeholder: "Enter your email address",
        }, */
    },
    {
        id: "system-broker9",
        displayName: "Age",
        dataType: "number",
        description: "your age",
        userId: "user9",
        matrixId: "matrix9",
        officialName: "Official Age",
        componentType: "Input"
/*         component: {
            defaultValue: "",
            label: "Age",
            type: "Input",
            placeholder: "Enter your age",
        }, */
    },
    {
        id: "system-broker10",
        displayName: "Gender",
        dataType: "string",
        description: "your gender",
        userId: "user10",
        matrixId: "matrix10",
        officialName: "Official Gender",
        componentType: "Select"
/*         component: {
            defaultValue: "",
            label: "Gender",
            type: "Select",
            options: ["Male", "Female", "Other"],
        }, */
    },
];