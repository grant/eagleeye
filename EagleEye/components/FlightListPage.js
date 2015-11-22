/**
 * A list of flights
 */
'use strict';

var React = require('react-native');
var Globals = require('./Globals');
var {
  Component,
  ListView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} = React;

// var REQUEST_URL = 'http://localhost:3000/flights'
var REQUEST_URL = Globals.url + '/flights'
var REQUEST_DELETE_URL = Globals.url + '/flightdel/'

class FlightListPage extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      refreshCount: 0
    };
    setInterval(() => {
      this.fetchData();
    }, 2000);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          rows: responseData,
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          refreshCount: this.state.refreshCount + 1,
        });
      })
      .done();
  }

  render() {
    if (!this.state.refreshCount) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.listViewContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderFlight.bind(this)}
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

  _onDelete(flight, event) {
    var updatedRows = this.state.rows.filter(function(row) {
      return row.id !== flight.id;
    });
    fetch(REQUEST_DELETE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flightId: flight.id
      })
    }).then(() => {
      this.setState({
        rows: updatedRows,
        dataSource: this.state.dataSource.cloneWithRows(updatedRows),
      });
    })
  }

  renderFlight(flight) {
    return (
      <View style={styles.listItem}>
        <Text style={styles.flightId}>{flight.flightId}</Text>
        <Text style={[styles.flightInfo, styles.airport]}>{'    ' + flight.from}</Text>
        <Text style={styles.flightInfo}>{'  →  '}</Text>
        <Text style={[styles.flightInfo, styles.airport]}>{flight.to}</Text>
        <TouchableHighlight
          style={styles.delete}
          onPress={this._onDelete.bind(this, flight)}
          >
          <Text style={styles.x}>✖</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
FlightListPage.propTypes = {
  nav: React.PropTypes.any
};

const fontStyles = {
  fontFamily: 'Helvetica Neue',
  fontWeight: '100',
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    flex: 1,
    paddingTop: 20,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: Globals.colors.gray,
    borderBottomWidth: 1,
  },
  airport: {
    fontWeight: '700'
  },
  flightInfo: {
    fontSize: 40,
    ...fontStyles,
  },
  flightId: {
    position: 'absolute',
    top: 10,
    left: 10,
    ...fontStyles,
  },
  rightContainer: {
    flex: 1,
  },
  delete: {
    width: 100,
    alignItems: 'flex-end',
  },
  x: {
    fontSize: 20,
  },
  listView: {
    flex: 1,
  },
  listViewContainer: {
    flex: 1,
    backgroundColor: 'rgb(231, 231, 231)',
    marginTop: 64,
  }
});

module.exports = FlightListPage;
