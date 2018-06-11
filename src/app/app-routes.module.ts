import { NgModule } from '@angular/core';
// import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
// import { CanDeactivateGuard } from './shoppinglist/shoppeing-edit/can-deactivate-guard.service';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
// import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
// import { HomepageComponent } from './homepage/homepage.component';
const routes:Routes=[
    {path:"SignIn",component:SigninComponent},
    {path:"",redirectTo: "SignIn", pathMatch: "full"},

    // {path:'recipebook',loadChildren:'./recipebook/recipes.module#RecipesModule'},
    {path:"pagenotfound",component:PagenotfoundComponent},
    // {path:'shoppinglist',loadChildren:'./shoppinglist/shoppinglist.module#Shoppinglistmodule'},    
    {path:"**",redirectTo:'pagenotfound'}
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules}),
    ],
    exports: [RouterModule]

})
export class RoutingModule{
  
    

}