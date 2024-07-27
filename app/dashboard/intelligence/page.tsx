// app/dashboard/intelligence/page.tsx

import React from "react";
import IntelligenceClientContent from './IntelligenceClientContent';

export default function IntelligencePage() {
    return (
        <div className="intelligence-page">
            <h1>Intelligence Module Home Page</h1>
            <IntelligenceClientContent />
        </div>
    );
}
