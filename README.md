# Trekk

##An embedded screenshot of the app
##Explanations of the technologies used
- This site uses only HTML, CSS, javascript, jQuery and the Google Maps and forecast.io APIs.

##A couple paragraphs about the general approach you took
- This is a scalable one page website for helping people ready to take a spontaneous trip but not sure where to go.  Currently, the site uses two filters (Whether you prefer to visit cities vs. countryside and your temperature preference to find destinations that match your preferences.  More destinations and filters can be added to their respective objects without need to change any other code.  Ideally this website will show flights/driving routes on the results map, but at this time that is not available due to budget.  

##Installation instructions for any dependencies
- To install this website simply fork the repo, and add your forcast.io and Google Maps keys to the javascript file.  

##Link to your user stories – who are your users, what do they want, and why?
##Link to your wireframes – sketches of major views / interfaces in your application
##Link to your pitch deck – documentation of your wireframes, user stories, and proposed architecture
##Descriptions of any unsolved problems or major hurdles you had to overcome
- Lack of free API that offers mapped flights.  Ideally this site answers the following scenario: I have $X to spend and want to leave XX/XX/XXXX, where should I go?  The site would then filter out popular destinations based on your preferences and show you differnet flight and driving options to get there within your price range on the specified date.  
- Considering weather conditions beyond average temperatures in the weather related filter
- Ideally this site answers the following scenario: I have $X to spend and want to leave XX/XX/XXXX, where should I go?
- Need to add jQuery animation
- Isn't yet responsive
- User could potentially click through site before weather api call has loaded
