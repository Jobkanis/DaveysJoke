var renderAdminPage = function() {
    $.post('renderAdminpage', {}, function(result) {
        var successfull = result.success;
        if (successfull) {
            html = result.html;
            $("main").html(html);
        } else {
            console.log('failed loving joke: ' + jokeId);
        }
    })
}


var changeJoker = function(userId, checkBox) {
    var checked = $(checkBox).is(":checked");
    if (userId && checked != null) {
        var changeObject = { userId: userId, change: checked }
        $.post('changeJoker', changeObject, function(result) {
            if (result.successfull) {
                console.log("Successfully set jokerrights of " + userId + " to " + checked + "!");
                renderAdminPage();
            } else {
                console.log(result.messages);
                renderAdminPage();
            }
        })
    }
}

var changeModerator = function(userId, checkBox) {
    var checked = $(checkBox).is(":checked");
    if (userId && checked != null) {
        var changeObject = { userId: userId, change: checked }
        $.post('changeModerator', changeObject, function(result) {
            if (result.successfull) {
                console.log("Successfully set moderatorrights of " + userId + " to " + checked + "!");
                renderAdminPage();
            } else {
                console.log(result.messages);
                renderAdminPage();
            }
        })
    }
}

var addDavey = function(userId, checkBox) {
    var checked = $(checkBox).is(":checked");
    if (userId && checked != null) {
        var changeObject = { userId: userId, change: checked }
        $.post('addDavey', changeObject, function(result) {
            if (result.successfull) {
                console.log("Successfully set jokerrights of " + userId + " to " + checked + "!");
                renderAdminPage();
            } else {
                console.log(result.messages);
                renderAdminPage();
            }
        })
    }
}