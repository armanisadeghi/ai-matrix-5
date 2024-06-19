// pages/MarkdownDemo.tsx
'use client'

import AmeMarkdownBeautifier from '@/components/RichTextEditor/AmeMarkdownBeautifier'
import RichTextEditorPage from '@/components/RichTextEditor/RichTextEditorPage'

const markdownContent = `
<h2 style="text-align: center;">Welcome to AI Matrix</h2>
<p><code>AI Matrix</code> is a business automation platform powered by AI. It simplifies and automates various business processes:</p>
<ul>
  <li><strong>Task Management</strong>: Organize and prioritize tasks with ease</li>
  <li><strong>Data Analysis</strong>: Gain insights with automated data processing</li>
  <li><strong>Customer Support</strong>: Provide 24/7 support with AI chatbots</li>
  <li><strong>Reporting</strong>: Generate comprehensive reports with a click</li>
</ul>
<p>Here is an example of a function in our automation system:</p>
<pre><code class="language-ts">// AI Task Assignment Function

const assignTask = (task: string, assignee: string): string => {
  return \`Task: \${task} has been assigned to \${assignee}\`;
};

console.log(assignTask('Review Q1 Report', 'Alice'));
</code></pre>
<p>Get started with AI Matrix and revolutionize your business operations.</p>
`

const MarkdownDemo = () => {
    const handleSave = (content: string) => {
        console.log('Saved content:', content)
        // Save logic here
    }

    return (
        <div>
            <RichTextEditorPage content={markdownContent} onSave={handleSave} />
        </div>
    )
}

export default MarkdownDemo
