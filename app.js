console.log('is this working');
var destinations = [{
  name: 'Nashville, TN',
  lat: 36.174465,
  long: -86.767960,
  city: true,
  population: 678889,
  temperature: true,
  vibes: 'foodie, music, southern hospitality',
  mustsee: 'Tootsies, Country Music Hall of Fame, Printer\'s Alley',
}, {
  name: 'Asheville, NC',
  lat: 35.590489,
  long: -82.560352,
  city: false,
  population: 87236,
  temperature: false,
  vibes: 'scenic, hipster',
  mustsee: 'Blue Ridge Parkway, Biltmore Estate'
}, {
  name: 'Austin, TX',
  lat: 30.2671500,
  long: -97.7430600,
  city: true,
  population: 885400,
  temperature: true,
  vibes: 'hipster, foodie, music',
  mustsee: ''
}, {
  name: 'Charleston, SC',
  lat: 32.784618,
  long: -79.940918,
  city: false,
  population: 127999,
  temperature: false,
  vibes: 'southern hospitality, beachy, shopping',
  mustsee: 'The Battery, King Street, Sullivan\'s Island'
}, {
  name: 'New Orleans, LA',
  lat: 29.951065,
  long: -90.071533,
  city: false,
  population: 378715,
  temperature: true,
  vibes: 'historic, music, artsy',
  mustsee: 'Bourbon Street, Garden District'
}, {
  name: 'Savannah, GA',
  lat: 32.076176,
  long: -81.088371,
  city: false,
  population: 142772,
  temperature: false,
  vibes: 'historic, scenic',
  mustsee: 'Riverside'
}, {
  name: 'New York City',
  lat: 40.730610,
  long: -73.935242,
  city: true,
  population: 8406000,
  temperature: false,
  vibes: 'big city, museums and art, nightlife',
  mustsee: 'The Met, SOHO, Central Park'
}]

var filteredLocations = destinations.slice();
//TOOK OUT .hide() on map
var $map = $('#map');
var $filterDiv = $('#question-box').hide();

var filterIndex = 0;

var filters = [
  {
    keyword: 'city',
    yes: 'http://media.giphy.com/media/tffaEs6otB1jW/giphy.gif',
    no: 'http://feelgrafix.com/data_images/out/5/779391-countryside.jpg'
  },
  {
    keyword: 'temperature',
    yes: 'http://static.asiawebdirect.com/m/phuket/portals/phuket-com/homepage/phuket-magazine/freedom-beach/pagePropertiesImage/freedom-beach.jpg',
    no: 'http://www.powerfmballarat.com.au/images/snow.jpg'
  }
];


function questionPrint() {
  var $questionBox = $('#question-box');
  var yesImage = $('<img>').attr('src', filters[filterIndex].yes);
  var noImage = $('<img>').attr('src', filters[filterIndex].no);
  var keyword = filters[filterIndex].keyword;
  yesImage.click(function() {
    filterLocation(keyword, true);
    if (filters[filterIndex + 1]) {
      filterIndex ++;
      $questionBox.empty();
      questionPrint();
    } else {
      $filterDiv.hide();
      $map.show()
    }
    console.log(filteredLocations);
  });

  noImage.click(function() {
    filterLocation(keyword, false);
    if (filters[filterIndex + 1]) {
      filterIndex ++;
      $questionBox.empty();
      questionPrint();
    } else {
      $filterDiv.hide();
      $map.show();
    }
    console.log(filteredLocations);
  });

  $questionBox.append(yesImage);
  $questionBox.append(noImage);
}
//FILTERING
function filterLocation(keyword, bool) {
  filteredLocations = filteredLocations.filter(function(element) {
    return element[keyword] == bool;
  })
}

$('#readyBtn').on('click', function(event){
  $(event.target).closest('div').hide();
  $filterDiv.show();
  questionPrint();
})
