import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MeasuringStrategy,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import Point from './Point/Point.tsx'

export default function ListNestedDragAndDrop({ arr }: any) {
    const [items, setItems] = useState(null)

    useEffect(() => {
        setItems(arr)
    }, [arr])

    const [activeId, setActiveId] = useState(null)

    const getItemPost = (id: any) => arr.findIndex((item: any) => item.id === id)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const measuring = {
        droppable: {
            strategy: MeasuringStrategy.Always
        }
    }

    function handleDragStart(event: any) {
        const { active, over } = event
        setActiveId(active)
    }

    function handleDragEnd(event: any) {
        const { active, over } = event
        if (active.id === over.id) return

        setItems((item) => {
            const originPos = getItemPost(active.id)
            const newPos = getItemPost(over.id)

            return arrayMove(items, originPos, newPos)
        })
    }

    if (items !== null) {
        return (
            <div className={'pl-4'}>
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    measuring={measuring}
                >
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        {items.map((item: any) => (
                            <Point key={item.id} item={item} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        )
    }
}
