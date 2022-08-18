const Movie = require("../model/Movie");

module.exports = {
  // show all categories
  async index(req, res) {
    const movies = await Movie.findAll({
      include: {
        association: "category",
        attributes: ["id", "name"],
      },
      attributes: ["id", "name", "image", "parental", "duration"],
    });

    if (movies.length < 1) {
      return res.status(400).json({ error: "Nenhum Filme cadastrado" });
    }

    return res.json(movies);
  },

  // get banner
  async banner(req, res) {
    const movies = await Movie.findAndCountAll({ attributes: ["id"] });

    const number = Math.floor(Math.random() * movies.rows.length);

    const banner = await Movie.findByPk(number, {
      attributes: ["id", "name", "banner"],
    });

    return res.json(banner);
  },

  // show specifics category
  async show(req, res) {
    const { movie_id } = req.params;

    const movie = await Movie.findByPk(movie_id, {
      attributes: [
        "id",
        "name",
        "description",
        "year",
        "director",
        "type",
        "parental",
        "duration",
        "banner",
        "image",
      ],
      include: {
        association: "category",
        attributes: ["id", "name"],
      },
    });

    if (!movie) {
      return res.status(400).json({ error: "Nenhum filme foi encontrado" });
    }

    return res.json(movie);
  },

  // create new category
  async store(req, res) {
    const {
      category,
      name,
      description,
      year,
      director,
      type,
      duration,
      parental,
      banner,
      image,
    } = req.body;

    if (!category || category === "") {
      return res.status(400).json({ error: "O campo category é obrigatório" });
    }
    if (!name || name === "") {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }
    if (!description || description === "") {
      return res.status(400).json({ error: "O campo descrição é obrigatório" });
    }
    if (!year || year === "") {
      return res.status(400).json({ error: "O campo ano é obrigatório" });
    }
    if (!director || director === "") {
      return res.status(400).json({ error: "O campo diretor é obrigatório" });
    }
    if (!type || type === "") {
      return res.status(400).json({ error: "O campo tipo é obrigatório" });
    }
    if (!duration || duration === "") {
      return res.status(400).json({ error: "O campo duração é obrigatório" });
    }
    if (!parental || parental === "") {
      return res
        .status(400)
        .json({ error: "O campo classificação indicativa é obrigatório" });
    }

    const movie = await Movie.create({
      category_id: category,
      name,
      description,
      year,
      director,
      type,
      duration,
      parental,
      banner,
      image,
    });

    if (!movie) {
      return res.status(400).json({ error: "O filme não foi cadastrado" });
    }

    return res.json(movie);
  },

  // update category
  async update(req, res) {
    const { movie_id } = req.params;
    const {
      category,
      name,
      description,
      year,
      director,
      type,
      duration,
      parental,
      image,
      banner,
    } = req.body;

    if (!category || category === "") {
      return res.status(400).json({ error: "O campo category é obrigatório" });
    }
    if (!name || name === "") {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }
    if (!description || description === "") {
      return res.status(400).json({ error: "O campo descrição é obrigatório" });
    }
    if (!year || year === "") {
      return res.status(400).json({ error: "O campo ano é obrigatório" });
    }
    if (!director || director === "") {
      return res.status(400).json({ error: "O campo diretor é obrigatório" });
    }
    if (!type || type === "") {
      return res.status(400).json({ error: "O campo tipo é obrigatório" });
    }
    if (!duration || duration === "") {
      return res.status(400).json({ error: "O campo duração é obrigatório" });
    }
    if (!parental || parental === "") {
      return res
        .status(400)
        .json({ error: "O campo classificação indicativa é obrigatório" });
    }

    const movie = await Movie.findByPk(movie_id);

    if (!movie) {
      return res.status(400).json({ error: "O filme não foi cadastrado" });
    }

    try {
      await Movie.update(
        {
          category_id: category,
          name,
          description,
          year,
          director,
          type,
          duration,
          parental,
          banner,
          image,
        },
        { where: { id: movie_id } }
      );

      return res.json({ message: "Filme atualizado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar o filme" });
    }
  },

  // delete category
  async delete(req, res) {
    const { movie_id } = req.params;

    const movie = await Movie.findByPk(movie_id);

    if (!movie) {
      return res.status(400).json({ error: "Nenhum filme foi encontrado" });
    }

    try {
      await movie.destroy({ where: { id: movie_id } });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao delete o filme" });
    }
  },
};
