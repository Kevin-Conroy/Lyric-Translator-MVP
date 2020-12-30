function getLyrics(artistName, songTitle) {
    const formattedArtist = encodeURI(artistName);
    const formattedSong = encodeURI(songTitle);
    return fetch(`https://private-amnesiac-c27613-lyricsovh.apiary-proxy.com/v1/${formattedArtist}/${formattedSong}`)
        .then(response => response.json())
        .then(responseJson => {
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
        $('#results').empty();
        $('#en-results').empty();
        $('#h2TransDiv').empty();
        $('#h2EngDiv').empty();
        $('#error-message').text("Sorry, try another song!");
    }
};

function displayTranslation(translatedLyrics) {
  $('#h2TransDiv').text("Translation");
  $('#results').empty();
  $('#results').html(translatedLyrics.map(line => '<p>' + line + '</p>'))
};

function displayEnglishLyrics(englishLyrics) {
    $('#h2EngDiv').text("Lyrics (English)");
    $('#en-results').empty();
    $('#en-results').html(englishLyrics.split('\n').map(line => '<p>' + line + '</p>'));
};

function translateText(language, lyrics) {
    return fetch("https://translation.googleapis.com/language/translate/v2", {
            "method": "POST",
            headers: {
                Authorization: `Bearer ya29.c.Kp0B6wedgLCbvFKuEXNAx2kaC_G_rfedTa3H3A84OMCCRvVYfkGnpBB5PY3yUMeCHFHMhuGXKsbuRn2ZoiMviXi51Jhd4vc02skuSb6nMge4p4gFkurds9XJLqfwrOiGy624BT1EBVsYtOkXH1_YZMaTG6arOR5BpyOx5Am979MwwCUV8v6Xl7efOH1Dj-cmKaJreFT_uWmAvYKziDDrgg`,
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
                return responseJson.data.translations.map(t => {
                return (t.translatedText);
            })
        });
}

function watchForm() {
    $('form').submit(async event => {
        event.preventDefault();
        const artistName = $('#artist-name').val();
        const songTitle = $('#song-title').val();
        const language = $('#song-language').val();
        try {
            const englishLyrics = await getLyrics(artistName, songTitle);
            const translatedLyrics = await translateText(language, englishLyrics);
            displayEnglishLyrics(englishLyrics);
            displayTranslation(translatedLyrics);
        } catch (error) {
            displayError(error)
        }
    });
}

$(watchForm);
