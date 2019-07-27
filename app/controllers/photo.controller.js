const Photo = require('../models/photo.model.js');
const fs = require('fs');

// Create and Save a new photo
exports.create = (req, res) => {

  // Validate request
  if(!req.body.img) {
    return res.status(400).send({
        message: "No photo to upload!"
    });
  }

  const photo = new Photo({
    data: req.body.img,
    name: req.body.name,
    contentType: 'img/png',
  });

  photo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving the photo"
        });
    });

};

// Retrieve and return all photos from the database.
exports.findAll = (req, res) => {
    Photo.find()
    .then(photos => {
        res.send(photos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving photos."
        });
    });
};

// Find a single photo with a photoId
exports.findOne = (req, res) => {
    Photo.findById(req.params.photoId)
    .then(photo => {
        if(!photo) {
            return res.status(404).send({
                message: "photo not found with id " + req.params.photoId
            });
        }

        res.send(new Buffer(photo.data, 'binary'));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "photo not found with id " + req.params.photoId
            });
        }
        return res.status(500).send({
            message: "Error retrieving photo with id " + req.params.photoId
        });
    });
};

// Update a photo identified by the photoId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "photo content can not be empty"
        });
    }

    // Find photo and update it with the request body
    Photo.findByIdAndUpdate(req.params.photoId, {
      data: fs.readFileSync(req.body.img).toString('base64'),
      name: req.body.name,
      contentType: 'img/png',
    }, {new: true})
    .then(photo => {
        if(!photo) {
            return res.status(404).send({
                message: "photo not found with id " + req.params.photoId
            });
        }
        res.send(photo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "photo not found with id " + req.params.photoId
            });
        }
        return res.status(500).send({
            message: "Error updating photo with id " + req.params.photoId
        });
    });
};

// Delete a photo with the specified photoId in the request
exports.delete = (req, res) => {
    Photo.findByIdAndRemove(req.params.photoId)
    .then(photo => {
        if(!photo) {
            return res.status(404).send({
                message: "photo not found with id " + req.params.photoId
            });
        }
        res.send({message: "photo deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "photo not found with id " + req.params.photoId
            });
        }
        return res.status(500).send({
            message: "Could not delete photo with id " + req.params.photoId
        });
    });
};
