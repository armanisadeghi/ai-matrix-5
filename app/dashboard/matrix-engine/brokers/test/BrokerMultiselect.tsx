"use client";
import { brokersAtom } from '@/context/atoms';
import { CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { useRecoilValue } from 'recoil';

export function BrokerMultiSelect({ value, setValue }: any) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });
    const brokers = useRecoilValue(brokersAtom);

    const handleValueSelect = (val: string) => {
        setValue((current: string[]) => {
            const updatedValue = current.includes(val)
                ? current.filter((v) => v !== val)
                : [...current, val];
            return updatedValue;
        });
    };

    const handleValueRemove = (val: string) =>
        setValue((current: string[]) => current.filter((v) => v !== val));

    const values = value.map((item: string) => (
        <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
            {item}
        </Pill>
    ));

    const options = brokers.map((item) => (
        <Combobox.Option value={item.displayName} key={item.id} active={value.includes(item.displayName)}>
            <Group gap="sm">
                {value.includes(item.displayName) ? <CheckIcon size={12} /> : null}
                <span>{item.displayName}</span>
            </Group>
        </Combobox.Option>
    ));

    // const systemBrokersOptions = system.map((item) => (
    //     <Combobox.Option value={item.name} key={item.id} active={value.includes(item.name)}>
    //         <Group gap="sm">
    //             {value.includes(item.name) ? <CheckIcon size={12} /> : null}
    //             <span>{item.name}</span>
    //         </Group>
    //     </Combobox.Option>
    // ));

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
                    <Pill.Group>
                        {values.length > 0 ? (
                            values
                        ) : (
                            <Input.Placeholder>Pick one or more values</Input.Placeholder>
                        )}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                type="hidden"
                                onBlur={() => combobox.closeDropdown()}
                                onKeyDown={(event) => {
                                    if (event.key === 'Backspace') {
                                        event.preventDefault();
                                        handleValueRemove(value[value.length - 1]);
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {/* <Combobox.Group label="System Brokers">{systemBrokersOptions}</Combobox.Group> */}
                    <Combobox.Group label="Custom Brokers">{options}</Combobox.Group>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}