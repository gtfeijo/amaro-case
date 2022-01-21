import { BaseDataBase } from "./BaseDataBase";

class Migrations extends BaseDataBase {
  async createTable() {
    await BaseDataBase.connection.raw(`
            create table produto_amaro(
                id int primary key,
                name varchar(255)
            );
            
            create table tags (
                id varchar(255) primary key,
                name varchar(255)
            );
            
            create table produto_amaro_tags(
                id_produto_amaro int,
                id_tags varchar(255),
                primary key(id_produto_amaro , id_tags),
                foreign key (id_produto_amaro) references produto_amaro(id),
                foreign key (id_tags) references tags(id)
            );
        `);
    console.log("Tabelas criadas com sucesso!");
  }
}

const createTableMigrations = new Migrations();
createTableMigrations.createTable();
