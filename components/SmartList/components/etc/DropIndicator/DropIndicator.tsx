const DropIndicator = ({isOver} : {isOver: any}) => (
    <div style={{
        height: '2px',
        background: isOver ? 'lightgray' : 'transparent',
        borderRadius: 5,
        transition: 'background 0.2s',
    }}/>
);


export default DropIndicator