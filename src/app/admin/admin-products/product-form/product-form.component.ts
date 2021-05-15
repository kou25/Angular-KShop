import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/categories/category.service';
import { ProductService } from 'src/app/service/products/product.service';
import { take } from 'rxjs/operators';
import {Product} from '../../interface/product'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = { key:"",title: "",price:0,category :"" ,imageUrl:"" };
  id;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id){
      this.productService.get(this.id).pipe(take(1)).subscribe((p: Product)=>this.product=p)
    }
  }

  ngOnInit(): void {}
 
  save(product) {
    if(this.id) this.productService.update(this.id, product)
    else this.productService.create(product);


    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm('Are you sure you want to delete this product ?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
