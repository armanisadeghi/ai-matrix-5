/*
// components/GoogleSheetsExport.tsx
import { tableToData } from '@/components/AiChat/Response/markdown/utils';
import React, { useState } from 'react';
import { Button, Modal } from '@mantine/core';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import axios from 'axios';

interface GoogleSheetsExportProps {
    tableRef: React.RefObject<HTMLTableElement>;
    opened: boolean;
    onClose: () => void;
}

const GoogleSheetsExport: React.FC<GoogleSheetsExportProps> = ({ tableRef, opened, onClose }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const handleExportToGoogleSheets = () => {
        const tableElement = tableRef.current;
        if (tableElement && accessToken) {
            const data = tableToData(tableElement);
            const headers = data.headers;
            const rows = data.rows;
            (async () => {
                try {
                    const createSheetResponse = await axios.post(
                        'https://sheets.googleapis.com/v4/spreadsheets',
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        }
                    );

                    const sheetId = createSheetResponse.data.spreadsheetId;
                    const sheetName = 'Sheet1';

                    await axios.put(
                        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:append`,
                        {
                            values: [headers, ...rows]
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            },
                            params: {
                                valueInputOption: 'RAW'
                            }
                        }
                    );

                    console.log('Sheet updated successfully');
                } catch (error) {
                    console.error('Error creating/updating Google Sheets:', error);
                }
            })();
        } else {
            console.error('Table element not found or not authenticated');
        }
    };

    const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('accessToken' in response) {
            setAccessToken(response.accessToken);
        }
    };

    const onFailure = (error: any) => {
        console.error('Login Failed:', error);
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Export to Google Sheets">
            <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
                onSuccess={onSuccess}
                onFailure={onFailure}
                scope="https://www.googleapis.com/auth/spreadsheets"
            />
            <Button onClick={handleExportToGoogleSheets} disabled={!accessToken} mt="md">
                Export to Google Sheets
            </Button>
        </Modal>
    );
};

export default GoogleSheetsExport;
*/
