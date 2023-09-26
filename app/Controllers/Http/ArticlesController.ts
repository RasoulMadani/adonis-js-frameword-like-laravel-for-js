// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";

export default class ArticlesController {
  public async view({ view }) {
    // fetch data from db
    const articles = await Database.from("articles").select("*");
    // return articles;
    return view.render("article/view", { articles });
  }

  public async create({ view }) {
    return view.render("article/create");
  }
  public async store({ response, request }) {
    const { title, content, image } = request.body();
    await Database.table("articles").insert({
      title,
      content,
      image,
      slug: Math.random(123455),
    });
    return response.redirect().back();
  }
}
