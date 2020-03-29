import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { Colors } from '../common/colors';
import { MSwitch } from '../components';

export default function Settings() {
    const [taxIncluded, setTaxIncluded] = React.useState(true);
    const [taxRate, setTaxRate] = React.useState(null);

    return (
        <View style={{ display: 'flex', flex: 1, backgroundColor: Colors.White, paddingVertical: 20, paddingHorizontal: 40 }}>
          <View>
            <MSwitch
              containerStyle={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
              titleStyle={{fontSize: 20}}
              title='VAT included'
              value={taxIncluded}
              onValueChange={value => setTaxIncluded(value)}
            />

            {
              !taxIncluded
              &&
              <Input
                placeholder='20%'
                keyboardType='numeric'
                numberOfLines={1}
                value={taxRate}
                onChangeText={text => {
                  const newValue = parseFloat(text);

                  if (isNaN(newValue) || newValue > 100) {
                    alert('Invalid tax rate!');
                    setTaxRate('');
                  } else {
                    setTaxRate(text);
                  }
                }}
              />
            }
          </View>

          {/*<Text>*/}
              {/*TODO:*/}
              {/*1. Currency selector*/}
              {/*2. Tax included?*/}
              {/*3. Tax fee rate?*/}
              {/*4. Total price limit*/}
          {/*</Text>*/}
        </View>
    )
}
