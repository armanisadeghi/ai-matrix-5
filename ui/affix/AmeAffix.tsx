import { Affix, AffixProps, Transition, TransitionProps } from "@mantine/core";

interface AmeAffixProps extends AffixProps {
    mounted?: boolean;
    transition?: TransitionProps["transition"];
}

function AmeAffix({ mounted, transition = "fade", ...others }: AmeAffixProps) {
    return (
        <Affix {...others}>
            <Transition transition={transition} mounted={mounted ?? false}>
                {(transitionStyles) => <div style={transitionStyles}>{others.children}</div>}
            </Transition>
        </Affix>
    );
}

export default AmeAffix;
