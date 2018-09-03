import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Instagram } from '@ionic-native/instagram';
import { HttpClient, HttpParams } from '@angular/common/http';

import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	public user: any = {};
	public loading: boolean = false;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams, 
  		private instagram: Instagram,
  		private http: HttpClient) {
  	}

  	ionViewDidLoad() {
   		console.log('ionViewDidLoad ProfilePage');

    	let params = new HttpParams();
		params = params.set('access_token', localStorage.getItem("access_token"));

  		this.http.get('https://api.instagram.com/v1/users/self/', {params}).subscribe(response => {
  			this.user = response['data'];
  		}, errorResponse => {
  			localStorage.removeItem('access_token');
  			this.navCtrl.push(LoginPage);
  		});
  	}

  	shareImage() {
  		this.loading = true;
    	this.instagram.share('https://picsum.photos/200/300/?random', 'Caption')
    	.then(() => {
    		this.loading = false;
    		console.log('Shared!')
    	})
    	.catch((error: any) => {
    		this.loading = false;
    		console.error(error)
    	});
  	}

}
