import { Switch, View } from 'react-native';
import { Colors } from '../common/colors';
import { Text } from 'react-native-elements';
import React from 'react';

export default function MSwitch (props) {
  const { containerStyle, titleStyle, title, trackColor, ...rest } = props;

  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Switch
        trackColor={trackColor || { true: Colors.CobaltBlue }}
        {...rest}
      />

      <Text style={[{ marginLeft: 8, fontSize: 20 }, titleStyle]}>
        {title}
      </Text>
    </View>
  )
}
