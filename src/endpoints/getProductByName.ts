import { Request, Response } from "express";
import { ProductDataBase } from "../data/ProductDataBase";

export async function getProductByName(req: Request, res: Response) {
  try {
    const { name } = req.params;

    if (!name) {
      res.status(422).send("Nome não informado!").end;
    }

    const productDataBase = new ProductDataBase();
    const product = await productDataBase.findProductByName(name);

    if (!product) {
      res.status(404).send("Produto não encontrado!").end;
    }

    const tags = product.map((produtoTag: any) => {
      return produtoTag.tags;
    });

    const result = {
      id: product[0].id,
      name: product[0].name,
      tags: tags,
    };

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
