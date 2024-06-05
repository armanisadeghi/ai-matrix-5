import React from 'react';
import Tag from './tagAtoms';
import Message from './messageAtoms';
import Broker from './brokerAtoms';

interface RecipeProps {
    recipe: {
        _id: string;
        name: string;
        tags: string[];
        description: string;
        permissions: {
            public: boolean;
            groups: string[];
            orgs: string[];
            users: string[];
        };
        messages: {
            type: string;
            text: string;
        }[];
        callParams: {
            models: {
                verifiedModels: string[];
                eliteModel: string;
                trialModels: string[];
            };
            brokers: {
                name: string;
                type: string;
                required: boolean;
                defaultValue: any;
            }[];
            overrides: {
                stream: boolean;
            };
        };
        postParams: {
            returnBroker: string;
            processors: {
                permanent: string[];
                optional: string[];
            };
            defaultDisplay: string;
            nextStepOptions: string[];
        };
        sampleOutput: string;
    };
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => (
    <div className="recipe">
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        <div className="tags">
            {recipe.tags.map(tag => <Tag key={tag} tag={tag} />)}
        </div>
        <div className="permissions">
            <p>Public: {recipe.permissions.public ? 'Yes' : 'No'}</p>
            <p>Groups: {recipe.permissions.groups.join(', ')}</p>
            <p>Orgs: {recipe.permissions.orgs.join(', ')}</p>
            <p>Users: {recipe.permissions.users.join(', ')}</p>
        </div>
        <div className="messages">
            {recipe.messages.map((message, index) => (
                <Message key={index} type={message.type} text={message.text} />
            ))}
        </div>
        <div className="call-params">
            <h2>Call Parameters</h2>
            <div className="models">
                <p>Elite Model: {recipe.callParams.models.eliteModel}</p>
                <p>Verified Models: {recipe.callParams.models.verifiedModels.join(', ')}</p>
                <p>Trial Models: {recipe.callParams.models.trialModels.join(', ')}</p>
            </div>
            <div className="brokers">
                {recipe.callParams.brokers.map((broker, index) => (
                    <Broker key={index} {...broker} />
                ))}
            </div>
            <p>Stream: {recipe.callParams.overrides.stream ? 'Enabled' : 'Disabled'}</p>
        </div>
        <div className="post-params">
            <h2>Post Parameters</h2>
            <p>Return Broker: {recipe.postParams.returnBroker}</p>
            <div className="processors">
                <p>Permanent: {recipe.postParams.processors.permanent.join(', ')}</p>
                <p>Optional: {recipe.postParams.processors.optional.join(', ')}</p>
            </div>
            <p>Default Display: {recipe.postParams.defaultDisplay}</p>
            <p>Next Step Options: {recipe.postParams.nextStepOptions.join(', ')}</p>
        </div>
        <div className="sample-output">
            <h2>Sample Output</h2>
            <pre>{recipe.sampleOutput}</pre>
        </div>
    </div>
);

export default Recipe;
