import { useEffect } from 'react';
import useEventManager from '@/utils/matrixEvents/useMatrixEvents';

const RegisterEventComponent = () => {
    const { registerEvent } = useEventManager();

    useEffect(() => {
        registerEvent({
            name: 'triggerNavigation',
            id: 'nav1',
            options: [],
            value: null,
        });
    }, [registerEvent]);

    return <div>Event Registered</div>;
};

export default RegisterEventComponent;
