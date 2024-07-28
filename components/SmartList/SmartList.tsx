import { createContext, useContext, useEffect, useState } from "react";
import ListBasic from "./components/ListBasic/ListBasic";

const MyContext = createContext({});

export const SmartList = ({ option, data, disable, selectAll, onSelectedValueChange }: any) => {
    const [selectedValue, setSelectedValue] = useState([]);
    const [list, setList] = useState(data);
    const [options, setOptions] = useState(option);

    useEffect(() => {
        if (onSelectedValueChange) {
            if (typeof onSelectedValueChange === "function") {
                onSelectedValueChange(selectedValue);
            } else {
                console.error("onSelectedValueChange is not a function");
            }
        }
    }, [selectedValue]);

    return (
        <MyContext.Provider value={{ selectedValue, setSelectedValue, options, setOptions, list, setList }}>
            <ul className={""}>
                <ListBasic disable={disable} selectAll={selectAll} />
            </ul>
        </MyContext.Provider>
    );
};

export const useListProvider = () => useContext(MyContext);
