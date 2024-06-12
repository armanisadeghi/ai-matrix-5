import ListNested from "../ListNested";
import {useListProvider} from "../../../SmartList";
import {useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import ListNestedDragAndDrop from "../ListNestedDragAndDrop";
import Selector from '../../etc/Selector/Selector'
import DropIndicator from "../../etc/DropIndicator/DropIndicator";
import {Text, useMantineColorScheme} from "@mantine/core";





export default function FolderPoint({item}) {
    const [isOpen, setIsOpen] = useState(false)
    const {selectedValue, setSelectedValue}:any = useListProvider();
    const {options}: any = useListProvider();
    const {isOver, isDragging, attributes, listeners, setNodeRef, transform, transition,} = useSortable({id: item.id});

    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const getBackgroundColor = (isHovered) => {
        if (item.disabled) return 'transparent';
        if (isHovered) {
            return colorScheme === 'dark' ? '#333' : '#f5f5f5';
        }
        return 'transparent';
    };

    const style = transform ? {
        transform: CSS.Transform.toString(transform),
        cursor: isDragging ? "grabbing" : "grab",
        transition,

    } : undefined;


    function nestedType(arr) {
        if (options['dnd'] === true) {
            return <ListNestedDragAndDrop arr={arr}/>
        } else {
            return <ListNested arr={arr}/>
        }
    }


    return (
        <>
            <DropIndicator isOver={isOver} />
            <li
                style={{
                    ...style,
                    cursor: item['disabled'] ? 'default' : 'pointer',
                    listStyle: 'none',
                    paddingLeft: item.deep * 24,
                    paddingRight: '1rem',
                    borderRadius: '0.5rem',
                    opacity: item['disabled'] ? 0.5 : 1,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getBackgroundColor(true)}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = getBackgroundColor(false)}

                ref={setNodeRef}
                {...attributes}
                {...listeners}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        position: 'relative',
                        paddingLeft: '1rem',
                        width: '100%',
                    }}
                >
                    <Selector item={item} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} type={'folder'} />
                    {options.counter && (
                        <Text size={'sm'} style={{ marginLeft: 'auto', width: 'fit-content', display: 'block', margin: '0 0 0 auto' }}>
                            {item.children?.length}
                        </Text>
                    )}
                </div>
            </li>
            {isOpen && nestedType(item.children)}
        </>

    )

}