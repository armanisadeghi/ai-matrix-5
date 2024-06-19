import FilePoint from './FilePoint'
import FolderPoint from './FolderPoint'
import { useListProvider } from '../../../SmartList'
// import FolderPointTable from "./FolderPointTable";
// import FilePointTable from "./FilePointTable";

export default function Point({ item }: any) {
    const { options }: any = useListProvider()

    if (item.children !== null) return <FolderPoint item={item} />
    else return <FilePoint item={item} />
}
