import { useListProvider } from '../../../SmartList'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Selector from '../../etc/Selector/Selector'
import DropIndicator from '../../etc/DropIndicator/DropIndicator'
import { theme } from '@/theme'
import { useMantineColorScheme } from '@mantine/core'

export default function FilePoint({ item }) {
    const { options, selectedValue }: any = useListProvider()
    const { isOver, isDragging, attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: item.id
        })

    const { colorScheme, setColorScheme } = useMantineColorScheme()

    const getBackgroundColor = (isHovered) => {
        if (item.disabled) return 'transparent'
        if (isHovered) {
            return colorScheme === 'dark' ? '#333' : '#f5f5f5'
        }
        return 'transparent'
    }

    const style = transform
        ? {
              transform: CSS.Transform.toString(transform),
              cursor: isDragging ? 'grabbing' : 'grab',
              transition
          }
        : undefined
    return (
        <>
            <DropIndicator isOver={isOver} />
            <li
                style={{
                    ...style,
                    listStyle: 'none',
                    cursor: item['disabled'] ? 'default' : 'pointer',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    borderRadius: '0.5rem',
                    opacity: item['disabled'] ? 0.5 : 1,
                    transition: 'background-color 0.3s'
                }}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = getBackgroundColor(true))
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = getBackgroundColor(false))
                }
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        position: 'relative',
                        paddingLeft: item.deep * 24,
                        width: '100%'
                    }}
                >
                    <Selector item={item} type={'file'} onClick={null} isOpen={null} />
                </div>
            </li>
        </>
    )
}
