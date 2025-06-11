import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';

const AdaptiveSplash = () => {
  const screenWidth = Dimensions.get('window').width;
  
  const getSplashImage = () => {
    // 画面幅に基づいて適切な画像を返す
    if (screenWidth <= 480) {
      return require('../../assets/splash/splash-hdpi.png');
    } else if (screenWidth <= 720) {
      return require('../../assets/splash/splash-xhdpi.png');
    } else if (screenWidth <= 1080) {
      return require('../../assets/splash/splash-xxhdpi.png');
    } else {
      return require('../../assets/splash/splash-xxxhdpi.png');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={getSplashImage()}
        style={styles.splashImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500', // オレンジ色の背景
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: '80%',
    height: '80%',
  },
});

export default AdaptiveSplash;