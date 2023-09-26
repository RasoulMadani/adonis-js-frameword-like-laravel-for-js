/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";
import Database from "@ioc:Adonis/Lucid/Database";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
  return "hello World";
});

// Route.get('/news',({view})=>{

//   return view.render('news.view');
// })
// Route.on("/news").render("news.view");

Route.post("/news", ({ request, response }) => {
  // console.log(request.body);
  // console.log('first');
  // const {email,password} =request.body()
  // return {email,password,'allah':"allah"};
  return response.redirect("/news");
});
Route.delete("/news/:id", ({ params }) => {
  return params;
})
  .where("id", {
    match: /^[0-9]+$/,
    cast: (id) => Number(id),
  })
  .as("news");

Route.get("/news", async({ view }) => {
  // fetch data from db
  const articles = await Database.from("articles").select("*");
  // return articles;
  return view.render("news.view",{articles});
}).as("news_view");
