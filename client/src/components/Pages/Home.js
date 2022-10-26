import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import restrooms from '../data/restrooms.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxndWV2YXJhOTQiLCJhIjoiY2wyZ3p0YzV1MDM5cjNjbWptbmVtcTlwYiJ9.MeyQxi0C68TmhE0Hgc4t6g';

const data = restrooms

class Home extends React.Component {

	// set map
	constructor(props) {
		super(props);
		this.state = {
			lng: -118.109680,
			lat: 33.781528,
			zoom: 12
		}
	}

	// map
	componentDidMount() {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/angelguevara94/cl2gzvhpl003l14nvx50xc0v4',
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		})

		map.on('load', () => {
			// custom marker image
			map.loadImage(
				'https://i.ibb.co/48hy5yw/golden-throne.png',
				(error, image) => {
					if (error) throw error;
					map.addImage('custom-marker', image);
					map.addSource('points', {
						type: 'geojson',
						data: data
					});

					// symbol layer
					map.addLayer({
						'id': 'points',
						'type': 'symbol',
						'source': 'points',
						'layout': {
							'icon-image': 'custom-marker',
							'text-field': ['get', 'title'],
							'text-font': [
								'Open Sans Semibold',
								'Arial Unicode MS Bold'
							],
							'text-offset': [0, 1.25],
							'text-anchor': 'top'
						}
					});
				}
			);
		});


		map.on('click', 'points', (e) => {
			const coordinates = e.features[0].geometry.coordinates.slice();
			const city = e.features[0].properties.city;
			const location = e.features[0].properties.location;

			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			new mapboxgl.Popup()
				.setLngLat(coordinates)
				.setHTML('<h4>' + city + '</h4>' + location)
				.addTo(map);
		});

	}

	render() {
		return (
			<div>
				<div ref={el => this.mapContainer = el} style={{ width: '100%', height: '100vh' }} />
			</div>
		)
	}
}

export default Home;
