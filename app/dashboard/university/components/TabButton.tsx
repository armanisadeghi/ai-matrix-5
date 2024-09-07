import { Button, Divider, Flex } from "@mantine/core"; // Replace with your actual UI library

export const TabButton = ({ value, label, activeTab, onClick }) => (
    <Button value={value} variant={value === activeTab ? "filled" : "transparent"} onClick={() => onClick(value)}>
        {label}
    </Button>
);

export const TabButtons = ({ activeTab, handleTabChange }) => {
    const tabs = [
        { value: "home", label: "Home" },
        { value: "my-learnings", label: "My learnings" },
    ];

    return (
        <>
            <Flex gap={4} mb="sm">
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.value}
                        value={tab.value}
                        label={tab.label}
                        activeTab={activeTab}
                        onClick={handleTabChange}
                    />
                ))}
            </Flex>
            <Divider />
        </>
    );
};
