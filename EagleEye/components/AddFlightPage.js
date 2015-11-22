/**
 * Add a new flight
 */
'use strict';

var React = require('react-native');
var Globals = require('./Globals');
var {
  Component,
  ListView,
  StyleSheet,
  View,
  Navigator,
  TextInput,
  Text,
} = React;

var REQUEST_URL = Globals.url + '/flight';

class AddFlightPage extends Component {

  constructor() {
    super();
    this.state = {
      flightNumber: ''
    };
  }

  onAddFlightNumber() {
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flightId: this.state.flightNumber
      })
    });
    this.props.navigator.pop();
  }

  onChange(e, f) {
    this.setState({
      flightNumber: e.nativeEvent.text
    });
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Text style={styles.flightNumber}>Flight Number</Text>
        <TextInput
          style={styles.flightNumberInput}
          keyboardType={'ascii-capable'}
          placeholder={'AA1234'}
          clearTextOnFocus={true}
          keyboardAppearance={'light'}
          autoCapitalize={'characters'}
          autoCorrect={false}
          onChange={this.onChange.bind(this)}
          onEndEditing={this.onAddFlightNumber.bind(this)}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  viewContainer: {
    marginTop: 64 + 20,
    marginLeft: 30,
    marginRight: 30,
  },
  flightNumber: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '100',
    fontSize: 30,
  },
  flightNumberInput: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 50,
    flex: 1,
    height: 50,
  },
});

module.exports = AddFlightPage;
