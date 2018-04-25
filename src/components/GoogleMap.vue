<template>
    <div class="google-map" :id="mapName"></div>
</template>
<script>
    const GoogleMapsLoader = require('google-maps');
    export default {
        name: 'google-map',
        props: ['name'],
        data: function () {
            return {
                mapName: this.name + "-map",
                marker: null,
            }
        },
        mounted: function () {
            let self = this;
            GoogleMapsLoader.KEY = 'AIzaSyC6oJvtLzpl5A_uhqBSI9p1-CrUdhiSTco';
            GoogleMapsLoader.load(function () {
                self.loadMap();
            });
        },
        methods: {
            loadMap: function () {
                let self = this;
                const element = document.getElementById(self.mapName)
                const options = {
                    zoom: 6,
                    center: new google.maps.LatLng(52.0693267, 19.4781225),
                    styles: [{
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{"color": "#444444"}]
                    }, {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{"color": "#f2f2f2"}]
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "poi.business",
                        "elementType": "geometry.fill",
                        "stylers": [{"visibility": "on"}]
                    }, {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{"saturation": -100}, {"lightness": 45}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{"visibility": "simplified"}]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{"color": "#b4d4e1"}, {"visibility": "on"}]
                    }]
                };

                const map = new google.maps.Map(element, options);

                map.addListener('click', function (e) {
                    self.placeMarker(e.latLng, map);

                    self.findAddress({lat: e.latLng.lat(), lng: e.latLng.lng()});
                });


            },
            placeMarker: function (position, map) {
                if (this.marker) {
                    this.marker.setMap(null);
                }
                this.marker = new google.maps.Marker({
                    position: position,
                    map: map
                });
            },
            findAddress: function (latlng) {
                let self = this;
                let geocoder = new google.maps.Geocoder;
                geocoder.geocode({'location': latlng}, function (results, status) {
                    if (status === 'OK') {
                        if (results[0]) {
                            let address = {};

                            if (results[0].address_components.length === 6) {
                                address.city = results[0].address_components[1].long_name;
                                address.street = results[0].address_components[1].long_name + ' ' + results[0].address_components[0].short_name;
                                address.postCode = results[0].address_components[5].long_name;
                                address.voivodeship = results[0].address_components[3].long_name;
                            } else if (results[0].address_components.length === 7) {
                                address.city = results[0].address_components[3].long_name;
                                address.street = results[0].address_components[1].long_name + ' ' + results[0].address_components[0].short_name;
                                address.postCode = results[0].address_components[6].long_name;
                                address.voivodeship = results[0].address_components[4].long_name;
                            }
                            address.lat = latlng.lat;
                            address.lng = latlng.lng;
                            self.$emit('markerChange', address);

                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            }

        }
    };
</script>
<style scoped>
    .google-map {
        width: 100%;
        height: 420px;
        margin: 0 auto;
        background: gray;
    }
</style>