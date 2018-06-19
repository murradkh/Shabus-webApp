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
import { DataComponent } from './data/data.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    PagenotfoundComponent,
    DataComponent,
    SettingsComponent,
    ConfirmationPageComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyChc7CUHov8ED6Wj2zhFO02I605QnNqPrc'
          })
         
  ],
  providers: [HttpService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
