// matrix-apps/page.tsx

'use client';

import React from 'react';

const cards = [
    {
        title: "Some Cool App",
        description: "This is a really cool app that does something cool!",
        imageUrl: "https://via.placeholder.com/150",
        linkUrl: "https://mantine.dev/"
    },

];


const SampleParentPage = () => {
    return (
        <div>
            <div>This is the Parent App Main Page</div>
            <p className="text-center">In this section, we will need to create an app dashboard for each app</p>

        </div>
    );
};

export default SampleParentPage;
