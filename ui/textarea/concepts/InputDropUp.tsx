import { Select } from '@mantine/core';
import React from 'react';

function InputDropUp() {
    return (
        <Select
            data={[
                {group: 'Coding', items: ['React', 'Python', 'TypeScript', 'Next.js App Router', 'Mantine UI', 'Other coding']},
                {group: 'Writing', items: ['Content Structure', 'Blog Content', 'sales Copy', 'SEO Content', 'Other Writing']},
                {group: 'Planning', items: ['Project Planning', 'Scheduling']},
                {group: 'Marketing', items: ['Social Media', 'SEO', 'PPC', 'Email Marketing', 'Other Marketing']},
                {group: 'School', items: ['Assignment Planning', 'Research', 'Essay Writing', 'Other School']},
                {group: 'Travel', items: ['Trip Planning', 'Other Travel']},
                {group: 'HR', items: ['Hiring', 'Job Search']},
                {group: 'Legal', items: ['Contracts', 'Workers Comp', 'Family Law']},
            ]}
            defaultValue=""
            placeholder="Favorite Agents"
            searchable
            maxDropdownHeight={400}
            nothingFoundMessage="Nobody here"
            clearable
            style={{ width: '33%' }}
            onClick={(e) => { e.stopPropagation(); }}
        />
    );
}

export default InputDropUp;

/*

 import React from 'react';
 import { Select } from '@mantine/core';

 const data = [
 { value: 'python', label: 'Python Code Debugger' },
 { value: 'react', label: 'React TypeScript Specialist' },
 { value: 'mantine', label: 'Mantine UI Expert' },
 { value: 'nextjs', label: 'Next.js 14 App Router Expert' },
 ];

 function InputDropUp() {
 return (
 <Select
 placeholder="Custom instructions"
 data={data}
 searchable
 maxDropdownHeight={400}
 nothingFoundMessage="Nobody here"
 clearable
 />
 );
 }

 export default InputDropUp;


 */

/*
 import React, { forwardRef } from 'react';
 import { Group, Avatar, Text, Select } from '@mantine/core';
 import { AiOutlinePython } from "react-icons/ai";
 import { FaReact } from "react-icons/fa";
 import { TbBrandMantine, TbBrandNextjs } from "react-icons/tb";

 interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
 icon: React.ElementType;
 label: string;
 description: string;
 }

 const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
 ({ icon: Icon, label, description, ...others }: ItemProps, ref) => (
 <div ref={ref} {...others}>
 <Group wrap="nowrap">
 <Avatar>
 <Icon size="1.5rem" />
 </Avatar>
 <div>
 <Text size="sm">{label}</Text>
 <Text size="xs" c="dimmed">
 {description}
 </Text>
 </div>
 </Group>
 </div>
 )
 );

 SelectItem.displayName = 'SelectItem';

 const data = [
 {
 value: 'python',
 label: 'Python Code Debugger',
 description: 'Debug your toughest Python code',
 icon: AiOutlinePython,
 },
 {
 value: 'react',
 label: 'React TypeScript Specialist',
 description: 'Generate High-Quality React & TypeScript code',
 icon: FaReact,
 },
 {
 value: 'mantine',
 label: 'Mantine UI Expert',
 description: 'Build great UI Components with Mantine',
 icon: TbBrandMantine,
 },
 {
 value: 'nextjs',
 label: 'Next.js 14 App Router Expert',
 description: 'Get code specifically for App Router in Next.js 14',
 icon: TbBrandNextjs,
 },
 ];

 function InputDropUp() {
 return (
 <Select
 placeholder="Custom instructions"
 itemComponent={SelectItem}
 data={data}
 searchable
 maxDropdownHeight={400}
 nothingFoundMessage="Nobody here"
 /!*
 filter={(value, item) =>
 item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
 item.description.toLowerCase().includes(value.toLowerCase().trim())
 }
 *!/
 allowDeselect={false}
 clearable
 />
 );
 }

 export default InputDropUp;
 */
