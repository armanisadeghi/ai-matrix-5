import AmePillsInput from './AmePillsInput'

function TagsInput({
    initialTags,
    onTagsChange
}: {
    initialTags: string[]
    onTagsChange?: (tags: string[]) => void
}) {
    return (
        <AmePillsInput
            initialPills={initialTags}
            placeholder="Add tags to make it easy for the conductor AI to use your App."
            label="Tags"
            description=""
            renderPillContent={(tag: string) => tag}
            onPillsChange={onTagsChange}
        />
    )
}

export default TagsInput
