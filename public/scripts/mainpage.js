var renderMainPage = function() {
    $.post('renderMainpage', {}, function(result) {
        var successfull = result.success;
        if (successfull) {
            html = result.html;
            $("main").html(html);
        } else {
            console.log('failed loving joke: ' + jokeId);
        }
    })
}

var addJoke = function() {
    var jokeText = $("#addjokeinput textarea").val();

    if (jokeText != "") {
        var jokeObject = { jokeText: jokeText };
        $.post('addjoke', jokeObject, function(result) {

            if (result.successfull) {
                renderMainPage();
            } else {
                console.log(result.messages);
            }
        })
    }
}


var feelJoke = function(jokeId, feeling, score, domObject) {
    var jokeObject = { jokeId: jokeId, feeling: feeling };

    console.log($(domObject).find("#feelJokeLove"))

    $(domObject).find('#jokescore').html(score);

    if (feeling == 1) {
        $(domObject).find("#feelJokeHate").attr('class', "hidden");
        $(domObject).find("#feelJokeNeutral").attr('class', "hidden");
        $(domObject).find("#feelJokeLove").attr('class', "visible");
    } else if (feeling == 0) {
        $(domObject).find("#feelJokeLove").attr('class', "hidden");
        $(domObject).find("#feelJokeNeutral").attr('class', "hidden");
        $(domObject).find("#feelJokeHate").attr('class', "visible");
    } else {
        $(domObject).find("#feelJokeLove").attr('class', "hidden");
        $(domObject).find("#feelJokeHate").attr('class', "hidden");
        $(domObject).find("#feelJokeNeutral").attr('class', "visible");
    }

    $.post('feeljoke', jokeObject, function(result) {

        if (result.successfull) {
            console.log('successfully felt joke: ' + jokeId + ' with feeling: ' + feeling + '.')
        } else {
            console.log(result.messages);
        }
    })
}

var removeJoke = function(jokeId) {
    var jokeObject = { jokeId: jokeId };

    $.post('removejoke', jokeObject, function(result) {

        if (result.successfull) {
            renderMainPage();
        } else {
            console.log(result.messages);
        }
    })
}

//
// ─── STYLE ──────────────────────────────────────────────────────────────────────
//

$("#addjokeinput textarea").keyup(function() {
    var characterCount = $(this).val().length;
    console.log(characterCount);
    $('#currentcharactercount').text = characterCount;
})