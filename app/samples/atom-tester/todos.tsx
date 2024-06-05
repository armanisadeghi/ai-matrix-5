import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";

interface TodoItem {
    id: number;
    text: string;
    isComplete: boolean;
}

interface TodoItemProps {
    item: TodoItem;
}

const todoListState = atom<TodoItem[]>({
    key: 'TodoList',
    default: [],
});

function TodoList() {
    const todoList: TodoItem[] = useRecoilValue(todoListState);

    return (
        <>
            {/* <TodoListStats /> */}
            {/* <TodoListFilters /> */}
            <TodoItemCreator />

            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </>
    );
}

function TodoItemCreator() {
    const [inputValue, setInputValue] = useState<string>('');
    const setTodoList = useSetRecoilState(todoListState);

    const addItem = () => {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            },
        ]);
        setInputValue('');
    };

    const onChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(value);
    };

    return (
        <div>
            <input type="text" value={inputValue} onChange={onChange} />
            <button onClick={addItem}>Add</button>
        </div>
    );
}

// utility for creating unique Id
let id = 0;
function getId(): number {
    return id++;
}

function TodoItem({item}: TodoItemProps) {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index: number = todoList.findIndex((listItem) => listItem === item);

    const editItemText = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: value,
        });

        setTodoList(newList);
    };

    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            isComplete: !item.isComplete,
        });

        setTodoList(newList);
    };

    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index);

        setTodoList(newList);
    };

    return (
        <div>
            <input type="text" value={item.text} onChange={editItemText} />
            <input
                type="checkbox"
                checked={item.isComplete}
                onChange={toggleItemCompletion}
            />
            <button onClick={deleteItem}>X</button>
        </div>
    );
}

function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex<T>(arr: T[], index: number): T[] {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
