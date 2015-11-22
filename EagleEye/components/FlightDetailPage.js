/**
 * A page with flight details
 */
'use strict';

var React = require('react-native');
var {
  Component,
  ListView,
  StyleSheet,
  View,
  Navigator,
  Text,
} = React;

var REQUEST_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apiKey=7waqfqbprs7pajbz28mqf6vz'

class FlightDetailPage extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      loaded: true
    });
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else {
      return this.renderFlight();
    }
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading flight...</Text>
      </View>
    );
  }

  renderFlight() {
    return (
      <View style={styles.container}>
        <Text>{"Hello"}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
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

module.exports = FlightDetailPage;
