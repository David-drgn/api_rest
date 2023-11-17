import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  list: Array<{
    id: string,
    nome: string,
    banda: string,
    duracao: string,
    img: string
  }> = []

  listAUX: Array<{
    id: string,
    nome: string,
    banda: string,
    duracao: string,
    img: string
  }> = []

  load = false

  constructor(
    private http: HttpService,
    private dialog: MatDialog
  ){}

  ngOnInit(){
    this.getMusic()
  }

  search(selected: any){
    this.list = this.listAUX.filter((e:any) => e.nome.toLowerCase().includes(selected.toLowerCase()) || e.banda.toLowerCase().includes(selected.toLowerCase()) || e.duracao.toLowerCase().includes(selected.toLowerCase()))
    if(selected == '' || selected == null) this.list = this.listAUX
  }

  openDialog(title: string, message:  string){
    this.dialog.open(AlertComponent, {
      data:{
        title,
        message
      }
    })
  }

  getMusic(){
    this.load = true
    this.http.get('getterMusic').subscribe((res: any) => {
      if(res.erro){
        this.load = false
        this.openDialog('Erro', 'Erro ao puxar as músicas cadastradas')
        return
      }
      this.load = false
      this.list = res.result
      this.listAUX = this.list
    })
  }

}
