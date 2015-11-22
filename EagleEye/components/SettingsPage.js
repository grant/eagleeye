/**
 * The settings page
 */
'use strict';

var React = require('react-native');
var Globals = require('./Globals');
var {
  Component,
  ListView,
  StyleSheet,
  Image,
  TextInput,
  View,
  Text,
} = React;

class SettingsPage extends Component {
  render() {
    return (
      <View style={styles.settingsPage}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image
              style={styles.profileImage}
              source={require('../images/profile.jpg')}
              />
            <Text style={styles.fullName}>Grant Timmerman</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.phoneTitle}>Phone Number</Text>
          <TextInput
            style={styles.phoneInput}
            keyboardType={'phone-pad'}
            placeholder={'123 456 7890'}
            keyboardAppearance={'light'}
            onEndEditing={(e) => {
              debugger;
            }}/>
        </View>
      </View>
    );
  }
}

const profileImageSize = 150;
var styles = StyleSheet.create({
  settingsPage: {
    backgroundColor: Globals.colors.gray,
    flex: 1,
  },
  headerContainer: {
    height: 400,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Globals.colors.primary,
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize / 2,
    borderColor: 'white',
    borderWidth: 1,
  },
  body: {
    margin: 20,
  },
  fullName: {
    marginTop: 20,
    color: 'white',
    fontWeight: '100',
    fontSize: 30,
    fontFamily: 'Helvetica Neue',
  },
  phoneTitle: {
    fontSize: 30,
    color: Globals.colors.darkGray,
  },
  phoneInput: {
    fontSize: 30,
    flex: 1,
    height: 50,
  },
});

module.exports = SettingsPage;
