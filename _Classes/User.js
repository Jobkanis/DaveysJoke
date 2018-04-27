module.exports = function User(iduser, username, created, davey, moderator, joker) {
    this.iduser = iduser;
    this.username = username;
    if (created) {
        this.created = created.toDateString();
    } else {
        this.created = created;
    }
    this.davey = (davey == 1);
    this.moderator = (moderator == 1);
    this.joker = (joker == 1);
}