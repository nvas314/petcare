import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { RouterModule } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  imports: [FooterComponent,RouterModule,
    MatCard,MatCardContent,MatButton,MatButtonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
