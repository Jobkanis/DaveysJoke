module.exports = {
    database: {
        online_connection: false
    },

    debug: {
        enabled: true,
        showRequests: true,
        showSessions: false,
        databaseErrorMessages: false
    },

    messages: {
        global: {
            __subject: 'global',
            error: 'An error occured. Please try again.',
            inputError: 'An error occured due to incorrect input. Please try again.'
        },

        register: {
            __subject: 'register',
            usernameTaken: 'This username is  already taken!',
            passwordTooSmall: 'Your password has to be at least 8 digits.',
            missingInformation: 'Please insert a username and a password to register.'
        },

        login: {
            __subject: 'login',
            missingInformation: 'Please insert a username and a password to login.',
            incorrectInformation: 'Incorrect username or password. Please try again.',
            sessionCreationFail: 'Failed to stabalize a new session. Please try again.'
        },

        logout: {
            __subject: 'logout',
            notLoggedIn: 'An error occured. You were not logged in!',
            error: 'An error occured whlie logging out. Please try again.'
        },

        session: {
            __subject: 'session',
            error: 'An error occured while creating a session. Please try again.',
            userNotFound: 'An error occured while gathering the user information. Please try again.'

        }
    }
}