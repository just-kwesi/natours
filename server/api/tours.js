const fs = require('fs')
const router = require('express').Router()
module.exports = router;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`));

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

    if (id > tours.length) {
        return res.status(400).json({
            status: 'fail',
            message: 'invalid ID'
        })
    }

    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        'status': 'success',
        'data': {
            tour
        }
    })
})

router.post('/', (req, res) => {
    const newId = tours[tours.length - 1] + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            'status': 'success',
            'results': tours.length,
            'data': {
                tour: newTour
            }
        })
    })
})