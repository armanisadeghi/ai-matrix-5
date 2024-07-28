import { useListProvider } from "@/components/SmartList/SmartList";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MeasuringStrategy,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

export default function DragAndDropWrapper({ children }) {
    const [activeId, setActiveId] = useState(null);

    const { list, setList }: any = useListProvider();

    const getItemPost = (id) => list.findIndex((item) => item.id === id);

    function searchId(data, targetId) {
        for (let item of data) {
            if (item.id === targetId) {
                return item;
            }
            if (item.children) {
                let result = searchId(item.children, targetId);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }

    function handleDragStart(event: any) {
        const { active, over } = event;
        setActiveId(active);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id === over.id) return;

        setList((item) => {
            const originPos = getItemPost(active.id);
            const newPos = getItemPost(over.id);
            return arrayMove(list, originPos, newPos);
        });
    }

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const measuring = {
        droppable: {
            strategy: MeasuringStrategy.Always,
        },
    };
    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={measuring}
        >
            <SortableContext items={list} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
}
