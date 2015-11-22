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
  TouchableHighlight,
} = React;

const phoneMaxLength = 10;
const fakePhoneNumber = '123 456 7890'

class SettingsPage extends Component {

  constructor() {
    super();
    this.state = {
      isEditing: false,
      phoneNumber: fakePhoneNumber,
    };
  }

  /**
   * When clicking the edit button. Toggle the edit state.
   */
  _onToggleEdit() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  /**
   * Formats a phone number with spaces
   */
  _formatNumber(phone) {
    return [phone.substr(0, 3),phone.substr(3, 3), phone.substr(6,4)].join(' ').trim();
  }

  render() {
    return (
      <View style={styles.settingsPage}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={require('../images/profile.jpg')}
                />
            </View>
            <Text style={styles.fullName}>Grant Timmerman</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.phoneTitle}>Phone Number</Text>
          <TouchableHighlight onPress={this._onToggleEdit.bind(this)}>
            <Image
              style={styles.editImage}
              source={require('../images/edit.png')}
              />
          </TouchableHighlight>
          {this.state.isEditing ? (
            <TextInput
              style={styles.phoneInput}
              keyboardType={'phone-pad'}
              placeholder={this.state.phoneNumber}
              keyboardAppearance={'light'}
              clearTextOnFocus={true}
              maxLength={phoneMaxLength}
              onChangeText={(phone) => {
                var newData = {
                  phoneNumber: this._formatNumber(phone)
                };
                if (phone.replace(/ /g,'').length === phoneMaxLength) {
                  newData.isEditing = false;
                }
                this.setState(newData);
              }}
              onEndEditing={(phone) => {
                this.setState({
                  phoneNumber: this._formatNumber(phone),
                  isEditing: false,
                })
              }}/>
          ) : (
            <Text style={styles.currentNumber}>{this.state.phoneNumber}</Text>
          )}
        </View>
      </View>
    );
  }
}

const profileImageSize = 150;

const fontStyles = {
  fontFamily: 'Helvetica Neue',
  fontWeight: '100',
};

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
  editImage: {
    position: 'absolute',
    top: 25,
    right: 0,
    width: 25,
    height: 25,
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize / 2,
    borderColor: 'white',
    borderWidth: 1,
  },
  body: {
    marginLeft: 20,
    marginRight: 20,
  },
  fullName: {
    marginTop: 20,
    color: 'white',
    fontSize: 30,
    ...fontStyles,
  },
  phoneTitle: {
    position: 'absolute',
    top: 20,
    left: 0,
    fontSize: 20,
    color: Globals.colors.grayDark,
    ...fontStyles,
  },
  phoneInput: {
    top: 56,
    fontSize: 30,
    flex: 1,
    height: 50,
  },
  currentNumber: {
    position: 'absolute',
    top: 60,
    fontSize: 32,
    ...fontStyles,
    fontWeight: '400',
  }
});

module.exports = SettingsPage;
