// exampleCode.ts

export const exampleCode = `
import {
  Box,
  BoxProps,
  StylesApiProps,
  factory,
  ElementProps,
  useProps,
  useStyles,
  Factory,
} from '../../core';

import classes from './VisuallyHidden.module.css';

export type VisuallyHiddenStylesNames = 'root';

export interface VisuallyHiddenProps
  extends BoxProps,
    StylesApiProps<VisuallyHiddenFactory>,
    ElementProps<'div'> {}

export type VisuallyHiddenFactory = Factory<{
  props: VisuallyHiddenProps;
  ref: HTMLDivElement;
  stylesNames: VisuallyHiddenStylesNames;
}>;

const defaultProps: Partial<VisuallyHiddenProps> = {};

export const VisuallyHidden = factory<VisuallyHiddenFactory>((_props, ref) => {
  const props = useProps('VisuallyHidden', defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, ...others } = props;

  const getStyles = useStyles<VisuallyHiddenFactory>({
    name: 'VisuallyHidden',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
  });

  return <Box component="span" ref={ref} {...getStyles('root')} {...others} />;
});

VisuallyHidden.classes = classes;
VisuallyHidden.displayName = '@mantine/core/VisuallyHidden';
`

export const cssCode = `
.root {
  &[data-variant='danger'] {
    background-color: var(--mantine-color-red-9);
    color: var(--mantine-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--mantine-color-white);
  }
}
`

export const pythonCode = `
def process_frontend_data(data):
    task = data['task']
    index = data['index']
    user_id = data['uid']

    variable_entries = data.get('variablesData', [])
    response_item = data['responseData'][0]
    messages = data['promptData']
    for message in messages:
        if 'text' in message:
            message['content'] = message.pop('text')

    variables = []
    for entry in variable_entries:
        variable = {
            "name": entry['title'],
            "required": entry.get('required', False),
            "default_value": entry['advanced']['dValue'],
        }
        if entry['flag'] == 'placeholderPattern':
            variable['type'] = 'placeholder'
        elif entry['flag'] == 'sectionPattern':
            variable['type'] = 'section'
        else:
            variable['type'] = 'unknown_type'

        variables.append(variable)

    if response_item['controls']:
        controls = response_item['controls']
    if 'recipeID' in data:
        recipe_id = data['recipeID']
    else:
        recipe_id = 'no_recipe_id'

    prepared_data = {
        'task': data['task'],
        'index': data['index'],
        'recipe_id': recipe_id,
        'version': data['version'],
        'user_id': data['uid'],
        'messages': messages,
        'variables': variables,
        'model': response_item['model'],
        'controls': controls,
        'all_model_params': response_item,
    }

    return user_id, task, index, prepared_data
`

export const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
`

export const javascriptCode = `
function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);
`

export const sqlCode = `
SELECT id, name, age
FROM users
WHERE age > 21
ORDER BY age DESC;
`

export const javaCode = `
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
`

export const csharpCode = `
using System;

class Program {
  static void Main() {
    Console.WriteLine("Hello, World!");
  }
}
`

export const rubyCode = `
def greet(name)
  "Hello, #{name}!"
end

puts greet("World")
`

export const phpCode = `
<?php
function greet($name) {
  return "Hello, " . $name . "!";
}

echo greet("World");
?>
`

export const goCode = `
package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}
`

export const kotlinCode = `
fun main() {
  println("Hello, World!")
}
`

export const swiftCode = `
import Foundation

print("Hello, World!")
`

export const rCode = `
name <- "World"
cat("Hello, ", name, "!\n", sep="")
`

export const shellCode = `
#!/bin/bash
echo "Hello, World!"
`

export const markdownCode = `
# Hello, World!

This is a sample markdown file.

- Item 1
- Item 2
- Item 3
`

export const yamlCode = `
name: John Doe
age: 30
isAdmin: false
courses:
  - HTML
  - CSS
  - JavaScript
`

export const rustCode = `
fn main() {
  println!("Hello, World!");
}
`

export const cppCode = `
#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}
`

export const typescriptCode = `
// ui/highlight/AmeCodeTabs.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { LoadingOverlay, Space } from '@mantine/core';
import '@mantine/code-highlight/styles.css';
import styles from './AmeCodeHighlight.module.css';

const CodeHighlightTabs = dynamic(
    () => import('@mantine/code-highlight').then((mod) => mod.CodeHighlightTabs),
    { ssr: false }
);

interface AmeCodeTabsProps {
    codeSnippets: { code: string; language: string; title: string }[];
    startCollapsed?: boolean;
    useLoadingEffect?: boolean;
}

const AmeCodeTabs: React.FC<AmeCodeTabsProps> = ({
    codeSnippets,
    startCollapsed = false,
    useLoadingEffect = false,
}) => {
    const [loading, setLoading] = useState(useLoadingEffect);

    useEffect(() => {
        if (useLoadingEffect) {
            const timer = setTimeout(() => setLoading(false), 1000); // Adjust the timer as needed
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [useLoadingEffect]);

    const formattedSnippets = codeSnippets.map(snippet => ({
        fileName: snippet.title,
        code: snippet.code,
        language: snippet.language,
    }));

    return (
        <div className={styles.codeSection}>
            <Space h="xs" />
            {useLoadingEffect && (
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'pink', type: 'bars' }}
                />
            )}
            {!loading && (
                <CodeHighlightTabs
                    withExpandButton
                    defaultExpanded={!startCollapsed}
                    expandCodeLabel="Show full code"
                    collapseCodeLabel="Show less"
                    code={formattedSnippets}
                />
            )}
            <Space h="xs" />
        </div>
    );
};

export default AmeCodeTabs;

`

export const pythonCodeShort = `
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
`

export const jsonCode = `
{
  "name": "John Doe",
  "age": 30,
  "isAdmin": false,
  "courses": ["HTML", "CSS", "JavaScript"]
}
`
