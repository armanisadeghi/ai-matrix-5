"use client";
import { createBrokerManager } from '@/services/brokerService';
import { Button, Flex, Select, Stack } from '@mantine/core';
import LeftPanel from './LeftPanel';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import Search from './Search';
import VerticalSplitter from '@/ui/split/VerticalSplitter';
import BrokerTable from '@/components/Brokers/BrokerTable';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilState, useRecoilValue } from "recoil";
import { overrideFlagAtom, presetTypeAtom } from "@/state/layoutAtoms";
import { brokerDataTypesAtom, brokersAtom, componentsAtom, filteringAtom } from '@/context/atoms/brokerAtoms';
import { useEffect } from 'react';

const BrokersPage: React.FC = (): JSX.Element => {
    const [dataTypes, setDataTypes] = useRecoilState(brokerDataTypesAtom);
    const [filtering, setFiltering] = useRecoilState(filteringAtom);
    const brokerManager = createBrokerManager();
    const fetchedBrokers = useRecoilValue(brokersAtom);
    const fetchedComponents = useRecoilValue(componentsAtom);
    const isTablet = useMediaQuery('(max-width: 768px)');
    const isMobile = useMediaQuery('(max-width: 480px)');
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom);
    const [overrideFlag, setOverrideFlag] = useRecoilState(overrideFlagAtom);
    const fetchData = async () => {
        try {
            const data = await brokerManager.fetchBrokers();
            setDataTypes(data.dataTypes);
        } catch (error) {
            console.error('Error fetching brokers:', error);
        }
    };

    useEffect(() => {
        setOverrideFlag(true);
        setPresetType('iconsNoAside');

        fetchData();
    }, []);

    const handleDataTypeChange = (selectedDataType: string) => {
        setFiltering(selectedDataType);
    };

    return (
        <VerticalSplitter
            initialSizes={isTablet || isMobile ? [0, 100] : [12, 88]}
            children={[
                !isTablet && !isMobile && <LeftPanel key={1} />,
                <Stack key={2}>
                    <Flex gap="md"><Link href="brokers/add">
                        <Button
                            variant="light"
                            leftSection={<IconPlus size={14} />}
                        >
                            Add Broker
                        </Button>
                    </Link>
                        <Search />
                        {dataTypes && (
                            <Select
                                width={200}
                                placeholder="Filter by data type"
                                data={[...dataTypes, "All"]}
                                value={filtering}
                                onChange={(value) => handleDataTypeChange(value as string)}
                                searchable
                            />)}
                    </Flex>
                    {/* <BrokerList brokers={filteredBrokers} />
                    <Space h="lg" /> */}
                    <BrokerTable />
                </Stack>
            ]}
            expandToMin={false} />
    )
}

export default BrokersPage