import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let height = document.getElementById('body');
    height?.setAttribute("style",`height:${window.innerHeight}px`);
  }
}
