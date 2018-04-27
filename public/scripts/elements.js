var url = "http://localhost:4000/";

function textAreaAdjust(eSource, eTarget, min) {
    setTimeout(function() {
        eTarget.style.cssText = 'height:auto; padding:0';
        var sh = eSource.scrollHeight;
        eTarget.style.cssText = 'height:' + (sh + min) + 'px';
    }, 0);
}

function renderHeader() {
    $.post('renderHeader', {}, function(result) {
        var successfull = result.success;
        if (successfull) {
            html = result.html;
            $("header").html(html);
        } else {
            console.log('failed rendering header');
        }
    })
}

function renderFooter() {
    $.post('renderFooter', {}, function(result) {
        var successfull = result.success;
        if (successfull) {
            html = result.html;
            $("footer").html(html);
        } else {
            console.log('failed rendering footer');
        }
    })
}

function renderPage() {
    location.reload();
}



function login() {
    var username = $("#loginNameInput").val();
    var password = $("#loginPasswordInput").val();

    var loginObject = { username: username, password: password };
    $.post('/login', loginObject, function(result) {
        if (result.successfull) {
            console.log('rendering');
            renderPage();
        } else {
            console.log(result.messages);
        }
    })
}

function register() {
    var username = $("#loginNameInput").val();
    var password = $("#loginPasswordInput").val();

    $.post('/register', { username: username, password: password }, function(result) {
        if (result.successfull) {
            console.log('rendering');
            renderPage();
        } else {
            console.log(result.messages);
        }
    })
}

function logout() {
    $.post('/logout', {}, function(result) {
        if (result.successfull) {
            console.log('rendering');
            renderPage();
        } else {
            console.log(result.messages);
        }
    })
}

function toMainpage() {
    window.location.href = url;
    renderMainpage();
}

function toAdminpage() {
    window.location.href = url + 'admin';
}

function toggleMenuOptions() {
    var element = $('#menu');
    if (element.hasClass('opened')) {
        element.removeClass('opened');
    } else {
        element.addClass('opened');
    }
}