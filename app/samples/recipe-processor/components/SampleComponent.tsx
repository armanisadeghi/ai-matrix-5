import { useReduxSocket } from "@/utils/socketio/useReduxSocket";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    removeDynamicEventListener,
    setupDynamicEventListener,
    submitTaskData,
} from "@/redux/features/dynamicEvents/dynamicEventsThunks";
import { RootState } from "@/redux/store";

const MyComponent: React.FC = () => {
    const dispatch = useDispatch();
    const { socketSid } = useReduxSocket();
    const dynamicEvents = useSelector((state: RootState) => state.dynamicEvents.events);

    useEffect(() => {
        if (socketSid) {
            const eventName = `${socketSid}_my_custom_event`;
            dispatch(setupDynamicEventListener(eventName) as any);

            return () => {
                dispatch(removeDynamicEventListener(eventName) as any);
            };
        }
    }, [socketSid, dispatch]);

    const handleSubmit = () => {
        dispatch(
            submitTaskData({
                eventName: "simple_recipe",
                task: "run_recipe",
                taskData: {
                    /* your task data */
                },
            }) as any,
        );
    };

    return (
        <div>
            {Object.entries(dynamicEvents).map(([eventName, event]) => (
                <div key={eventName}>
                    <h3>{eventName}</h3>
                    <p>Status: {event.status}</p>
                    <pre>{event.textStream}</pre>
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Task</button>
        </div>
    );
};

export default MyComponent;
