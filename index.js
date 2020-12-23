function getLyrics(artistName, songTitle) {
  const formattedArtist = encodeURI(artistName);
  const formattedSong = encodeURI(songTitle);
  return fetch(`https://private-amnesiac-c27613-lyricsovh.apiary-proxy.com/v1/${formattedArtist}/${formattedSong}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson.lyrics)
      return responseJson.lyrics
      $('#en-results').emtpy();
      $('#en-results').html(responseJson.lyrics);
      
      
    })
    

      .catch(error => alert('Please choose a different song.'));

}


function displayResults(translatedLyrics) {
  
  $('#results').empty();
  //$('#results').removeClass('hidden');
  $('#results').html(translatedLyrics.map(line => '<p>' + line + '</p>'))
};

function displayEnglishLyrics(englishLyrics) {
  $('#en-results').empty();
  $('#en-results').html(englishLyrics.split('\n').map(line => '<p>' + line + '</p>'));
};

function displayError(error) {
  alert("Please choose a different language");
}

function translateText(language, lyrics) {

//const targetLangage = $("#song-language").val();
//const originalText = $("#some-string").val();
 
  
   
  return fetch("https://translation.googleapis.com/language/translate/v2", {
	"method": "POST",
  headers: {
  Authorization: `Bearer ya29.c.Kp0B6Af9kv8Tvym6AnUpIKpsq3NirvzXnzBsDA4FENkUilg-CSJqFqKu72n52l4kaC--hW_vjNM71yPVJ0BBaGg6NHWHstUoJqS-qaUoTuXXYrswxnpJOnwm-xP6WYLPl_PgbX4Lv-DLtrUBnqCOcysu7iPAMI9pLYv1xEf_eMrnb0SXjpyXouZkyqGgNoErtIchTydVZ7xU50kfr3RUYw`,
  "Content-Type": "application/json; charset=utf/8",
},

	body: JSON.stringify({
		q: lyrics.split('\n'),
		source: "en",
		target: language
    
	})
})

.then(response => response.json())
.then(responseJson => {
	console.log(responseJson);
   responseJson.data.translations.forEach(t => console.log(t.translatedText));

return responseJson.data.translations.map(t => {
  return (t.translatedText);
}) 

})
.catch(err => {
	console.error(err);
});

}

/*
fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      
      }
      console.log("Error");
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

*/

 function watchForm() {
  $('form').submit(async event => {
    event.preventDefault();
    const artistName = $('#artist-name').val();
    const songTitle = $('#song-title').val();
    const language = $('#song-language').val();
    try {const englishLyrics = await getLyrics(artistName, songTitle);
    const translatedLyrics = await translateText(language, englishLyrics);
    displayEnglishLyrics(englishLyrics);
    displayResults(translatedLyrics);
    } catch (error) {
      displayError(error)
    }

    
    
    
    
    

  
  });
  
}

$(watchForm);
