import React from 'react'

interface TagProps {
    tag: string
}

const Tag: React.FC<TagProps> = ({ tag }) => <span className="tag">{tag}</span>

export default Tag
