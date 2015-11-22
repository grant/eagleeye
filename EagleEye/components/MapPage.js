/**
 * A map page of flights
 */
'use strict';

var React = require('react-native');
var PlaneMap = require('./PlaneMap');
var {
  Component,
  ListView,
  StyleSheet,
  View,
  Text,
} = React;

class MapPage extends Component {
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
      loaded: true,
    });
    // fetch(REQUEST_URL)
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
    //       loaded: true,
    //     });
    //   })
    //   .done();
  }

  render() {
    return (
      <View style={styles.planeMap}>
        <PlaneMap style={styles.planeMap}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  planeMap: {
    backgroundColor: 'blue',
    flex: 1,
  },
});

module.exports = MapPage;
