/**
 * Add a new flight
 */
'use strict';

var React = require('react-native');
var {
  Component,
  ListView,
  StyleSheet,
  View,
  Navigator,
  TextInput,
  Text,
} = React;

var REQUEST_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apiKey=7waqfqbprs7pajbz28mqf6vz'

class AddFlightPage extends Component {
  onAddFlightNumber(flightNumber) {
    this.props.navigator.pop();
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
