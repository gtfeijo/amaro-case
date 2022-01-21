import { Request, Response } from "express";
import { ProductDataBase } from "../data/ProductDataBase";
import { Product } from "../model/Product";

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(422).send("Id não informado!").end;
    }

    const productDataBase = new ProductDataBase();
    const product = await productDataBase.findProductByIdForQuery(id);

    if (!product) {
      res.status(404).send("Produto não encontrado!").end;
    }

    const tags = product.map((produtoTag: any) => {
      return produtoTag.tags;
    });

    const result = {
      id: id,
      name: product[0].name,
      tags: tags,
    };

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
