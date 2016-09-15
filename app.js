var filteredLocations = destinations.slice();

//=====================CALLS WEATHER API ============================

filteredLocations.forEach(function(item, index){

  $.ajax({
    type: "GET",
    url: "https://api.forecast.io/forecast/7bb8bef0ae21f57ec6c74c26028fa176/" + item.lat + "," + item.long,
    dataType: 'jsonp'
  }).done(function(response){
    averageTemp = [];
    for (var i = 0; i < 7; i++) {
      maxW = response.daily.data[i].temperatureMax;
      minW = response.daily.data[i].temperatureMin;
      avgW = (maxW + minW)/2
      averageTemp.push(avgW);
    };
    //averaging upcoming week's weather based on daily high and low
    item.forecast = response.daily.summary;
    item.temperature = Math.round((averageTemp.reduce(function(a, b){return a+b}, 0))/averageTemp.length);
    console.log(index + ' temperature is ' + item.temperature);
  });
})

var $map = $('#map');
var $filterDiv = $('#question-box').hide();
var filterIndex = 0;

function questionPrint() {
  var $questionBox = $('#question-box');
  var $yesDiv = $('#yesDiv');
  var $noDiv = $('#noDiv');
  var $imgDiv = $('.imgDiv');
  var yesImage = $('<img>').attr('src', filters[filterIndex].yes);
  var noImage = $('<img>').attr('src', filters[filterIndex].no);
  var keyword = filters[filterIndex].keyword;
  yesImage.click(function() {
    filters[filterIndex].filterFunction(keyword, true)
    if (filters[filterIndex + 1]) {
      filterIndex ++;
      $('h1').empty();
      $imgDiv.empty();
      questionPrint();
    } else {
      $('.wrapper').hide();
      $('.results').show();
      initialize();
      createListings(filteredLocations);
    }
    console.log(filteredLocations);
  });

  noImage.click(function() {
    filters[filterIndex].filterFunction(keyword, false)
    if (filters[filterIndex + 1]) {
      filterIndex ++;
      $('h1').empty();
      $imgDiv.empty();
      questionPrint();
    } else {
      $('.wrapper').hide();
      $('.results').show();
      initialize();
      createListings(filteredLocations);
    }
    console.log(filteredLocations);
  });

  $('h1').append(filters[filterIndex].question);
  $yesDiv.append(yesImage);
  $noDiv.append(noImage);
}

$('#readyBtn').on('click', function(event){
  $(event.target).closest('div').hide();
  $filterDiv.show();
  questionPrint();
})

//======================MAP INITIALIZATION======================

// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.

var map;
function initialize() {
  var mapOptions = {
    zoom: 4,
    center: {lat: 41.577212, lng: -92.711},
    styles: [
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "invert_lightness": true },
      { "color": "#8de0ed" }
    ]
  },{
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      { "color": "#828691" }
    ]
  },{
    "elementType": "labels.text",
    "stylers": [
      { "color": "#ffffff" },
      { "weight": 0.1 }
    ]
  },{
  }
]
  };
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  var image = 'http://maps.google.com/mapfiles/kml/pushpin/wht-pushpin.png';
  var marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    //hardcode location OR position of user
    position: {lat: 41.577212, lng: -92.711},
    map: map,
    icon: image
  });

//=====================CREATE MULTIPLE MARKERS======================

filteredLocations.forEach(function(item, index){

  var image = 'http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png';
  var marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: {lat: item.lat, lng: item.long},
    animation: google.maps.Animation.DROP,
    map: map,
    icon: image
  });

  var infowindow = new google.maps.InfoWindow({
    content: '<img class="markerImg" src=' + item.image + '>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

})
// You can use a LatLng literal in place of a google.maps.LatLng object when
// creating the Marker object. Once the Marker object is instantiated, its
// position will be available as a google.maps.LatLng object. In this case,
// we retrieve the marker's position using the
// google.maps.LatLng.getPosition() method.
  var infowindow = new google.maps.InfoWindow({
    content: '<p>You are here!</p>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

// google.maps.event.addDomListener(window, 'load', initialize);

//============= CREATE LISTINGS ON RESULTS PAGE ===================

function createListings (obj) {
  obj.forEach(function(element){
    var $listing = $('<li>').addClass('listingItem');
    var $listingTitle = $('<h1>').text(element.name).append($('<hr>'));
        // var $forecast = $('<h3>').html('<span class="forecastSpan">Forecast: </span>' + element.forecast);
    var $forecast = $('<h3>').html(element.forecast);
    var $listingTags = $('<h2>').html('<span class="hoverSpan">Vibes: </span>' + element.vibes);
    var $listingMustsee = $('<h2>').html('<span class="hoverSpan">Don\'t Miss: </span>' + element.mustsee);
    $listing.append($listingTitle).append($forecast).append($listingTags).append($listingMustsee);
    $('ul').append($listing);
  })
};
