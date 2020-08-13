const { Router } = require("react-router-dom");
const shortid = require("shortid");
const config = require("config");
const Links = require('../models/Links');
const auth = require('../middleware/auth');
const router = Router()


router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body

        const existing = await Links.findOne({ from })

        if (existing) {
            return res.json({ link: existing })
        }

        const code = shortid.generate()

        const to = baseUrl + '/t/' + code

        const link = new Links({
            to, from , code, owner: req.user.userId
        })

        await link.save()
        res.status(201).json({ link })

    } catch (error) {
        res.status(500).json({ message: "Server Error plase try again" })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Links.find({ owner: req.user.userId })
        res.json(links)
    } catch (error) {
        res.status(500).json({ message: "Server Error plase try again" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const link = await Links.findById(req.params.id)
        res.json(link)
    } catch (error) {
        res.status(500).json({ message: "Server Error plase try again" })
    }
})



module.exports = router;