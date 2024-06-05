import { useState } from 'react';
import { PillsInput, Pill, Combobox, CheckIcon, Group, useCombobox } from '@mantine/core';
import listData from './ListData';

type SelectableListProps = {
    items: string[] | string;
    label?: string;
    placeholder?: string;
    description?: string;
};

function SelectableList({ items, label, placeholder = 'Search values', description }: SelectableListProps) {
    const itemList = typeof items === 'string' ? listData[items] : items;

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState('');
    const [value, setValue] = useState<string[]>([]);

    const handleValueSelect = (val: string) => {
        setValue((current) =>
            current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
        );
        setSearch('');
    };

    const handleValueRemove = (val: string) =>
        setValue((current) => current.filter((v) => v !== val));

    const values = value.map((item) => (
        <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
            {item}
        </Pill>
    ));

    const options = itemList
        .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
        .map((item) => (
            <Combobox.Option value={item} key={item} active={value.includes(item)}>
                <Group gap="sm">
                    {value.includes(item) ? <CheckIcon size={12} /> : null}
                    <span>{item}</span>
                </Group>
            </Combobox.Option>
        ));

    return (
        <div>
            {label && <label>{label}</label>}
            {description && <div>{description}</div>}
            <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
                <Combobox.DropdownTarget>
                    <PillsInput onClick={() => combobox.openDropdown()}>
                        <Pill.Group>
                            {values}
                            <Combobox.EventsTarget>
                                <PillsInput.Field
                                    onFocus={() => combobox.openDropdown()}
                                    onBlur={() => combobox.closeDropdown()}
                                    value={search}
                                    placeholder={placeholder}
                                    onChange={(event) => {
                                        setSearch(event.currentTarget.value);
                                    }}
                                    onKeyDown={(event) => {
                                        if ((event.key === 'Enter' || event.key === 'Tab') && options.length > 0) {
                                            event.preventDefault();
                                            handleValueSelect(options[0].props.value);  // Select the first item
                                        } else if (event.key === 'Backspace' && search.length === 0) {
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
                        {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </div>
    );
}

export default SelectableList;
