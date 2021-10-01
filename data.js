const artist_match_url = 'https://t9pw9aug66.execute-api.us-east-1.amazonaws.com/dev/artists';

// initialize home for data
var match_data = null;
console.log(match_data);

// Perform a GET request to the query URL
d3.json(artist_match_url).then(function(data) {
    match_data = data;
});



