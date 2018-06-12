import { NgModule } from '@angular/core';
// import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
// import { CanDeactivateGuard } from './shoppinglist/shoppeing-edit/can-deactivate-guard.service';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LogsComponent } from './logs/logs.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

const routes:Routes=[
    {path:"signIn",component:SigninComponent, canActivate:[AuthGuard]},
    {path:"logs",component:LogsComponent, canActivate:[AuthGuard]},
    {path:"settings",component:SettingsComponent, canActivate:[AuthGuard]},
    {path:"",redirectTo: "logs", pathMatch: "full"},
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