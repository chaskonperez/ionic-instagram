import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	public client_id: string = 'bb97a18b63a34f96bb6a04975c192345';
	public redirect_uri: string = 'http://localhost:8000';
	public loading: boolean = false;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
      private iab: InAppBrowser
  	) { }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad LoginPage');

    	try {
  			let access_token = window.location.href.split('#')[1];

  			if (access_token.indexOf('access_token') !== -1) {
  				localStorage.setItem("access_token", access_token.split('=')[1]);
  				this.navCtrl.push(ProfilePage);
  			}
  		} catch (e) {}
  	}

  	loginInstagram() {
  		let params = {
  			client_id: this.client_id,
  			redirect_uri: this.redirect_uri,
  			response_type: 'token'
  		};
  		let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

      this.iab.create('https://api.instagram.com/oauth/authorize/?' + queryString);
  	}

}
