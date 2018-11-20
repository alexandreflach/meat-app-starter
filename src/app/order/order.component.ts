import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms'
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import {tap} from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery : number = 8

  orderId: string

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService,
    private router: Router,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name:  new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]}),
      email: this.formbuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formbuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formbuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formbuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formbuilder.control(''),
      paymentOption: this.formbuilder.control('', [Validators.required])
    }, {validators: [OrderComponent.equaltsTo], updateOn: 'blur'})
  }

  static equaltsTo(group: AbstractControl) : {[key: string]:boolean}{
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation)
      return undefined

    if(email.value !== emailConfirmation.value){
      return {emailsNotMatch:true}
    }
    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
    .pipe(tap((orderId: string) =>{
      this.orderId = orderId
    }))
      .subscribe((orderId: string) =>{
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
      })
    console.log(order)
  }

  isOrderCompleted():boolean{
    return this.orderId !== undefined
  }
}
