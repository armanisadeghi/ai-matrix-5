"use client";

import { PaymentForm, UserBillingForm } from "@/components";

function Billing() {
    return (
        <>
            <UserBillingForm mb="md" />
            <PaymentForm />
        </>
    );
}

export default Billing;
