const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const codeLength = 5

module.exports = () => {
    let shortURL = ''
    for (let i = 0; i < Number(codeLength); i++) {
        const index = Math.floor(Math.random() * characters.length)
        shortURL += characters[index]
    }
    return shortURL
}