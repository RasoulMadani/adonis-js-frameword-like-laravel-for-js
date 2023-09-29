// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import CreateArticleValidator from "App/Validators/CreateArticleValidator";
export default class ArticlesController {
  public async index({ view }) {
    // fetch data from db
    const articles = await Database.from("articles").select("*");
    // return articles;
    return view.render("article/view", { articles });
  }

  public async create({ view }) {
    return view.render("article/create");
  }
  public async show({params,view}){
    const article =  await Database.from('articles').where("slug",params.slug).first(); 
    return view.render('article/show',{article});
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
      slug: payload.title.replace(' ','-') + (+new Date()),
    });
    return response.redirect().toPath('/news');
    return response.redirect().back();
  }
  /**
   * edit
{view}   
return view.render*/
  public async edit({view,params}) {
    const {slug} = params;
    // return slug;
    const article = await Database.from('articles').where('slug',slug).first();
    return view.render('article/edit',{article});
    
  }
  /**
   * update
   */
  public async update({request,response,params}) {
    // return 'allah';
    const payload = await request.validate(CreateArticleValidator);
    await Database.from('articles').where('slug',params.slug).update(payload);
    return response.redirect().back();
  }
  public async destroy({params,response}){
    await Database.from('articles').where('slug',params.slug).delete();
    return response.redirect().back();
  }
}
