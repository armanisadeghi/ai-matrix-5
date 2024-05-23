import React from 'react';
import CustomFieldset from '../../../../../ui/fieldset/CustomFieldset';
import TagsInput from '../../../../../ui/pills/TagsInput';
import CustomCheckboxGroup from '../../../../../ui/checkbox/CustomCheckboxGroup';
import {Space, Textarea, TextInput} from '@mantine/core';


const AppOverview = () => {
    return (
        <div>
            <h3>Application Overview</h3>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
            }}>

                <CustomFieldset legend="App Basics" layout="single" buttonLabel="Save" showButton={false}>
                    <TextInput label="Name" placeholder="My New App" withAsterisk/>
                    <Textarea
                        label="App Description"
                        placeholder="Describe your app so it's easy to find, and easy to identify by the Conductor Agent."
                        resize="vertical"
                    />

                    <TagsInput initialTags={[]} onTagsChange={(tags) => console.log(tags)}/>

                </CustomFieldset>

                <CustomCheckboxGroup
                    legend="Access & Permissions"
                    layout="quad"
                    showButton={false}
                    checkboxes={[
                        { label: 'Myself', value: 'myself', tooltip: 'Visible for you.' },
                        { label: 'My Company', value: 'myCompany', tooltip: 'Visible to employees within your organization.' },
                        { label: 'My Connections', value: 'myConnections', tooltip: 'Visible by other Matrix users with whom you have connections.' },
                        { label: 'Matrix Market Free', value: 'matrixMarketFree', tooltip: 'Free for all users to use.' },
                        { label: 'Matrix Market Paid', value: 'matrixMarketPaid', tooltip: 'All users can see it, but can only use it for a fee.' },
                        { label: 'Public', value: 'public', tooltip: 'Displayed publicly, if selected for a blog or other public view.' },
                        { label: 'Agency Companies', value: 'agencyCompanies', tooltip: 'Available to all companies within my Agency.' },
                    ]}
                />

            </div>
        </div>
    );
};

export default AppOverview;
