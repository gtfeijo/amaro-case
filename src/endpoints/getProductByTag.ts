import { Request, Response } from "express";
import { ProductDataBase } from "../data/ProductDataBase";

export async function getProductByTag(req: Request, res: Response) {
  try {
    const { tag } = req.params;

    if (!tag) {
      res.status(422).send("Tag não informada!").end;
    }

    const productDataBase = new ProductDataBase();
    const product: any = await productDataBase.findProductByTag(tag);

    if (!product) {
      res.status(404).send("Nenhum produto corresponde a tag indicada").end;
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
