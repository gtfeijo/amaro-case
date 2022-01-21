import { Product } from "../model/Product";
import { IdGenerator } from "../services/IdGenerator";
import { BaseDataBase } from "./BaseDataBase";

export class ProductDataBase extends BaseDataBase {
  public async createProduct(product: Product): Promise<void> {
    try {
      await BaseDataBase.connection("produto_amaro").insert({
        id: product.getId(),
        name: product.getName(),
      });

      for (let t of product.getTags()) {
        const idGenerator = new IdGenerator();
        const idTag = idGenerator.generate();
        await BaseDataBase.connection("tags").insert({
          id: idTag,
          name: t,
        });

        await BaseDataBase.connection("produto_amaro_tags").insert({
          id_produto_amaro: product.getId(),
          id_tags: idTag,
        });
      }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findProductById(id: string): Promise<Product> {
    try {
      const product = await BaseDataBase.connection("produto_amaro")
        .select("*")
        .where({ id });
      return product[0] && Product.toProductModel(product[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findProductByIdForQuery(id: string): Promise<any> {
    try {
      const product = await BaseDataBase.connection.raw(
        `select produto_amaro.id as id, produto_amaro.name as name, tags.name as tags from produto_amaro_tags inner join produto_amaro on produto_amaro_tags.id_produto_amaro = produto_amaro.id inner join tags on produto_amaro_tags.id_tags = tags.id where produto_amaro.id = ${id}`
      );
      return product[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findProductByName(name: string): Promise<any> {
    try {
      const product = await BaseDataBase.connection.raw(
        `select produto_amaro.id as id, produto_amaro.name as name, tags.name as tags from produto_amaro_tags 
        inner join produto_amaro on produto_amaro_tags.id_produto_amaro = produto_amaro.id 
        inner join tags on produto_amaro_tags.id_tags = tags.id where produto_amaro.name = "${name}"`
      );
      return product[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findProductByTag(tag: string): Promise<Product> {
    try {
      const product = await BaseDataBase.connection.raw(
        `select produto_amaro.id as id, produto_amaro.name as name, tags.name as tags from produto_amaro_tags 
        inner join produto_amaro on produto_amaro_tags.id_produto_amaro = produto_amaro.id 
        inner join tags on produto_amaro_tags.id_tags = tags.id where tags.name = "${tag}"`
      );
      return product[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
