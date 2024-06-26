import { Flex, Radio, RadioCardProps, Text } from "@mantine/core";
import classes from "./AmeRadioCard.module.css";
import { useRecoilState } from "recoil";
import { iconSizesAtom } from "@/state/IconAtoms";

interface AmeRadioCardProps extends Partial<RadioCardProps> {
    description?: string;
    icon?: React.FC<any>;
    withIndicator?: boolean;
}

function AmeRadioCard({ description, icon: Icon, ...others }: AmeRadioCardProps) {
    const [iconSize] = useRecoilState(iconSizesAtom);

    return (
        <Radio.Card className={classes.root} radius="md" {...others}>
            <Flex wrap="nowrap" align="center" gap="md">
                {Icon && <Icon size={iconSize} />}
                <div>
                    <Text className={classes.label} aria-label={others.name}>
                        {others.name}
                    </Text>
                    {description && (
                        <Text className={classes.description} aria-label={description}>
                            {description}
                        </Text>
                    )}
                </div>
                <Radio.Indicator ml="auto" />
            </Flex>
        </Radio.Card>
    );
}

export default AmeRadioCard;
