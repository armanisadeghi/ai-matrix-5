// hooks/useToggleSizes.ts
import { useRecoilState } from "recoil";
import { iconSizesAtom } from "@/state/IconAtoms";

const useToggleSizes = () => {
    const [_iconSize, setIconSize] = useRecoilState(iconSizesAtom);

    const toggleIconSize = (size: "lg" | "md" | "sm" | number) => {
        switch (size) {
            case "lg":
                setIconSize(24);
                break;
            case "sm":
                setIconSize(16);
                break;
            case "md":
                setIconSize(18);
                break;
            default:
                setIconSize(size);
                break;
        }
    };

    return { toggleIconSize };
};

export default useToggleSizes;
