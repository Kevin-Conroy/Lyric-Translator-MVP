function getLyrics(artistName, songTitle) {
  const formattedArtist = encodeURI(artistName);
  const formattedSong = encodeURI(songTitle);
  return fetch(`https://private-amnesiac-c27613-lyricsovh.apiary-proxy.com/v1/${formattedArtist}/${formattedSong}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson.lyrics)
      if (!responseJson || !responseJson.lyrics) {
      throw new Error("NO_LYRICS");
      }
      return responseJson.lyrics
      $('#en-results').emtpy();
      $('#en-results').html(responseJson.lyrics);
      
      
    })
    


}

function displayError(error) {
  if (error.message = "NO_LYRICS") {
    alert("Sorry, try another song!")
  }
};


function displayResults(translatedLyrics) {
  
  $('#results').empty();
  //$('#results').removeClass('hidden');
  $('#results').html(translatedLyrics.map(line => '<p>' + line + '</p>'))
};

function displayEnglishLyrics(englishLyrics) {
  $('#en-results').empty();
  $('#en-results').html(englishLyrics.split('\n').map(line => '<p>' + line + '</p>'));
};


function translateText(language, lyrics) {

//const targetLangage = $("#song-language").val();
//const originalText = $("#some-string").val();
 
  
   
  return fetch("https://translation.googleapis.com/language/translate/v2", {
	"method": "POST",
  headers: {
  Authorization: `Bearer ya29.c.Kp0B6Ac4Y3Uaz3lpa7XyQ8hnHePhJeEKzCmCOHW58DR1IxhNmGzj1TBrVr0X9h84CrYg6CwI8FxysVDtipk80Wq2PQCcWkoPE8BytJ6LPQqa1LdE3o7elOpmJIt8Z20dogmEk3ERREEpdJqRxmiTODaLkKTUz1JpSg5jNnrCX3lhA8zKZWYK-zGWTCvG5H65nkALeP9JVjPS9-n6JpC-xQ`,
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

});
//.catch(err => {
//	console.error(err);
//});

}


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
