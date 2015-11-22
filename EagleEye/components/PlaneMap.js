/**
 * A view of all flights
 */
'use strict';

var React = require('react-native');
var {
  Component,
  MapView,
  StyleSheet,
  View,
  Text,
} = React;

class PlaneMap extends Component {
  getInitialState() {
    return {
      mapRegion: null,
      annotations: null,
    };
  }

  render() {
    var state = this.state || this.getInitialState();
    return (
      <MapView
        style={styles.map}
        annotations={[{
          latitude: 45.65,
          longitude: -78.90,
          title: 'Eric',
          subtitle: '40 min away'
        },{
          latitude: 41.378792,
          longitude: -104.043376,
          title: 'Michelle',
          subtitle: '1h 40m away'
        }, {
          latitude: 34.361792,
          longitude: -80.823137,
          title: 'Cathryn',
          subtitle: '1h 2m away'
        }]}
        rotateEnabled={false}
        showsUserLocation={true}
        onRegionChange={this._onRegionChange.bind(this)}
        onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
        region={state.mapRegion}
        />
    );
  }

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  }

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  }

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  }

  _onRegionInputChanged(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region),
    });
  }
}

var styles = StyleSheet.create({
  map: {
    flex: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});

module.exports = PlaneMap;
