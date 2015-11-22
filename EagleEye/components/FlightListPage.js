/**
 * A list of flights
 */
'use strict';

var React = require('react-native');
var {
  Component,
  ListView,
  StyleSheet,
  View,
  NavigatorIOS,
  Text,
} = React;

var REQUEST_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apiKey=7waqfqbprs7pajbz28mqf6vz'

class FlightListPage extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.listViewContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderFlight}
          style={styles.listView}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading flights...</Text>
      </View>
    );
  }

  renderFlight(flight) {
    return (
      <View style={styles.container}>
        <Text>{flight.from + '➜' + flight.to}</Text>
      </View>
    );
  }
}
FlightListPage.propTypes= {
  nav: React.PropTypes.any
};

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
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listViewContainer: {
    marginTop: 64,
  }
});

module.exports = FlightListPage;
