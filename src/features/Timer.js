import React, { useState } from 'react';
import { Text, View, StyleSheet,Platform,Vibration } from 'react-native';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];


export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.0);

  const onEnd = () => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    onTimerEnd(focusSubject);
  };

  const onReset = () => {
    setMinutes(0.2);
    setIsStarted(false);
    setProgress(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={(millis) => setProgress(millis)}
          onEnd={onEnd}
          onReset={onReset} // pass onReset function down to Countdown component
        />


        
        
    
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={{ padding: spacing.sm }}>
        <ProgressBar
        progress={progress}
         color={colors.progressBar} style={{height:spacing.sm}} />
      </View>
      <View style={styles.timingwrapper} >
<Timing onChangeTime={setMinutes} />

</View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
<View style={styles.clearSubjectwrapper}>
  <RoundedButton size={50} title="-" onPress={clearSubject} />
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingwrapper: { 
flex:0.1,
flexDirection:'row',
paddingTop:spacing.xxl


  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
clearSubjectwrapper: {
flexDirection:'row',
justifyContent:'center'
 },

  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
