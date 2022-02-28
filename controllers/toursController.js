const fs = require('fs');
const generateID = require('../utilies/generateID');

//reading tours from json file
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`, 'utf-8', err =>
    console.log(err)
  )
);

const writeTours = data => {
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/tours.json`,
    JSON.stringify(data),
    err => err && console.log(`💥 ${err}`)
  );
};

const findTour = id => tours.find(tour => tour._id === id);

const getResponse = (
  req,
  res,
  code = 400,
  status = 'failed',
  msg = `no resourse found with id(${req.params.id})`
) =>
  res.status(code).json({
    status,
    msg,
  });

exports.getAllTours = (_req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id;

  const tour = findTour(id);

  if (!tour) return getResponse(req, res);

  res.status(200).json({
    status: 'success',
    tour,
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id;

  const tour = findTour(id, res);

  if (!tour) return getResponse(req, res);

  tours = tours.filter(tour => {
    if (tour.id !== id) return tour;
  });

  writeTours(tours);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const tour = findTour(id, res);

  if (!tour) return getResponse(req, res);

  //without validation
  for (const [key, value] of Object.entries(body)) {
    if (key != 'id' && tour[key]) {
      tour[key] = value;
    }
  }

  writeTours(tours);

  res.status(200).json({
    status: 'success',
    tour,
  });
};

exports.createTour = (req, res) => {
  const id = generateID();

  if (!Object.keys(req.body).length)
    return getResponse(req, res, 400, 'faild', 'cannot create empty tour');

  const newTour = Object.assign({ id }, req.body);

  tours.push(newTour);

  writeTours(tours);

  res.status(201).json({
    status: 'sucess',
    data: {
      tour: newTour,
    },
  });
};
