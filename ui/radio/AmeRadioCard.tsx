import { Flex, Radio, RadioCardProps, Text } from "@mantine/core";
import classes from "./AmeRadioCard.module.css";

interface AmeRadioCardProps extends Partial<RadioCardProps> {
    description?: string;
    icon?: React.FC<any>;
    withIndicator?: boolean;
}

function AmeRadioCard({ description, icon: Icon, ...others }: AmeRadioCardProps) {
    return (
        <Radio.Card className={classes.root} radius="md" {...others}>
            <Flex wrap="nowrap" align="center" gap="md">
                {Icon && <Icon />}
                <div>
                    <Text className={classes.label}>{others.name}</Text>
                    {description && <Text className={classes.description}>{description}</Text>}
                </div>
                <Radio.Indicator ml="auto" />
            </Flex>
        </Radio.Card>
    );
}

export default AmeRadioCard;
