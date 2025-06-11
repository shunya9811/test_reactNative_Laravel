# React Native Frontend Files

## 1. App.js

```javascript
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// APIのベースURL（開発環境用）
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      Alert.alert('エラー', 'TODOの取得に失敗しました');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async () => {
    if (!title.trim()) {
      Alert.alert('エラー', 'タイトルを入力してください');
      return;
    }

    try {
      const response = await api.post('/todos', {
        title: title.trim(),
        description: description.trim(),
      });
      setTodos([response.data, ...todos]);
      setTitle('');
      setDescription('');
    } catch (error) {
      Alert.alert('エラー', 'TODOの作成に失敗しました');
      console.error('Error creating todo:', error);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const response = await api.put(`/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map(t => t.id === todo.id ? response.data : t));
    } catch (error) {
      Alert.alert('エラー', 'TODOの更新に失敗しました');
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (todoId) => {
    Alert.alert(
      '確認',
      'このTODOを削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/todos/${todoId}`);
              setTodos(todos.filter(t => t.id !== todoId));
            } catch (error) {
              Alert.alert('エラー', 'TODOの削除に失敗しました');
              console.error('Error deleting todo:', error);
            }
          }
        }
      ]
    );
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item)}
      >
        <View style={styles.todoText}>
          <Ionicons
            name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={item.completed ? '#4CAF50' : '#ccc'}
          />
          <View style={styles.textContainer}>
            <Text style={[
              styles.todoTitle,
              item.completed && styles.completedText
            ]}>
              {item.title}
            </Text>
            {item.description ? (
              <Text style={[
                styles.todoDescription,
                item.completed && styles.completedText
              ]}>
                {item.description}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.loadingText}>読み込み中...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TODO リスト</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="TODOのタイトル"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="説明（オプション）"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={2}
        />
        <TouchableOpacity style={styles.addButton} onPress={createTodo}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>追加</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id.toString()}
        style={styles.todoList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>TODOがありません</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 60,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  todoList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  todoItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});
```

## 2. package.json の依存関係（追加分）

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "@expo/vector-icons": "^13.0.0"
  }
}
```

## セットアップコマンド

```bash
# Expo プロジェクト作成
npx create-expo-app frontend
cd frontend

# 依存関係インストール
npm install axios @expo/vector-icons

# 開発サーバー起動
npx expo start
```

## 実機テスト時の注意

App.jsの `API_BASE_URL` を以下のように変更してください：

```javascript
// 実機テスト時（PCのIPアドレスを確認して変更）
const API_BASE_URL = 'http://192.168.1.100:8000/api';
```