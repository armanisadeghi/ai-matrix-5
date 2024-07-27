import AmeRouterIcon from '@/ui/button/AmeRouterIcon';
import { Button } from '@mantine/core';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { TbExternalLinkOff } from "react-icons/tb";
import AmeRouterLink from './AmeRouterLink';

const DemonstrationComponent = () => {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h3>Button Link Example</h3>
                <AmeRouterLink uniqueId="unique-id-1" startPath="/trials/nested" linkTo="some-value" active={false} UrlQueryParams={{ key: 'value' }}>
                    <Button>Go to some path</Button>
                </AmeRouterLink>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Icon Link Example</h3>
                <AmeRouterLink uniqueId="unique-id-2" startPath="/trials/nested" linkTo="another-value" active={true} UrlQueryParams={{ key: 'My favorite' }}>
                    <FaExternalLinkAlt name="arrow-right" />
                </AmeRouterLink>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Text Link Example</h3>
                <AmeRouterLink uniqueId="unique-id-3" startPath="/trials/nested" linkTo="text-value" active={true} UrlQueryParams={{ key: 'Something else here' }}>
                    <span>Navigate to text path</span>
                </AmeRouterLink>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Ame Router Icon Example</h3>
                <AmeRouterIcon uniqueId="unique-id-4" startPath="/trials/nested" linkTo="action-value" active={true} UrlQueryParams={{ key: 'action' }} title="Action Link">
                    <TbExternalLinkOff />
                </AmeRouterIcon>
            </div>
        </div>
    );
};

export default DemonstrationComponent;




