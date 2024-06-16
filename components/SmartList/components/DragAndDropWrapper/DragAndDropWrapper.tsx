
import {
    closestCenter,
    DndContext, DragOverlay,
    KeyboardSensor, MeasuringStrategy, MouseSensor,
    PointerSensor,
    TouchSensor,
    useDroppable,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {useEffect, useState} from "react";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { useListProvider } from "@/components/SmartList/SmartList";


export default function DragAndDropWrapper({children} : {children: any}) {
    const [activeId, setActiveId] = useState<any[] | null>(null);

    const {list, setList}: any = useListProvider();


    const getItemPost = (id :any) => list.findIndex((item: any) => item.id === id)
    //@ts-ignore
    function searchId(data: any, targetId: any) {
        for (let item of data) {
            if (item.id === targetId) {
                return item;
            }
            if (item.children) {
                //@ts-ignore
                let result = searchId(item.children, targetId);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }


    function handleDragStart(event: any) {
        const {active, over} = event;
        setActiveId(active);

    }


    function handleDragEnd(event : any) {
        const {active, over} = event;
        if (active.id === over.id) return;
    //@ts-ignore
        setList(item => {
            const originPos = getItemPost(active.id)
            const newPos = getItemPost(over.id)
            return arrayMove(list, originPos, newPos)
        })


    }


    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 3},}),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    )


    const measuring = {
        droppable: {
            strategy: MeasuringStrategy.Always
        }
    };
    return (
        <DndContext
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={measuring}
        >
            <SortableContext items={list} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>

        </DndContext>
    )
}