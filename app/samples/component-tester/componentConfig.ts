// app/config/componentConfig.ts
import dynamic from 'next/dynamic';
import { exampleCode, cssCode, pythonCode } from '@/app/samples/code-highlight/data/exampleCode';

export const componentMap: { [key: string]: React.ComponentType<any> } = {
    AIResponse: dynamic(() => import('@/app/chat/response/AIResponse')),
    AmeMultiCodeHighlight: dynamic(() => import('@/ui/highlight/AmeMultiCodeHighlight')),
    ChatSidebar: dynamic(() => import('@/app/samples/ai-tests/shared/sidebar/ChatSidebar')),
    DynamicSplitter: dynamic(() => import('@/ui/split/DynamicSplitter')),
    AmeCheckbox: dynamic(() => import('@/ui/checkbox/AmeCheckbox')),
    AmeCheckboxGroup: dynamic(() => import('@/ui/checkbox/AmeCheckboxGroup')),
    CustomCollapse: dynamic(() => import('@/ui/collapse/CustomCollapse')),
    CustomCollapseWithPreText: dynamic(() => import('@/ui/collapse/AmeCollapse')),
    AmeFieldset: dynamic(() => import('@/ui/fieldset/AmeFieldset')),
    AmeCodeHighlight: dynamic(() => import('@/ui/highlight/AmeCodeHighlight')),
    AmeCodeTabs: dynamic(() => import('@/ui/highlight/AmeCodeTabs')),
    AmeActionTextInput: dynamic(() => import('@/ui/input/AmeActionTextInput')),
    AmeNumericInput: dynamic(() => import('@/ui/input/AmeNumericInput')),
    AmeSearchInput: dynamic(() => import('@/ui/input/AmeSearchInput')),
    AmePillsInput: dynamic(() => import('@/ui/pills/AmePillsInput')),
    SelectableList: dynamic(() => import('@/ui/pills/AmeSearchablePill')),
    AmeHoverMenuChat: dynamic(() => import('@/components/AiChat/Sidebar/AmeChatHistoryEntry')),
    AmeRadioCard: dynamic(() => import('@/ui/radio/AmeRadioCard')),
    AmeSelect: dynamic(() => import('@/ui/select/AmeSelect')),
    AmeSlider: dynamic(() => import('@/ui/slider/AmeSlider')),
    MoveComponent: dynamic(() => import('@/ui/special/MoveComponent')),
    FormStepper: dynamic(() => import('@/ui/steps/FormStepper')),
    NotesCard: dynamic(() => import('@/components/NotesCard/NotesCard').then(mod => mod.NotesCard)),
    RichTextEditorPage: dynamic(() => import('@/components/RichTextEditor/RichTextEditorPage')),
    AmeJsonInput: dynamic(() => import('@/ui/json/AmeJsonInput')),
};

export const propDefinitions: { [key: string]: any } = {
    AIResponse: {
        message: {
            id: '1',
            content: 'Sample AI response message'
        }
    },
    ChatSidebar: {},
    AmeHoverMenuChat: {},

    // Default props for DynamicSplitter
    DynamicSplitter: {
        verticalSections: [
            {
                title: 'Section 1',
                content: 'Content 1.'
            },
            {
                title: 'Section 2',
                content: 'Content 2.'
            },
            {
                title: 'Section 3',
                content: 'Content 3.'
            },
            {
                title: 'Section 4',
                content: 'Content 4.'
            }
        ],
        horizontalSectionIndex: 1,
        initialVerticalSizes: [25, 40, 15, 20],
        initialHorizontalSizes: [40, 30, 30],
        horizontalSections: [
            {
                title: 'Top Subsection',
                content: 'Content for the top subsection.'
            },
            {
                title: 'Middle Subsection',
                content: 'Content for the Middle subsection.'
            },
            {
                title: 'Bottom Subsection',
                content: 'Content for the bottom subsection.'
            }
        ],
    },

    // Default props for AmeCheckbox
    AmeCheckbox: {
        label: 'Sample Checkbox',
        tooltip: 'This is a tooltip',
        pointerCursor: true,
        checked: false,
        disabled: false,
        defaultChecked: false,
        onChange: () => {
        },
    },

    // Default props for AmeCheckboxGroup
    AmeCheckboxGroup: {
        checkboxes: [
            {
                label: 'Checkbox 1',
                value: '1',
                tooltip: 'Tooltip 1',
                checked: false,
                disabled: false
            },
            {
                label: 'Checkbox 2',
                value: '2',
                tooltip: 'Tooltip 2',
                checked: false,
                disabled: false
            },
            {
                label: 'Checkbox 3',
                value: '3',
                tooltip: 'Tooltip 3',
                checked: false,
                disabled: false
            },
        ],
        legend: 'Sample Legend',
        layout: 'single',
        buttonLabel: 'Click Me',
        showButton: true,
        buttonWidth: '100px',
        fieldsetWidth: '100%',
    },

    // Default props for CustomCollapse
    CustomCollapse: {
        activatorLabel: 'Show More',
        hiddenText: 'This is the hidden text.',
        width: 1000,
        justify: 'flex-start',
    },

    // Default props for CustomCollapse with preText
    CustomCollapseWithPreText: {
        activatorLabel: 'Show More',
        hiddenText: 'This is the hidden text.',
        preText: 'Preceding text.',
        width: 1000,
        justify: 'flex-start',
    },

    // Default props for AmeFieldset
    AmeFieldset: {
        children: [],
        buttonLabel: 'Submit',
        legend: 'Information',
        layout: 'single',
        showButton: true,
        buttonWidth: 'auto',
        fieldsetWidth: '100%',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
    },

    AmeCodeHighlight: {
        code: exampleCode,
        language: 'typescript',
        title: 'TypeScript Example',
        startCollapsed: false,
        useLoadingEffect: false,
    },
    AmeMultiCodeHighlight: {
        codeSnippets: [
            {
                code: exampleCode,
                language: 'typescript',
                title: 'TypeScript Example'
            },
            {
                code: cssCode,
                language: 'css',
                title: 'CSS Example'
            },
            {
                code: pythonCode,
                language: 'python',
                title: 'Python Example'
            },
        ],
        startCollapsed: false,
        useLoadingEffect: false,
    },

    AmeCodeTabs: {
        codeSnippets: [
            {
                code: `
                // JavaScript Example
                const example1 = "Hello, world 1!";
                function greet1(name) {
                    return \`Hello, \${name}\`;
                }
                console.log(greet1("world 1"));
                `,
                language: 'javascript',
                title: 'JavaScript Example 1'
            },
            {
                code: `
                # Python Example
                def greet2(name):
                    return f"Hello, {name}"
                print(greet2("world 2"))
                `,
                language: 'python',
                title: 'Python Example 2'
            },
            {
                code: `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Hello World 3</title>
                </head>
                <body>
                    <h1>Hello, World 3!</h1>
                </body>
                </html>
                `,
                language: 'html',
                title: 'HTML Example 3'
            }
        ],
        startCollapsed: false,
        useLoadingEffect: false,
    },
    AmeActionTextInput: {
        initialValue: 'Editable text',
        editable: true,
    },
    AmeNumericInput: {
        value: 0,
        onChange: (value: number) => console.log(value),
        width: '100px',
    },
    AmeSearchInput: {
        w: '200px',
    },
    AmePillsInput: {
        initialPills: ['pill1', 'pill2', 'pill3'],
        placeholder: 'Enter pill...',
        label: 'Pills Input',
        description: 'Add your pills here',
        renderPillContent: (item: string) => item,
        onPillsChange: (pills: string[]) => console.log(pills),
        maxWidth: '100%',
        justify: 'flex-start',
    },
    SelectableList: {
        items: ['Option 1', 'Option 2', 'Option 3'],
        label: 'Selectable List',
        placeholder: 'Search values',
        description: 'Select items from the list',
    },
    AmeRadioCard: {
        description: 'This is a description',
        icon: null,
        withIndicator: true,
    },
    AmeSelect: {
        label: 'Select an option',
        data: ['Option 1', 'Option 2', 'Option 3'],
        placeholder: 'Choose...',
        withAsterisk: true,
        error: 'This field is required',
        nothingFoundMessage: 'No matches found',
    },
    AmeSlider: {
        name: 'Adjust the value',
        tooltip: 'Slide to select a value',
        min: 0,
        max: 100,
        step: 1,
    },
    MoveComponent: {
        initialX: 0.2,
        initialY: 0.6,
    },
    FormStepper: {
        steps: [
            {
                label: 'Step 1',
                description: 'Description 1',
                content: 'Content 1'
            },
            {
                label: 'Step 2',
                description: 'Description 2',
                content: 'Content 2'
            },
        ],
        onFormSubmit: () => console.log('Form Submitted'),
    },
    NotesCard: {
        data: [
            {
                id: 1,
                created: new Date().toString(),
                note: 'This is a sample note 1.',
                noteColor: 'gray'
            },
            {
                id: 2,
                created: new Date().toString(),
                note: 'This is a sample note 2.',
                noteColor: 'gray'
            },
        ],
    },
    RichTextEditorPage: {
        content: 'Initial content',
        onSave: (content: string) => console.log(content),
    },
    AmeJsonInput: {
        enabled: true,
        errorMessage: '',
        label: 'JSON Input',
        value: '{"id":"e75e73f4-b4c2-40d6-bd09-89be22b76575","company_name":"Nolan, Gutkowski and Cremin","address_line":"Apt 666","city":"Reno","state":"Nevada","zip":"3133","country":"United States","primary_contact":"xmccoole0@noaa.gov"}',
        showButton: true,
        validateJson: true,
    },
};


