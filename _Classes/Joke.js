module.exports = function Joke(jokeId, jokText, creator, personalFeelings, userLoves, userHates, sessionLoves, sessionHates) {
    this.jokeId = jokeId;
    this.jokeText = jokText;
    this.creator = creator;

    this.personalFeelings = personalFeelings;

    this.userLoves = userLoves;
    this.userHates = userHates;

    this.userTotal = this.userLoves - this.userHates;

    this.sessionLoves = sessionLoves;
    this.sessionHates = sessionHates;

    this.sessionTotal = this.sessionLoves - this.sessionHates;

    this.isCreator = function(userId) {
        if (userId) {
            if (userId == this.creator) {
                return true;
            }
        }
        return false;
    }

    this.getScore = function() {
        return this.userTotal + this.sessionTotal;
    };

    this.getNeutralScore = function() {
        if (this.personalFeelings == 1) {
            return this.getScore() - 1;
        } else if (this.personalFeelings == 0) {
            return this.getScore() + 1;
        } else {
            return this.getScore();
        }
    }

    this.inLoves = function() {
        return (this.personalFeelings == 1);
    };

    this.inHates = function() {
        return (this.personalFeelings == 0);
    };
}