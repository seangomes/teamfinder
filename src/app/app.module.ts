import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';



//COMPONENTS
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserDeleteComponent } from './components/users/user-delete/user-delete.component';
import { FindteamComponent } from './components/findteam/findteam.component';
import { NetworkComponent } from './components/network/network.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

//SERVICES
import { AuthService } from "./providers/auth/auth.service";
import { UserService } from "./components/users/user.service";






//ROUTES
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'network', component: NetworkComponent },
  { path: 'findteam', component: FindteamComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: 'users', component: UserListComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBMTgK7bOe2Di37XvgIzFR7Pubf1yKVjPA",
  authDomain: "teamfinder-3740e.firebaseapp.com",
  databaseURL: "https://teamfinder-3740e.firebaseio.com",
  projectId: "teamfinder-3740e",
  storageBucket: "teamfinder-3740e.appspot.com",
  messagingSenderId: "345706299764"
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    FindteamComponent,
    NetworkComponent,
    MyprofileComponent,
    UserListComponent,
    UserDetailsComponent,
    UserRegisterComponent,
    UserDeleteComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    ReactiveFormsModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
