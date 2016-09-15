console.log('is this working');

var destinations = [{
  name: 'Nashville, TN',
  lat: 36.174465,
  long: -86.767960,
  city: true,
  image: 'https://www.cardcow.com/images/set83/card00146_fr.jpg',
  forecast: '',
  population: 678889,
  temperature: '',
  vibes: 'foodie, music, southern hospitality',
  mustsee: 'Tootsies, Country Music Hall of Fame, Printer\'s Alley',
}, {
  name: 'Asheville, NC',
  lat: 35.590489,
  long: -82.560352,
  city: false,
  image: 'http://imgc.allpostersimages.com/images/P-473-488-90/29/2996/2VOQD00Z/posters/greetings-from-asheville-north-carolina.jpg',
  forecast: '',
  population: 87236,
  temperature: '',
  vibes: 'scenic, hipster',
  mustsee: 'Blue Ridge Parkway, Biltmore Estate'
}, {
  name: 'Austin, TX',
  lat: 30.2671500,
  long: -97.7430600,
  city: true,
  image: 'http://www.outofboundscomedy.com/2013/wp-content/uploads/2012/07/Austin-TX-Card.jpg',
  forecast: '',
  population: 885400,
  temperature: '',
  vibes: 'hipster, foodie, music',
  mustsee: ''
}, {
  name: 'Charleston, SC',
  lat: 32.784618,
  long: -79.940918,
  city: false,
  image: 'https://c2.staticflickr.com/8/7013/6636150275_82be38dfce_b.jpg',
  forecast: '',
  population: 127999,
  temperature: '',
  vibes: 'southern hospitality, beachy, shopping',
  mustsee: 'The Battery, King Street, Sullivan\'s Island'
}, {
  name: 'New Orleans, LA',
  lat: 29.951065,
  long: -90.071533,
  city: false,
  image: 'https://cdn.shopify.com/s/files/1/0157/3938/products/greetings-from-new-orleans1_1024x1024.jpg?v=1336168516',
  forecast: '',
  population: 378715,
  temperature: '',
  vibes: 'historic, music, artsy',
  mustsee: 'Bourbon Street, Garden District'
}, {
  name: 'Savannah, GA',
  lat: 32.076176,
  long: -81.088371,
  city: false,
  image: 'https://c2.staticflickr.com/4/3308/3557450988_67969f95ef_b.jpg',
  forecast: '',
  population: 142772,
  temperature: '',
  vibes: 'historic, scenic',
  mustsee: 'Riverside'
}, {
  name: 'New York City',
  lat: 40.730610,
  long: -73.935242,
  city: true,
  image: 'https://s-media-cache-ak0.pinimg.com/564x/18/e4/49/18e449f3804346ba07f8878d32332dcf.jpg',
  forecast: '',
  population: 8406000,
  temperature: '',
  vibes: 'big city, museums and art, nightlife',
  mustsee: 'The Met, SOHO, Central Park'
}]

var filteredLocations = destinations.slice();
//call weather API as soon as page loads and save to each element in destination object
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
      // console.log(response.daily.summary);
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

var filters = [
  {
    keyword: 'city',
    filterFunction: function urbanFilter(keyword, bool) {
      filteredLocations = filteredLocations.filter(function(element) {
        return element[keyword] == bool;
      })
    },
    question: 'getting lost in the city or lost in nature?',
    yes: 'http://media.giphy.com/media/tffaEs6otB1jW/giphy.gif',
    no: 'http://www.thatscoop.com/img/big/5706605d489e307042016185757.gif'
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
    question: 'heating up or cooling down',
    yes: 'http://31.media.tumblr.com/tumblr_m6q9goPkiH1qdkb8yo1_250.gif',
    no: 'http://25.media.tumblr.com/tumblr_mdj9q90lC91rb8q8vo1_500.gif'
  }
];


function questionPrint() {
  var $questionBox = $('#question-box');
  var $yesDiv = $('#yesDiv');
  var $noDiv = $('#noDiv');
  var $imgDiv = $('.imgDiv');
  // var yesImage = $('#yesPic').attr('src', filters[filterIndex].yes);
  // var noImage = $('#noPic').attr('src', filters[filterIndex].no);
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

//========MAP INITIALIZATION========
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


  // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  //       var beachMarker = new google.maps.Marker({
  //         position: {lat: -33.890, lng: 151.274},
  //         map: map,
  //         icon: image
  //       });

//=======CREATE MULTIPLE MARKERS========
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
    // content: '<img class="markerImg" src=' + item.image + '>' + '<h3>' + item.name + '</h3>'
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

//============= CREATE LISTINGS FOR RESULTS.CONTENT ===================
function createListings (obj) {
  obj.forEach(function(element){
    var $listing = $('<li>').addClass('listingItem');
    var $listingTitle = $('<h1>').text(element.name).append($('<hr>'));
    var $forecast = $('<h3>').html('<span>Forecast: </span>' + element.forecast);
    var $listingTags = $('<h2>').text('Vibes: ' + element.vibes);
    var $listingMustsee = $('<h2>').text('Don\'t Miss: ' + element.mustsee);
    $listing.append($listingTitle).append($forecast).append($listingTags).append($listingMustsee);
    $('ul').append($listing);
  })
};
