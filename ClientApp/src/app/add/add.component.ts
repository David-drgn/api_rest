import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  load = false;

  constructor(private http: HttpService, private dialog: MatDialog) {}

  openDialog(title: string, message: string) {
    this.dialog.open(AlertComponent, {
      data: {
        title,
        message,
      },
    });
  }

  imgValue: string =
    'https://th.bing.com/th/id/OIP.RvO3-ReoO92GOc6vFji9TAHaHa?w=190&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7';

  IMG(img: any) {
    console.table(this.imgValue);
    this.imgValue = img;
    console.table(this.imgValue);
  }

  submit(img: string, nome: string, banda: string, duracao: string) {
    this.load = true;
    this.http
      .post('registerMusic', {
        nome,
        banda,
        duracao,
        img,
      })
      .subscribe(
        (res: any) => {
          if (res.erro) {
            this.load = false;
            this.openDialog('Erro', 'Erro ao cadastrar');
            return;
          }
          this.load = false;
          return;
        },
        (error: any) => {
          this.load = false;
          this.openDialog('Erro', 'Erro ao puxar as músicas cadastradas');
          return;
        }
      );
  }
}
