import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app-routes.module'
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { SigninComponent } from './auth/signin/signin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
// import { AuthModule } from './auth/auth.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot() 

  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
