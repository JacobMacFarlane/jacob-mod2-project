class UserInfo {
    constructor(userInfo) {
        this.userInfo = userInfo
    }
    getUserById = (id) => {
        return this.userInfo.find(user => user.id === id)
    }
    getUserFirstName = (id) => {
        const theUser = this.getUserById(id)

        if (!theUser) { 
            return undefined
        } else {
            return theUser.name.split(' ')[0]
        }
    }
}


module.exports = UserInfo