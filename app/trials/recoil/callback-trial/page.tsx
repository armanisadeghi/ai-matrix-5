'use client';

import { Button, Space } from '@mantine/core';
import { atom, useRecoilCallback } from 'recoil';


const itemsInCart = atom({
    key: 'itemsInCart',
    default: 0,
});

function CartInfoDebug() {
    const addItemToCart = useRecoilCallback(({set}) => () => {
        set(itemsInCart, (prev) => prev + 1);
    });

    const logCartItems = useRecoilCallback(({snapshot}) => async () => {
        const numItemsInCart = await snapshot.getPromise(itemsInCart);
        console.log('Items in cart: ', numItemsInCart);
    }, []);

    return (
        <div>
            <div>
                <button onClick={logCartItems}>Log Cart Items</button>
            </div>
            <Space h="lg"/>
            <div>
                <Button onClick={addItemToCart}>Add Item to Cart</Button>
            </div>
        </div>
    );
};

export default CartInfoDebug;
