import { Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React, { useRef } from 'react';
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from 'expo-sharing';

import styles from './styles';

const SocialShare = () => {
    const ref = useRef();
    const imagePlaceholder =
      'https://images.unsplash.com/photo-1673209139602-30b6e9100131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
  
    const shareImage = async () => {
      try {
        const uri = await captureRef(ref, {
          format: 'png',
          quality: 0.7,
        });
        console.log('uri', uri);
        await Sharing.shareAsync(uri);

        // await Share.open({url: uri});
      } catch (e) {
        console.log(e);
      }
    };
  
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.titleText}>React Native Image Share</Text>
          <ViewShot ref={ref}>
            {/* <Image
              style={styles.generatedImage}
              source={{
                uri: imagePlaceholder,
              }}
            /> */}
            <View style={{width:100, height: 100, backgroundColor: 'red'}}>
                <Text>HELLO</Text>
            </View>
          </ViewShot>
  
          <TouchableOpacity style={styles.generateButton} onPress={shareImage}>
            <Text style={styles.generateButtonText}>share</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

export default SocialShare;