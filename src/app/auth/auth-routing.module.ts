
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
    {path:"",redirectTo:'SignIn',pathMatch:'full'}, 
    {path:'SignIn',component:SigninComponent}    
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})

export class AuthRoutes {


}