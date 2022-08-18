const Category = require("../model/Category");

module.exports = {
  // show all categories
  async index(req, res) {
    const categories = await Category.findAll();

    if (categories.length < 1) {
      return res.status(400).json({ error: "Nenhuma categoria cadastrada" });
    }

    return res.json(categories);
  },

  // show specifics category
  async show(req, res) {
    const { category_id } = req.params;

    const category = await Category.findByPk(category_id);

    if (!category) {
      return res
        .status(400)
        .json({ error: "Nenhuma categoria foi encontrado" });
    }

    return res.json(category);
  },

  // create new category
  async store(req, res) {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }

    const category = await Category.create({ name });

    if (!category) {
      return res.status(400).json({ error: "A categoria não foi cadastrada" });
    }

    return res.json(category);
  },

  // update category
  async update(req, res) {
    const { category_id } = req.params;
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }

    const category = await Category.findByPk(category_id);

    if (!category) {
      return res.status(400).json({ error: "A categoria não foi cadastrada" });
    }

    try {
      await Category.update({ name }, { where: { id: category_id } });

      return res.json({ message: "Categoria atualizada com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar a categoria" });
    }
  },

  // delete category
  async delete(req, res) {
    const { category_id } = req.params;

    const category = await Category.findByPk(category_id);

    if (!category) {
      return res
        .status(400)
        .json({ error: "Nenhuma categoria foi encontrado" });
    }

    try {
      await Category.destroy({ where: { id: category_id } });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao delete a categoria" });
    }
  },
};
