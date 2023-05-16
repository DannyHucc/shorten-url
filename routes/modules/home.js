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
                                res.render('index', {
                                    originalURL: URLData.originalURL,
                                    shortURL: URLData.shortURL
                                })
                            } else {
                                URL.create({ originalURL, shortURL })
                                    .then(() => {
                                        res.render('index', { originalURL, shortURL })
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

router.get('/:shortURL', (req, res) => {
    const path = req.params.shortURL
    const shortURL = server + path
    URL.findOne({ shortURL })
        .then((URL) => res.redirect(URL.originalURL))
        .catch((err) => console.log(err))
})

module.exports = router