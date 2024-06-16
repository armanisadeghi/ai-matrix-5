// @ts-ignore
import folderMinusIco from "../../../../assets/icons/folderMinus.svg";
// @ts-ignore// @ts-ignore
import folderPlusIco from "../../../../assets/icons/folderPlus.svg";
import { IconFolderPlus, IconFolderMinus } from '@tabler/icons-react';
const FolderIco = ({isOpen} : {isOpen: boolean | null}) => {
    if (isOpen) return <IconFolderMinus />
    else return    <IconFolderPlus  />

}

export default FolderIco