import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products;

  constructor(private productlist: ProductsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productlist.getPosts()
      .subscribe(datta => this.products = datta);
    // this.products = this.productlist.getData();
    // console.log(this.products);
  }

  showDetails(product){
    // console.log(product);
    this.router.navigate([product.id], {relativeTo:this.route});
  }

}