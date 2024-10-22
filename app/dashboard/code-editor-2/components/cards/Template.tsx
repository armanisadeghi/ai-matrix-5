import { ComponentProps } from "react";

interface TemplateCardProps extends ComponentProps<"div"> {
    template: { label: string; value: string };
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, ...others }) => {
    return (
        <div
            className="p-4 border border-neutral-700 shadow rounded cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:border-neutral-300 hover:bg-neutral-900 duration-300"
            {...others}
        >
            <p className="">{template.label}</p>
        </div>
    );
};