console.log('is this working');

var destinations = [{
  name: 'Nashville, TN',
  lat: 36.174465,
  long: -86.767960,
  city: true,
  population: 678889,
  temperature: '',
  vibes: 'foodie, music, southern hospitality',
  mustsee: 'Tootsies, Country Music Hall of Fame, Printer\'s Alley',
}, {
  name: 'Asheville, NC',
  lat: 35.590489,
  long: -82.560352,
  city: false,
  population: 87236,
  temperature: '',
  vibes: 'scenic, hipster',
  mustsee: 'Blue Ridge Parkway, Biltmore Estate'
}, {
  name: 'Austin, TX',
  lat: 30.2671500,
  long: -97.7430600,
  city: true,
  population: 885400,
  temperature: '',
  vibes: 'hipster, foodie, music',
  mustsee: ''
}, {
  name: 'Charleston, SC',
  lat: 32.784618,
  long: -79.940918,
  city: false,
  population: 127999,
  temperature: '',
  vibes: 'southern hospitality, beachy, shopping',
  mustsee: 'The Battery, King Street, Sullivan\'s Island'
}, {
  name: 'New Orleans, LA',
  lat: 29.951065,
  long: -90.071533,
  city: false,
  population: 378715,
  temperature: '',
  vibes: 'historic, music, artsy',
  mustsee: 'Bourbon Street, Garden District'
}, {
  name: 'Savannah, GA',
  lat: 32.076176,
  long: -81.088371,
  city: false,
  population: 142772,
  temperature: '',
  vibes: 'historic, scenic',
  mustsee: 'Riverside'
}, {
  name: 'New York City',
  lat: 40.730610,
  long: -73.935242,
  city: true,
  population: 8406000,
  temperature: '',
  vibes: 'big city, museums and art, nightlife',
  mustsee: 'The Met, SOHO, Central Park'
}]

var filteredLocations = destinations.slice();
//AJAX IMMEDIATELY TO GET TEMPERATURES IN FILTEREDLOCATIONS OBJECT
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
    item.temperature = Math.round((averageTemp.reduce(function(a, b){return a+b}, 0))/averageTemp.length);
    console.log(index + ' temperature is ' + item.temperature);
  });
})

var $map = $('#map');
var $filterDiv = $('#question-box').hide();
var filterIndex = 0;

var filters = [
  {
    keyword: 'city',
    filterFunction: function urbanFilter(keyword, bool) {
      filteredLocations = filteredLocations.filter(function(element) {
        return element[keyword] == bool;
      })
    },
    yes: 'http://media.giphy.com/media/tffaEs6otB1jW/giphy.gif',
    yesContent: 'Concrete Jungle',
    no: 'http://www.thatscoop.com/img/big/5706605d489e307042016185757.gif',
    noContent: 'Nature'
  },
  {
    keyword: 'temperature',
    filterFunction: function heatFilter(keyword, bool) {
      filteredLocations = filteredLocations.filter(function(element){
          if ((bool == true) && (element.temperature >=80)) {
            return true;
          } else if ((bool == false) && (element.temperature < 80)){
            return true;
          } else {
            return false;
          }
        });
    },
    yes: 'http://31.media.tumblr.com/tumblr_m6q9goPkiH1qdkb8yo1_250.gif',
    no: 'http://25.media.tumblr.com/tumblr_mdj9q90lC91rb8q8vo1_500.gif'
  }
];


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
    // filterLocation(keyword, true);
    if (filters[filterIndex + 1]) {
      filterIndex ++;
      $imgDiv.empty();
      questionPrint();
    } else {
      $('.wrapper').hide();
      $('.results').show();
      initialize();
    }
    console.log(filteredLocations);
  });

  noImage.click(function() {
    filters[filterIndex].filterFunction(keyword, false)
    if (filters[filterIndex + 1]) {
      filterIndex ++;
      $imgDiv.empty();
      questionPrint();
    } else {
      $('.wrapper').hide();
      $('.results').show();
      initialize();
    }
    console.log(filteredLocations);
  });

  $yesDiv.append(yesImage);
  $noDiv.append(noImage);
}

$('#readyBtn').on('click', function(event){
  $(event.target).closest('div').hide();
  $filterDiv.show();
  questionPrint();
})

//========MAP INITIALIZATION========
// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.

var map;
function initialize() {
  var mapOptions = {
    zoom: 4,
    center: {lat: 41.577212, lng: -92.711}
  };
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  var marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    //hardcode location OR position of user
    position: {lat: 41.577212, lng: -92.711},
    map: map
  });

//=======CREATE MULTIPLE MARKERS========
filteredLocations.forEach(function(item, index){
  var marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: {lat: item.lat, lng: item.long},
    map: map
  });
})
// You can use a LatLng literal in place of a google.maps.LatLng object when
// creating the Marker object. Once the Marker object is instantiated, its
// position will be available as a google.maps.LatLng object. In this case,
// we retrieve the marker's position using the
// google.maps.LatLng.getPosition() method.
  var infowindow = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + marker.getPosition() + '</p>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

// google.maps.event.addDomListener(window, 'load', initialize);
