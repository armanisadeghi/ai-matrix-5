import { Timeline, Text } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';

function TimelineSample() {
    return (
        <Timeline active={1} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<IconGitBranch size={12} />} title="Write a Prompt">
                <Text c="dimmed" size="sm">Write a simple or complex prompt in the Playground</Text>
                <Text size="xs" mt={4}>Estimated Time: 5 Min</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconGitCommit size={12} />} title="Create Brokers">
                <Text c="dimmed" size="sm">Brokers are like variables, but way more powerful!</Text>
                <Text size="xs" mt={4}>Estimated Time: 5 Min</Text>
            </Timeline.Item>

            <Timeline.Item title="Choose Components" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
                <Text c="dimmed" size="sm">Pick components to show for any broker</Text>
                <Text size="xs" mt={4}>Estimated Time: 5 Min</Text>
            </Timeline.Item>

            <Timeline.Item title="Test Your Recipe" bullet={<IconMessageDots size={12} />}>
                <Text c="dimmed" size="sm">Run your recipe and make changes in real time.</Text>
                <Text size="xs" mt={4}>Estimated Time: 5 Min</Text>
            </Timeline.Item>

            <Timeline.Item title="Add Tools" bullet={<IconMessageDots size={12} />}>
                <Text c="dimmed" size="sm">Equip your Agent with APIs, built-in functions and more.</Text>
                <Text size="xs" mt={4}>Estimated Time: 5 Min</Text>
            </Timeline.Item>

            <Timeline.Item title="Chain Recipes" bullet={<IconMessageDots size={12} />}>
                <Text c="dimmed" size="sm">Create a mini-workflow with chained brokers</Text>
                <Text size="xs" mt={4}>Estimated Time: 5 Min</Text>
            </Timeline.Item>

            <Timeline.Item title="Launch Your New App!" bullet={<IconMessageDots size={12} />}>
                <Text c="dimmed" size="sm">Launch your new AI-Driven App!</Text>
                <Text size="xs" mt={4}>Estimated Time: 5 Min</Text>
            </Timeline.Item>

        </Timeline>
    );
}

export default TimelineSample;
