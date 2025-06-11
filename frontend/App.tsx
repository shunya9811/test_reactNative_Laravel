import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AdaptiveSplash from './src/components/AdaptiveSplash';
import TodoList from './src/components/TodoList';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // スプラッシュスクリーンを表示する時間を設定
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2秒後に非表示
  }, []);

  if (isLoading) {
    return <AdaptiveSplash />;
  }

  return (
    <View style={styles.container}>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});
