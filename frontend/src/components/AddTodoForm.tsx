import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import todoApi from '../api/todoApi';

interface AddTodoFormProps {
    onTodoAdded: () => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onTodoAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        if (!title.trim()) return;

        try {
            await todoApi.create({
                title: title.trim(),
                description: description.trim() || undefined,
            });
            setTitle('');
            setDescription('');
            onTodoAdded();
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Todo title"
                placeholderTextColor="#999"
            />
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Description (optional)"
                placeholderTextColor="#999"
                multiline
            />
            <TouchableOpacity
                style={[
                    styles.button,
                    !title.trim() && styles.buttonDisabled
                ]}
                onPress={handleSubmit}
                disabled={!title.trim()}
            >
                <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    input: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        fontSize: 16,
    },
    descriptionInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddTodoForm; 