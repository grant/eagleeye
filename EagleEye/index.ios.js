/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var PlaneMap = require('./components/PlaneMap');
var AppTabBar = require('./components/AppTabBar');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var EagleEye = React.createClass({
  render: function() {
    return (
      <AppTabBar/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('EagleEye', () => EagleEye);
