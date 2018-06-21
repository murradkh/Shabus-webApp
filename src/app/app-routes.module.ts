import { NgModule } from '@angular/core';
// import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
// import { CanDeactivateGuard } from './shoppinglist/shoppeing-edit/can-deactivate-guard.service';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DataComponent } from './data/data.component';
import { AuthGuard } from './auth.guard';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
// import { UsersComponent } from './users/users.component';

const routes:Routes=[
    {path:"signIn",component:SigninComponent, canActivate:[AuthGuard]},
    {path:"logs",component:DataComponent, canActivate:[AuthGuard]},
    {path:"users",component:DataComponent, canActivate:[AuthGuard]},
    {path:"",redirectTo: "logs", pathMatch: "full"},
    {path:"logs/:id",component:DataComponent, canActivate:[AuthGuard]},
    {path:"users/:id",component:DataComponent, canActivate:[AuthGuard]},
    {path:"confirmation/:id",component:ConfirmationPageComponent},    
    {path:"pagenotfound",component:PagenotfoundComponent},
    {path:"**",redirectTo:'pagenotfound'}
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules}),
    ],
    exports: [RouterModule]

})
export class RoutingModule{
  
    

}