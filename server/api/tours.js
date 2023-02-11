const fs = require('fs')
const router = require('express').Router()
module.exports = router;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`));


router.param('id', (req, res, next, val) => {
    if (val * 1 > tours.length) {
        return res.status(400).json({
            status: 'failed',
            message: 'invalid ID'
        })
    }
    next();
})


router.get('/', (req, res) => {
    res.status(200).json({
        'status': 'success',
        'results': tours.length,
        'data': {
            tours
        }
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        'status': 'success',
        'data': {
            tour
        }
    })
})

const checkBody = (req, res, next) => {

    const { name, price } = req.body;
    // console.log(`name: ${name} and price: ${price}`)

    if (!name || !price) {
        return res.status(400).json({
            status: 'failed',
            message: 'Values not defined'
        })
    }
    next();
}

router.post('/', checkBody, (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/../../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            'status': 'success',
            'results': tours.length,
            'data': {
                tour: newTour
            }
        })
    })
})