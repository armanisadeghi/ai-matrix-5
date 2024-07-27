import { getApiKey, LiveClient } from '@/utils/speech/deepgram/client';
import { useRecoilState } from 'recoil';
import { LiveSchema, LiveTranscriptionEvents, SpeakSchema } from '@deepgram/sdk';
import { useCallback, useEffect } from 'react';
import { connectionState, connectionReadyState, defaultSttsOptions, defaultTtsOptions } from '@/utils/speech/deepgram/audio/deepgramState';
import { showNotification } from '@mantine/notifications';



export function useDeepgram() {
    const [connection, setConnection] = useRecoilState(connectionState);
    const [connectionReady, setConnectionReady] = useRecoilState(connectionReadyState);

    const connect = useCallback(
        async (defaultSttsOptions: SpeakSchema) => {
            if (!connection && !connectionReady) {
                setConnectionReady(true);

                const connection = new LiveClient(
                    {},
                    defaultSttsOptions
                );

                setConnection(connection);
                setConnectionReady(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [connectionReady, connection]
    );

    useEffect(() => {
        if (connection === undefined) {
            connect(defaultSttsOptions);
        }
    }, [connect, connection]);

    useEffect(() => {
        if (connection && connection.getReadyState() !== undefined) {
            connection.addListener(LiveTranscriptionEvents.Open, () => {
                setConnectionReady(true);
            });

            connection.addListener(LiveTranscriptionEvents.Close, () => {
                showNotification({
                    title: 'Connection Closed',
                    message: 'The connection to Deepgram closed, we\'ll attempt to reconnect.',
                    color: 'red',
                });
                setConnectionReady(false);
                connection.removeAllListeners();
                setConnection(undefined);
            });

            connection.addListener(LiveTranscriptionEvents.Error, () => {
                showNotification({
                    title: 'Error',
                    message: 'An unknown error occurred. We\'ll attempt to reconnect to Deepgram.',
                    color: 'red',
                });
                setConnectionReady(false);
                connection.removeAllListeners();
                setConnection(undefined);
            });
        }

        return () => {
            setConnectionReady(false);
            connection?.removeAllListeners();
        };
    }, [connection, setConnection, setConnectionReady]);

    return {
        connection,
        connectionReady,
    };
}

