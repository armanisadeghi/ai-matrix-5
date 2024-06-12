import {useEffect, useState} from "react";
import FolderIco from "@/components/SmartList/components/etc/FolderIco"
import Text from "@/components/SmartList/components/etc/Text"
import {IconFile} from '@tabler/icons-react';
import {useListProvider} from "@/components/SmartList/SmartList";
import CollapseBtn from "@/components/SmartList/components/etc/Collapsebtn";
import {Checkbox, Radio} from "@mantine/core";

function getAllChildrenIds(item, ids) {
    if (!item.children || item.children.length === 0) {
        return ids;
    } else {
        item.children.forEach(child => {
            ids.push(child);
            getAllChildrenIds(child, ids);
        });
        return ids;
    }
}

export default function Selector({item, isOpen, onClick, type}) {
    const {selectedValue, setSelectedValue}:any = useListProvider();
    const [trigger, setTrigger] = useState(false)
    const {options}:any = useListProvider();

    const isSelected = selectedValue?.length > 0 && selectedValue.some((i) => i.id == item.id);


    const handleSelect = () => {

        if (item['disabled'] === true) {
            return false
        } else {
            if (options.select === 'checkbox') {
                if (isSelected) {
                    const findItem = selectedValue.filter(i => i !== item)
                    setSelectedValue(findItem);

                } else {
                    setSelectedValue([...selectedValue, item]);
                }
            }
            else if (options.select === 'checkbox-hierarchical') {
                if (isSelected) {
                    const allIdsToRemove = getAllChildrenIds(item, [item]);
                    const findItem = selectedValue.filter(id => !allIdsToRemove.includes(id))
                    setSelectedValue(findItem);

                } else {
                    const allIds = getAllChildrenIds(item, [item]);
                    setSelectedValue([...selectedValue, ...allIds]);
                }
            }
            else {
                setSelectedValue([item]);
            }

        }


        setTrigger(true)
    };

    useEffect(() => {
        if (trigger && options['localStorage'] === true) {
            localStorage.setItem('list', JSON.stringify(selectedValue));
        }
        setTrigger(false)

    }, [trigger]);


    const handleCollapse = () => {
        if (item['disabled'] === true) return false
        else onClick()
    }

    if(type === 'folder') {
        if (options.select === 'checkbox') {
            return (
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <CollapseBtn onCollapse={isOpen} onClick={handleCollapse}/>
                        <Checkbox onChange={handleSelect} disabled={item['disabled']} checked={isSelected} radius={12}/>
                        <FolderIco isOpen={isOpen}/>
                    </div>
                    <Text item={item} isSelected={isSelected} onClick={null}/>
                </>
            )

        } else if (options.select === 'checkbox-hierarchical') {
            return (
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <CollapseBtn onCollapse={isOpen} onClick={handleCollapse}/>
                        <Checkbox onChange={handleSelect} disabled={item['disabled']} checked={isSelected.id}/>
                        <FolderIco isOpen={isOpen}/>
                    </div>
                    <Text item={item} isSelected={isSelected} onClick={null}/>
                </>
            )

        } else if (options.select === 'radio') {
            return (
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <CollapseBtn onCollapse={isOpen} onClick={handleCollapse}/>
                        <Radio checked={isSelected} onChange={handleSelect} />
                        <FolderIco isOpen={isOpen}/>
                    </div>
                    <Text item={item} isSelected={isSelected} onClick={handleSelect}/>
                </>
            )

        } else if (options.select === 'default') {
            return (
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <CollapseBtn onCollapse={isOpen} onClick={handleCollapse}/>
                        <FolderIco isOpen={isOpen}/>
                    </div>
                    <Text item={item} isSelected={isSelected} onClick={handleSelect}/>
                </>
            )

        }
    }
    else if(type === 'file') {
        if (options.select === 'checkbox' || options.select === 'checkbox-hierarchical') {
            return (
                <>
                    <Checkbox onChange={handleSelect} disabled={item['disabled']} checked={isSelected} />
                    <IconFile/>
                    <Text item={item} isSelected={isSelected} onClick={null}/>
                </>
            )

        } else if (options.select === 'radio') {
            return (
                <>
                    <Radio checked={isSelected} onChange={handleSelect} />
                    <IconFile/>
                    <Text item={item} isSelected={isSelected} onClick={null}/>
                </>
            )

        } else if (options.select === 'default') {
            return <>
                <IconFile/>
                <Text item={item} isSelected={isSelected} onClick={handleSelect}/>
            </>

        }
    }

}