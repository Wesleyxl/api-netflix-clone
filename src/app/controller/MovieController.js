const Movie = require("../model/Movie");

module.exports = {
  // show all categories
  async index(req, res) {
    const movies = await Movie.findAll();

    if (movies.length < 1) {
      return res.status(400).json({ error: "Nenhum Filme cadastrado" });
    }

    return res.json(movies);
  },

  // show specifics category
  async show(req, res) {
    const { movie_id } = req.params;

    const movie = await Movie.findByPk(movie_id);

    if (!movie) {
      return res.status(400).json({ error: "Nenhum filme foi encontrado" });
    }

    return res.json(movie);
  },

  // create new category
  async store(req, res) {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }

    const movie = await Movie.create({ name });

    if (!movie) {
      return res.status(400).json({ error: "O filme não foi cadastrado" });
    }

    return res.json(movie);
  },

  // update category
  async update(req, res) {
    const { movie_id } = req.params;
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }

    const movie = await Movie.findByPk(movie_id);

    if (!movie) {
      return res.status(400).json({ error: "O filme não foi cadastrado" });
    }

    try {
      await Movie.update({ name }, { where: { id: movie_id } });

      return res.json({ message: "Filme atualizado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar o filme" });
    }
  },

  // delete category
  async destroy(req, res) {
    const { movie_id } = req.params;

    const movie = await Movie.findByPk(movie_id);

    if (!movie) {
      return res.status(400).json({ error: "Nenhum filme foi encontrado" });
    }

    try {
      await movie.delete({ where: { id: movie_id } });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao delete o filme" });
    }
  },
};
