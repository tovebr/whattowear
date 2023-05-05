import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

interface LogoProps {
  height?: number;
  width?: number;
  marginTop?: number;
  marginBottom?: number;
  color?: string;
}

export default function Logo(props: LogoProps) {
  const color = props.color ? props.color : '#577d86';
  return (
    <View style={{ ...props, alignSelf: 'center' }}>
      <Svg viewBox='0 0 54.01 35.58'>
        <G id='Lager_1-2' data-name='Lager 1'>
          <Path
            fill={color}
            d='m42.13,5.93h-12.29v28.11h-7.56V5.93h-12.62l1.43-5.93h29.74l1.3,5.93Z'
          />
          <Path
            fill={color}
            d='m51.74,11.52l-4.23,17.33h-2.63l-2.94-12.23h-.1l-2.87,12.23h-2.59l-4.09-17.33h2.87l2.73,11.99h.08l2.93-11.99h2.25l2.77,11.93h.1l2.79-11.93h2.93Z'
          />
          <Path
            fill={color}
            d='m19.46,11.52l-4.23,17.33h-2.63l-2.94-12.23h-.1l-2.87,12.23h-2.59L0,11.52h2.87l2.73,11.99h.08l2.93-11.99h2.25l2.77,11.93h.1l2.79-11.93h2.93Z'
          />
        </G>
      </Svg>
    </View>
  );
}
