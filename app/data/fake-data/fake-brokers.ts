import { Broker } from "@/types/broker";

export const brokersData: Broker[] = [
    {
        id: 'broker1',
        name: 'Company Name',
        dataType: ['string'],
        description: 'Enter the name of the company',
        component: {
            componentId: 'input1',
            defaultValue: 'AME',
            label: "Company Name",
            type: 'Input',
            placeholderText: 'Company Name',
        }
    },
    {
        id: 'broker2',
        name: 'Company Address',
        dataType: ['string'],
        description: 'Enter the address of the company',
        component: {
            componentId: 'input2',
            type: 'Input',
            placeholderText: 'Company Address',
            defaultValue: 'USA',
            label: "Company Address",
        }
    },
    {
        id: 'broker3',
        name: 'Is Tech Company',
        dataType: ['boolean'],
        description: 'Specify if the company is a tech company',
        component: {
            componentId: 'switch1',
            type: 'YesNo',
            label: 'Is Tech Company',
            defaultValue: true,
        }
    },
    {
        id: 'broker4',
        name: 'Number of Employees',
        dataType: ['number'],
        description: 'Specify the number of employees',
        component: {
            componentId: 'slider1',
            type: 'Slider',
            defaultValue: 7,
            min: 1,
            max: 10,
            step: 1,
            label: 'Number of employees',
        }
    },
    {
        id: 'broker5',
        name: 'Tech Stack',
        dataType: ['string[]'],
        description: 'Select the tech stack used by the company',
        component: {
            componentId: 'select1',
            type: 'Select',
            options: ["React", "Next.js", "Angular", "Vue.js"],
            defaultValue: ["React"],
            label: "Tech Stack",
        }
    },
];