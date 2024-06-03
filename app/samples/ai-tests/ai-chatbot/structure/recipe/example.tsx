import React from 'react';
import Recipe from './recipeAtoms';

const recipeData = {
    _id: "example_id",
    name: "Example Recipe",
    tags: ["tag1", "tag2"],
    description: "This is an example recipe.",
    permissions: {
        public: false,
        groups: ["group1"],
        orgs: ["org1"],
        users: ["user1"]
    },
    messages: [
        {
            type: "system",
            text: "System message example."
        }
    ],
    callParams: {
        models: {
            verifiedModels: ["model1", "model2"],
            eliteModel: "eliteModel1",
            trialModels: ["trialModel1"]
        },
        brokers: [
            {
                name: "broker1",
                type: "type1",
                required: true,
                defaultValue: null
            }
        ],
        overrides: {
            stream: false
        }
    },
    postParams: {
        returnBroker: "brokerReturn",
        processors: {
            permanent: ["processor1"],
            optional: ["processor2"]
        },
        defaultDisplay: "text_area",
        nextStepOptions: ["step1", "step2"]
    },
    sampleOutput: "Sample output text"
};

const App: React.FC = () => (
    <div className="App">
        <Recipe recipe={recipeData} />
    </div>
);

export default App;
