import React from 'react'

interface BrokerProps {
    name: string
    type: string
    required: boolean
    defaultValue: any
}

const Broker: React.FC<BrokerProps> = ({ name, type, required, defaultValue }) => (
    <div className="broker">
        <h3>{name}</h3>
        <p>Type: {type}</p>
        <p>Required: {required ? 'Yes' : 'No'}</p>
        <p>Default Value: {defaultValue}</p>
    </div>
)

export default Broker
