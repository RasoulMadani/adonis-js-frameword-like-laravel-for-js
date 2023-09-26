// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import CreateArticleValidator from "App/Validators/CreateArticleValidator";
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

    // try {
    //   const payload = await request.validate({ schema: createArticleSchema });
    //   await Database.table("articles").insert({
    //     ...payload,
    //     slug: payload.title,
    //   });
    //   return response.redirect().back();
    // } catch (error) {
    //   response.badRequest(error.messages);
    // }
    const payload = await request.validate(CreateArticleValidator);
    await Database.table("articles").insert({
      ...payload,
      slug: payload.title,
    });
    return response.redirect().back();
  }
}
