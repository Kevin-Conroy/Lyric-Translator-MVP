function getLyrics(artistName, songTitle) {
    const formattedArtist = encodeURI(artistName.trim());
    const formattedSong = encodeURI(songTitle.trim());
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
        $('TransOnlyButton').addClass('hidden');
        $('EnglishOnlyButton').addClass('hidden');
        $('#tr-results').empty();
        $('#en-results').empty();
        $('#transDiv').empty();
        $('#h2EngDiv').empty();
        $('#error-message').text("Sorry, try another song!");

    }
};

function displayTranslation(translatedLyrics) {
  $('#TransOnlyButton').removeClass('hidden');
  $('#tr-results').removeClass('hidden');
  $('#transDiv').text("Translation");
  $('#error-message').empty();
  $('#tr-results').empty();
  $('#tr-results').html(translatedLyrics.map(line => '<p>' + line + '</p>'))
};

function displayEnglishLyrics(englishLyrics) {
    $('#EnglishOnlyButton').removeClass('hidden');
    $('#en-results').removeClass('hidden');
    $('#engDiv').text("Lyrics (English)");
    $('#error-message').empty();
    $('#en-results').empty();
    $('#en-results').html(englishLyrics.split('\n').map(line => '<p>' + line + '</p>'));
};

$('#eng-only').click(displayEnglishOnly);
$('#trans-only').click(displayTranslationOnly);

function displayEnglishOnly(englishLyrics) {
    $('#transDiv').addClass('hidden');
    $('#engDiv').removeClass('hidden');
    $('#error-message').empty();
    $('#tr-results').addClass('hidden');
    $('#en-results').removeClass('hidden');
  };

function displayTranslationOnly(translatedLyrics) {
    $('#engDiv').addClass('hidden');
    $('#transDiv').removeClass('hidden');
    $('#error-message').empty();
    $('#en-results').addClass('hidden');
    $('#tr-results').removeClass('hidden');
}  

function translateText(language, lyrics) {
    return fetch("https://translation.googleapis.com/language/translate/v2", {
            "method": "POST",
            headers: {
                Authorization: `Bearer ya29.c.Kp0B7AeUVic-xdl8KkzbFIRjXWFDPQBBC5oNSHN1HEeeMX-IoL5PJXH1nBScUz_W8BkaJ8pTPe43gJiiwjrook4Va5SlY5QA_HMorpTVnrghdKDNwMO9RUNe94IVrnSIjvb63LpnFbQAI3rUre99jg_TW-5lD9ux0vCgN-DCT1Q8l2vfIX-fdCICB7-t9k5cMhfnJSzEZUYmNTpAzsQigw`
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
$('#EnglishOnlyButton').addClass('hidden');
$('#TransOnlyButton').addClass('hidden');
