"use client";
import { CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { useBroker } from '@/context/brokerContext';

export function BrokerMultiSelect({ value, setValue }: any) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const { brokers } = useBroker()

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
        <Combobox.Option value={item.name} key={item.id} active={value.includes(item.name)}>
            <Group gap="sm">
                {value.includes(item.name) ? <CheckIcon size={12} /> : null}
                <span>{item.name}</span>
            </Group>
        </Combobox.Option>
    ));

    const systemBrokersOptions = brokers.map((item) => (
        <Combobox.Option value={item.name} key={item.id} active={value.includes(item.name)}>
            <Group gap="sm">
                {value.includes(item.name) ? <CheckIcon size={12} /> : null}
                <span>{item.name}</span>
            </Group>
        </Combobox.Option>
    ));

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
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}