var Message = require('./Message')

module.exports = function Result() {
    this.successfull = true;

    this.successes = 0;
    this.fails = 0;

    this.messages = new Message('global', 'No erorr message is found...');

    this.results = {};

    this.addSuccess = function() {
        this.successes++;
    }

    this.addFail = function(subject, message) {
        this.successfull = false;
        this.fails++;
        this.messages = new Message(subject, message);
    }

    this.addResult = function(name, result) {
        this.successes++;
        this.results[name] = result;
    }

    this.resetSuccess = function() {
        this.successfull = true;
    }

    this.getResult = function(name) {
        if (this.results[name]) {
            return this.results[name];
        } else {
            return null;
        }
    }

    this.GRAPResult = function(name) {
        if (this.results[name]) {
            var returnval = this.results[name];
            this.results[name] = null;
            return returnval;
        } else {
            return null;
        }
    }

    this.getMessage = function(num) {
        if (!num) {
            num = 0;
        }
        if (this.messages[num]) {
            return this.messages[num];
        } else {
            return null;
        }
    }

    this.send = function(res) {
        this.results = null;
        res.send(this);
    }
}