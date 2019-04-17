module.exports = (app) => {
    const photos = require('../controllers/photo.controller.js');

    // Create a new photo
    app.post('/photos', photos.create);

    // Retrieve all photos
    app.get('/photos', photos.findAll);

    // Retrieve a single photo with photoId
    app.get('/photos/:photoId', photos.findOne);

    // Update a photo with photoId
    app.put('/photos/:photoId', photos.update);

    // Delete a photo with photoId
    app.delete('/photos/:photoId', photos.delete);
}
