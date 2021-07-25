import { Component, OnInit } from '@angular/core';
import {faFacebook,faTwitter,faInstagram,faPinterest} from '@fortawesome/free-brands-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landig-page',
  templateUrl: './landig-page.component.html',
  styleUrls: ['./landig-page.component.css']
})
export class LandigPageComponent implements OnInit {
  constructor() { }

  ngOnInit(){
  }
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faPinterest = faPinterest;
}
