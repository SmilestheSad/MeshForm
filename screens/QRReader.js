import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Slider, Input, Button } from 'react-native-elements'


import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QRReader extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    //console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Clipboard.setString(data);
    this.props.navigation.navigate('Links', {
      asdf: data
    })
    //console.log(this.props)
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    const {navigate} = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }

  /* handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.navigation.navigate('LinksStack', {
      asdf: 'asdf'
    })
    console.log(this.props)
  }; */
}