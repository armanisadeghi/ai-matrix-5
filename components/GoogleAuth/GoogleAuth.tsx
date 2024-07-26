/*
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';

const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual Client ID



const App = () => {
    const onGoogleLoginError = useCallback(() => {

    }, []);

    return(
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={(response) => {
                    console.log('Login Success:', response);
                }}
                onFailure={(error: any) => {
                    console.log('Login Failed:', error);
                }}
                onError={onGoogleLoginError}/>
            {/!* Your other components *!/}
        </GoogleOAuthProvider>
    )
};
*/


// utils/googleApiClient.ts

import { google } from 'googleapis';

const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export const slides = google.slides({ version: 'v1', auth });
