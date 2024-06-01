import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'eShopping';

  ngOnInit(): void {
    const bucket_username = localStorage.getItem('bucket_username');

    if (!bucket_username) {
      //this.router.navigate(['/login']);
    }
  }
}
