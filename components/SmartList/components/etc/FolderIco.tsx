
import folderMinusIco from "../../../../assets/icons/folderMinus.svg";

import folderPlusIco from "../../../../assets/icons/folderPlus.svg";
import { IconFolderPlus, IconFolderMinus } from '@tabler/icons-react';
const FolderIco = ({isOpen}) => {
    if (isOpen) return <IconFolderMinus />
    else return    <IconFolderPlus  />

}

export default FolderIco