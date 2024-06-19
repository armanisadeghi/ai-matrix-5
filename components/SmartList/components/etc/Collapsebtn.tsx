import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'

const CollapseBtn = ({ onCollapse, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                position: 'absolute',
                height: '24px',
                top: 0,
                right: 0,
                bottom: 0,
                left: -24,
                margin: 'auto 0',
                width: 'fit-content'
            }}
        >
            {!onCollapse ? <IconChevronRight /> : <IconChevronDown />}
        </div>
    )
}

export default CollapseBtn
