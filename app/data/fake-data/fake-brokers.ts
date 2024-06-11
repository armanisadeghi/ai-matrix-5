import { Broker } from "@/types/broker";

export const customBrokers: Broker[] = [
    {
        id: 'custom-broker1',
        name: 'Company Name',
        dataType: 'string',
        description: 'Enter the name of the company',
        component: {
            defaultValue: 'AME',
            label: "Company Name",
            type: 'Input',
            placeholder: 'Company Name',
        }
    },
    {
        id: 'custom-broker2',
        name: 'Company Address',
        dataType: 'string',
        description: 'Enter the address of the company',
        component: {
            type: 'Input',
            placeholder: 'Company Address',
            defaultValue: 'USA',
            label: "Company Address",
        }
    },
    {
        id: 'custom-broker3',
        name: 'Is Tech Company',
        dataType: 'boolean',
        description: 'Specify if the company is a tech company',
        component: {
            type: 'YesNo',
            label: 'Is Tech Company',
            defaultValue: "yes",
        }
    },
    {
        id: 'custom-broker4',
        name: 'Number of Employees',
        dataType: 'number',
        description: 'Specify the number of employees',
        component: {
            type: 'Slider',
            defaultValue: 7,
            min: 1,
            max: 10,
            step: 1,
            label: 'Number of employees',
        }
    },
    {
        id: 'custom-broker5',
        name: 'Tech Stack',
        dataType: 'string[]',
        description: 'Select the tech stack used by the company',
        component: {
            type: 'Select',
            options: ["React", "Next.js", "Angular", "Vue.js"],
            defaultValue: "React",
            label: "Tech Stack",
        }
    },
];

export const systemBrokers: Broker[] = [
    {
        id: 'system-broker6',
        name: 'First Name',
        dataType: 'string',
        description: 'your first name',
        component: {
            defaultValue: '',
            label: "Name",
            type: 'Input',
            placeholder: 'Enter your first name',
        }
    },
    {
        id: 'system-broker7',
        name: 'Last Name',
        dataType: 'string',
        description: 'your last name',
        component: {
            defaultValue: '',
            label: "Last Name",
            type: 'Input',
            placeholder: 'Enter your last name',
        }
    },
    {
        id: 'system-broker8',
        name: 'Email',
        dataType: 'string',
        description: 'your email address',
        component: {
            defaultValue: '',
            label: "Email",
            type: 'Input',
            placeholder: 'Enter your email address',
        }
    },
    {
        id: 'system-broker9',
        name: 'Age',
        dataType: 'number',
        description: 'your age',
        component: {
            defaultValue: '',
            label: "Age",
            type: 'Input',
            placeholder: 'Enter your age',
        }
    },
    {
        id: 'system-broker10',
        name: 'Gender',
        dataType: 'string',
        description: 'your gender',
        component: {
            defaultValue: '',
            label: "Gender",
            type: 'Select',
            options: [
                'Male', 'Female', 'Other'
            ],
        }
    },
];