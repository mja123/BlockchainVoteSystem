class User {
    voteHash;
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    setVoteHash(voteHash) {
        this.voteHash = voteHash;
    }
    getVoteHash() {
        return this.voteHash;
    }
}
export default User;