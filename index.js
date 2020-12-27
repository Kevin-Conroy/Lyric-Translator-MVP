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
  Authorization: `Bearer ya29.c.Kp0B6weQRT74agShlOUk61f-XT0ImY5NYD99V3-uvzse8NT0b0HpWHP6hmpy9UoyAizhvWB_qQhZsbhomIShPg2pToLtPSJ6Q2PNB8C8tzIgJZOwl7CssXfnTPb4YAEIUjt3yw0d5WeWDdkHtWGblYrPSwUMfvZSkSDHROWxfWuAmgQITY9tv1ITASPh1ZsIKGe7TXC6QHqWfBxHxrXc9g`,
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
