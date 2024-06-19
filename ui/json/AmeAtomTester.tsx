import { FC } from 'react'
import { RecoilState, useRecoilValue } from 'recoil'
import { Group } from '@mantine/core'
import AmeJsonInput from '@/ui/json/AmeJsonInput'

interface AtomInfo {
    atom: RecoilState<any>
    name: string
}

interface AtomsJsonViewerProps {
    atomsInfo: AtomInfo[]
}

const AtomsJsonViewer: FC<AtomsJsonViewerProps> = ({ atomsInfo }) => {
    const formatLabel = (name: string) =>
        name
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/^./, (str) => str.toUpperCase())

    return (
        <Group justify="center" gap="sm">
            {atomsInfo.map((info, index) => {
                const atomValue = useRecoilValue(info.atom)
                const atomName = formatLabel(info.name)
                return (
                    <AmeJsonInput
                        key={index}
                        label={atomName}
                        value={JSON.stringify(atomValue, null, 2)}
                    />
                )
            })}
        </Group>
    )
}

export default AtomsJsonViewer
