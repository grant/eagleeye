/**
 * A page full of a list of flight details
 */
'use strict';

var React = require('react-native');
var FlightDetailPage = require('./FlightDetailPage');
var FlightListPage = require('./FlightListPage');
var AddFlightPage = require('./AddFlightPage');
var {
  Component,
  ListView,
  StyleSheet,
  View,
  NavigatorIOS,
  Text,
} = React;

class FlightPage extends Component {
  onRightButtonPress() {
    this.refs.nav.push({
      title: 'Add Flight',
      component: AddFlightPage,
      passProps: {
      }
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.navigator}
        initialRoute={{
          component: FlightListPage,
          title: 'Flights',
          rightButtonTitle: '➕',
          onRightButtonPress: this.onRightButtonPress.bind(this),
          passProps: {
          },
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = FlightPage;
