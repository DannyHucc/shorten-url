const express = require('express')
const router = express.Router()
const URL = require('models/shortenURL')
const generateShortURL = require('utils/shortenURL_generator')

const port = process.env.PORT || 3000
const server = `http://localhost:${port}/`

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/', (req, res) => {
    const { originalURL } = req.body

    function checkPath() {
        const path = generateShortURL()
        const shortURL = server + path

        URL.exists({ shortURL })
            .then((exist) => {
                if (exist) {
                    checkPath()
                } else {
                    URL.findOne({ originalURL })
                        .then((URLData) => {
                            if (URLData) {
                                console.log(`Have URL: res.render('index')`)
                            } else {
                                URL.create({ originalURL, shortURL })
                                    .then(() => {
                                        console.log(`Create URL: res.render('index')`)
                                    })
                                    .catch((err) => console.log(err))
                            }
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err))
    }

    checkPath()
})

module.exports = router