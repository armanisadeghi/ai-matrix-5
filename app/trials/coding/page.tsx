import InteractiveCodeEnvironment from "@/components/Coding/InteractiveCodeEnvironment";

function CodeAssistantApp() {
    const handleExecuteCode = async (code: string, language: string) => {
        // This is where you'd send the code to your backend for execution
        // For demonstration, we'll just return a mock result
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        return `Executed ${language} code:\n\n${code}\n\nMock output: Success!`;
    };

    return (
        <div>
            <h1>Code Assistant</h1>
            <InteractiveCodeEnvironment
                initialCode="print('Hello, World!')"
                language="python"
                onExecute={handleExecuteCode}
            />
        </div>
    );
}

export default CodeAssistantApp;
