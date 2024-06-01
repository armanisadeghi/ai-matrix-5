import FilePoint from "./FilePoint.tsx";
import FolderPoint from "./FolderPoint.tsx";
import {useListProvider} from "../../../SmartList.tsx";
import FolderPointTable from "./FolderPointTable.tsx";
import FilePointTable from "./FilePointTable.tsx";


export default function Point({item}: any) {

    const {options}: any = useListProvider()

    if (item.children !== null) return <FolderPoint item={item}/>
    else return <FilePoint item={item}/>


}

