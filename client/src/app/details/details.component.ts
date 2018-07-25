import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public prod_Arr;
  public prod;

  constructor(private route: ActivatedRoute, private router: Router, private prodser: ProductsService) { }

  ngOnInit() {
    // this.prod = this.prodser.getPosts();
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id = parseInt(params.get('id'));
      this.prodser.getPost(id)
        .subscribe(data => this.prod = data)
      // this.prod = this.prod[id-1];
      // console.log(this.prod);
    });
    // let id = parseInt(this.route.snapshot.paramMap.get('id'));
    // this.prod = this.prod[id-1];
  }

  showProducts(){
    // this.router.navigate(['/products'])
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
