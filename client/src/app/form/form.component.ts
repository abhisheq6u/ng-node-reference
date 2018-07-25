import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public info = {
    name: '',
    job: ''
  };

  constructor(private u_serv: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    // console.log(this.info)
    this.u_serv.registerUser(this.info)
      .subscribe(data => {
        if(data){
          console.log('done');
          console.log(data);
          this.router.navigate(['/products', {success: true}]);
        }else{
          console.log('error')
        }
      },
    err => console.log(err));
  }

}
