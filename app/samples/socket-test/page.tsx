import React from 'react';
import RecipeComponent from './components/RecipeComponent';
import SocketWithAuth from './components/SocketWithAuth';

const Page: React.FC = () => {

    return (
        <>
            <SocketWithAuth>
                <RecipeComponent/>
            </SocketWithAuth>
        </>
    );
};

export default Page;
