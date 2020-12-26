class UsersRepositories {
    constructor(filename) {
        if (!filename) {
            throw new Error('Createing a new repository requires a filename')
        }
        this.filename = filename
     }
}

new UsersRepositories()