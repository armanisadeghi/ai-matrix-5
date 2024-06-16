import {useEffect, useState} from "react";
// @ts-ignore
import Point from "./Point/Point.tsx";
// @ts-ignore
import {useListProvider} from "../../SmartList.tsx";

export default function ListNested({arr}: any) {
    const {options}: any = useListProvider();

    const [items, setItems] = useState<any[] | null>(null)


    useEffect(() => {
        setItems(arr)
    }, [arr])


    if (items !== null) {
        if (options.type === 'table') {

            return (
                <>
                    {items.map((item) => (
                        <Point key={item.id} item={item}/>
                    ))}

                </>
            )
        } else {

            return (
                <div className={`pl-4`}>
                    {items.map((item) => (
                        <Point key={item.id} item={item}/>
                    ))}

                </div>
            )
        }

    }

}
