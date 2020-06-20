import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List, InputItem } from '@ant-design/react-native';

const Item = List.Item;
const Brief = Item.Brief;

export const SettingsScreen = ({ navigation }) => {
  navigation.setOptions({ headerShown: false });

  return (
      <List renderHeader='Shopping'>
        <Item>
          Item
          <Brief>Brief</Brief>
        </Item>
        <InputItem placeholder='Placeholder'>
          Input Item
        </InputItem>
      </List>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
