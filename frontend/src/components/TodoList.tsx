import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Todo } from '../types/todo';

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoText, setNewTodoText] = useState('');

    const addTodo = () => {
        if (newTodoText.trim() === '') return;

        const newTodo: Todo = {
            id: Date.now(),
            text: newTodoText,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setNewTodoText('');
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newTodoText}
                    onChangeText={setNewTodoText}
                    placeholder="新しいTODOを入力"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                    <Text style={styles.addButtonText}>追加</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.todoItem}
                        onPress={() => toggleTodo(item.id)}
                    >
                        <Text style={[
                            styles.todoText,
                            item.completed && styles.completedTodo
                        ]}>
                            {item.text}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    todoItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    todoText: {
        fontSize: 16,
    },
    completedTodo: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
});

export default TodoList; 