import { Request, Response } from "express";
import { ProductDataBase } from "../data/ProductDataBase";
import { Product } from "../model/Product";

export async function register(req: Request, res: Response) {
  try {
    const { id, name, tags } = req.body;
    if (!id || !name || !tags) {
      res
        .status(422)
        .send("Insira corretamente as informações 'id', 'name' e 'tags'").end;
    }

    const productDataBase = new ProductDataBase();
    const product = await productDataBase.findProductById(id);

    if (product) {
      res.status(409).send("Este produto já foi cadastrado").end;
    }

    const newProduct = new Product(id, name, tags);
    await productDataBase.createProduct(newProduct);

    res.status(200).send("Produto cadastrado com sucesso!");
  } catch (error) {
    res.status(400).send(error.message);
  }
}
