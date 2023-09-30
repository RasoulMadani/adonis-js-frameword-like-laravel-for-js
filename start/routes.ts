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
Route.group(() => {
  Route.resource("news", "ArticlesController").paramFor("news", "slug");
}).middleware("auth");

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});
Route.on("/login").render("auth/login").as("auth.login");

Route.post("/login", async ({ auth, request, response }) => {
  const email = request.input("email");
  const password = request.input("password");
  await auth.use("web").attempt(email, password);
  return response.redirect().toPath("/");
});
// Route.get("/news/create", "ArticlesController.create").as("news_create");

// Route.post("/news", "ArticlesController.store").as("news_store");
// Route.get("/news/:slug/edit", "ArticlesController.edit").as("news_edit");

// Route.patch("/news/:slug",'ArticlesController.update').as("news_update");
// Route.delete("/news/:slug",'ArticlesController.destroy').as("news_delete");

// Route.get("/news", "ArticlesController.view").as("news_view");
