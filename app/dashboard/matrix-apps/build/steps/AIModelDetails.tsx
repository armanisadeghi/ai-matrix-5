// steps/AIModelDetails.tsx
import React from 'react';
import AmeFieldset from "@/ui/fieldset/AmeFieldset";
import { Textarea, TextInput } from "@mantine/core";
import TagsInput from "@/ui/pills/TagsInput";
import AmeCheckboxGroup from "@/ui/checkbox/AmeCheckboxGroup";
import CustomCollapse from "@/ui/collapse/CustomCollapse";
import AmeSelect from "@/ui/select/AmeSelect";
import AmeSlider from "@/ui/slider/AmeSlider";
import AmePillsInput from "@/ui/pills/AmePillsInput";
import { aiModels, apiProviders, apiEndpoints } from "@/app/samples/chats/shared/config/aiModels";

// TODO: Replace many of these with api call to get these values

const AIModelDetails = () => {
    return (
        <div>
            <h2>AI Model Details</h2>

            <CustomCollapse
                preText='Choose your primary AI Model:'
                activatorLabel="Learn About Model Selection"
                justify="flex-start"
                hiddenText="With AI Matrix Engine, your recipes, prompts, and apps can dynamically run on any model.
                However, it's important to start with your primary model and tune your prompt to ensure it's just right.
                This also allows you to specify the type of model, such as text, image, etc.."
            />
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <AmeFieldset legend="AI Model" layout="triple" buttonLabel="Save" showButton={false}>

                    <AmeSelect
                        label="API Provider"
                        placeholder="Select a provider"
                        data={apiProviders}
                        withAsterisk={true}
                    >
                    </AmeSelect>

                    <AmeSelect
                        label="API Endpoint"
                        placeholder="Select an endpoint"
                        data={apiEndpoints}
                        withAsterisk={true}
                    >
                    </AmeSelect>

                    <AmeSelect
                        label="AI Model"
                        placeholder="Select an AI Model"
                        data={aiModels.map(model => ({
                            value: model.id,
                            label: model.id
                        }))}
                        withAsterisk={true}
                    >
                    </AmeSelect>

                </AmeFieldset>

                <AmeFieldset legend="Model Settings" layout="triple" showButton={false} >
                    <AmeSlider
                        name="Max Tokens"
                        tooltip="The maximum number of tokens to generate shared between the prompt and completion. The exact limit varies by model. (One token is roughly 4 characters for standard English text)"
                        min={0}
                        max={10000}
                        step={1}
                    />
                    <AmeSlider
                        name="Frequency Penalty"
                        tooltip="How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim."
                        min={0}
                        max={2}
                        step={.01}
                    />
                    <AmeSlider
                        name="Temperature"
                        tooltip="Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive."
                        min={0}
                        max={2}
                        step={.01}
                    />
                    <AmeSlider
                        name="Top P"
                        tooltip="Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered. Lowering results in less random completions."
                        min={0}
                        max={1}
                        step={.01}
                    />
                    <AmeSlider
                        name="Presence Penalty"
                        tooltip="How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics."
                        min={0}
                        max={2}
                        step={.01}
                    />
                    <div style={{
                        paddingRight: '5px',
                        paddingLeft: '5px',
                        justifyContent: 'center'
                    }}>
                        <AmePillsInput
                            placeholder="Type and press enter"
                            label="Stop Sequence"
                            renderPillContent={(item: string) => <span>{item}</span>}
                            onPillsChange={(pills: string[]) => console.log('Updated pills:', pills)}
                        />
                    </div>
                </AmeFieldset>


            </div>
        </div>

    );
};

export default AIModelDetails;
