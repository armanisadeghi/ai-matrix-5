// app/samples/component-tester/useTestPage.ts

import { useState } from 'react'
import { propDefinitions, componentMap } from './componentConfig'

export const useTestPage = () => {
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
    const [props, setProps] = useState<{ [key: string]: any }>({})
    const [error, setError] = useState<string | null>(null)
    const [refreshKey, setRefreshKey] = useState(0) // Key to force component reload

    const handleComponentChange = (value: string | null) => {
        setSelectedComponent(value)
        setError(null)
        if (value) {
            setProps(propDefinitions[value] || {})
        }
    }

    const handlePropChange = (propPath: string, value: any) => {
        setProps((prevProps) => {
            const updatedProps = { ...prevProps }
            const keys = propPath.split('.')
            let temp: any = updatedProps

            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    temp[key] = value
                } else {
                    if (!temp[key]) {
                        temp[key] = {}
                    }
                    temp = temp[key]
                }
            })

            return updatedProps
        })
    }

    const handleRefreshComponent = () => {
        setRefreshKey((prevKey) => prevKey + 1)
    }

    let RenderedComponent = null
    let componentLocation = ''
    try {
        RenderedComponent = selectedComponent ? componentMap[selectedComponent] : null
        if (selectedComponent) {
            componentLocation = selectedComponent
        }
    } catch (err) {
        setError(`Error loading component: ${(err as Error).message}`)
    }

    return {
        selectedComponent,
        handleComponentChange,
        props,
        propDefinitions,
        handlePropChange,
        handleRefreshComponent,
        refreshKey,
        error,
        RenderedComponent,
        componentLocation
    }
}
