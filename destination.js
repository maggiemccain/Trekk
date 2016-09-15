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
  population: 9577,
  temperature: '',
  vibes: 'big city, museums and art, nightlife',
  mustsee: 'The Met, SOHO, Central Park'
}, {
  name: 'Jackson Hole, WY',
  lat: 43.4799,
  long: -110.7624,
  city: false,
  image: 'http://media.gettyimages.com/photos/greetings-from-wyoming-a-large-letter-postcard-of-wyoming-showing-of-picture-id103119384',
  forecast: '',
  population: 8406000,
  temperature: '',
  vibes: 'old west, scenic, resort town',
  mustsee: 'Town Square, Rendezvous Mountain, Laurance Rockefeller Preserve'
}, {
  name: 'Key West, FL',
  lat: 24.555059,
  long: -81.779984,
  city: false,
  image: 'http://imgc.allpostersimages.com/images/P-473-488-90/29/2995/L8OQD00Z/posters/greetings-from-key-west-florida.jpg',
  forecast: '',
  population: 25550,
  temperature: '',
  vibes: 'tropical, nightlife, Jimmy Buffet',
  mustsee: 'Southernmost Point, Duval Street, Latitude Key'
}
]
