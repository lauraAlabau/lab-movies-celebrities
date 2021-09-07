const router = require("express").Router();

// require the Movies model here
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');



/* Iteration #6: Adding New Movies */
router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie.hbs');
});
  
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie
      .create({ title, genre, plot, cast })
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
}); 

// Necesito mezclar Celebrities y Movies

/* router.get('/movies/create', (req, res, next) => {
	Celebrity
        .find()
		.then(celebritiesDB => {
			res.render('movies/new-movie.hbs', { celebritiesDB });
		})
		.catch((err) => console.log('Error', err));
}) */

/* Iteration #7: Listing Our Movies */
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .then(moviesDB => {
          console.log('Retrieved movies from DB:', moviesDB);
          res.render('movies/movies.hbs', {movies: moviesDB});
        })
        .catch(error => {
          console.log('Error while getting the drones from the DB: ', error);
          next(error);
        });
    });

router.get('/movies/:id', (req, res, next) => {
    Movie
        .findById(req.params.id) 
        .then(thisMovie => {
            res.render('movies/movie-details.hbs', thisMovie)
        })
        .catch(error => {
            console.log('Error ', error);
            next(error);
        });
});


/* Iteration #9: Deleting Movies */
router.post('/movies/:id/delete', (req, res, next) => {
    Movie
        .findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch(error => next(error));
  });



router.get('/movies/:id/edit', (req, res, next) => {
    Movie
      .findById(req.params.id)
      .then(movieToEdit => {
        res.render('movies/edit-movie.hbs', { movie: movieToEdit }); 
      })
      .catch(error => next(error));
});
  
router.post('/movies/:id/edit', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie
      .findByIdAndUpdate(req.params.id, { title, genre, plot, cast}, { new: true })
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
});  



module.exports = router;
