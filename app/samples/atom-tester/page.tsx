"use client";

function AtomTesterPage() {
    return <div>Atom Tester page</div>;
}

export default AtomTesterPage;

/*


const handleAtomSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedAtom(selected);
        const value = getAtomValue(selected);
        setAtomValue(value);
    };

    const getAtomValue = (atomName: string) => {
        switch (atomName) {
            case 'allChatsAtom':
                return JSON.stringify(allChats, null, 2);
            case 'activeChatIdAtom':
                return JSON.stringify(currentChatId, null, 2);
            case 'activeChatMessagesArrayAtom':
                return JSON.stringify(currentChatMessages, null, 2);
            case 'activeUserAtom':
                return JSON.stringify(activeUser, null, 2);
            case 'systemMessagesAtom':
                return JSON.stringify(systemMessages, null, 2);
            case 'detailsForAllChatsAtom':
                return JSON.stringify(detailsForAllChats, null, 2);
            case 'chatTitlesAndIdsAtom':
                return JSON.stringify(chatTitlesAndIdsAtom, null, 2);
            case 'availableHeightSelector':
                return JSON.stringify(availableHeight, null, 2);
            case 'availableWidthSelector':
                return JSON.stringify(availableWidth, null, 2);
            default:
                return 'Unknown Atom';
        }
    };

    return (
        <>
            <VerticalSplitter
                initialSizes={[50, 50]}
                expandToMin={false}
                children={[
                    <div key="left-panel">
                        <Divider my="xs" label="Testing Center" labelPosition="center" />
                        <Space h="md" />
                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="atom-select">Select Atom to View: </label>
                            <select id="atom-select" value={selectedAtom} onChange={handleAtomSelect}>
                                <option value="">Select Atom</option>
                                <option value="availableHeightSelector">availableHeightSelector</option>
                                <option value="availableWidthSelector">availableWidthSelector</option>
                                <option value="chatTitlesAndIdsAtom">chatTitlesAndIdsAtom</option>
                                <option value="activeChatIdAtom">activeChatIdAtom</option>
                                <option value="detailsForAllChatsAtom">detailsForAllChatsAtom</option>
                                <option value="activeChatMessagesArrayAtom">activeChatMessagesArrayAtom</option>
                                <option value="activeUserAtom">activeUserAtom</option>
                                <option value="systemMessagesAtom">systemMessagesAtom</option>
                            </select>
                            <Space h="md" />
                            <AmeJsonInput label="JSON Display" value={atomValue} onChange={() => {}} />
                        </div>
                    </div>,

                    <Stack key="right-panel">
                        <Textarea ref={inputRef} />
                        <TextInput placeholder="Input 1" />
                        <TextInput placeholder="Input 2" />
                        <TextInput placeholder="Input 3" />
                        <div>
                            <Space h="xl" />
                            <Button onClick={() => setCurrentChatId('new_chat_id')}>Set Current Chat ID</Button>
                        </div>
                    </Stack>
                ]}
            />
        </>
    );
}

export default AtomTester;




    const [detailsForAllChats, setDetailsForAllChats] = useRecoilState(detailsForAllChatsAtom);
    const [allChats, setAllChats] = useRecoilState(allChatsAtom);
    const [currentChatMessages, setCurrentChatMessages] = useRecoilState(activeChatMessagesArrayAtom);

 *!/
*/
