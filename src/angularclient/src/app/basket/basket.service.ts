import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AcntService } from "../app/account/acnt.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Basket, IBasket, IBasketItem, IBasketTotal } from "../shared/models/basket";
import { IProduct } from "../shared/models/product";

export class BasketService {
    baseUrl='http://localhost:9010';
    constructor(private http:HttpClient,private acntService:AcntService,private router:Router){}

        private basketSource = new BehaviorSubject<Basket | null>(null);
        basketSource$=this.basketSource.asObservable();
        private basketTotalSource=new BehaviorSubject<IBasketTotal |null>(null);
        basketTotalSource$=this.basketTotalSource.asObservable();
    


        getBasket(userName:string){
            return this.http.get<IBasket>(this.baseUrl + '/Basket/GetBasket/' + userName + '').subscribe({
                next:basket=>{
                    this.basketSource.next(basket);
                    this.calculateBasketTotal();
                }
            })
        }

        setBasket(basket:IBasket){
            return this.http.post<IBasket>(this.baseUrl + '/Basket/CreateBasket',basket).subscribe({
                next : basket =>{
                    this.basketSource.next(basket);
                    this.calculateBasketTotal();
                }
            })
        };
        checkoutBasket(basket:IBasket){
            const httpOptionsValue={
           headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': this.acntService.authorizationHeaderValue
            })
        };
        return this.http.post<IBasket>(this.baseUrl + '/Basket/CheckoutV2',basket,httpOptionsValue).subscribe({
            next : basket =>{
                this.basketSource.next(null);
                this.router.navigateByUrl('/');
            }
        });
    }
addItemToBasket(item:IProduct,quantity:1)
{
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasket() ?? this.createBasket();
    basket.items=this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket);
}

incrementItemQuantity(item:IBasketItem){
    const basket=this.getCurrentBasket();
    if(!basket) return;
    const foundItem=basket.items.findIndex(x=>x.productId===item.productId);
    basket.items[foundItem].quantity++;
    this.setBasket(basket);
}
    private createBasket(): IBasket {
        const basket = new Basket();
        localStorage.setItem('basket_username',basket.userName);
        return basket;
    }
    private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity:number): IBasketItem[] {
        const item=items.find(x=>x.productId==itemToAdd.productId);
        if(item){
            item.quantity+=quantity;
        }
        else{
            itemToAdd.quantity=quantity;
            items.push(itemToAdd);
        }
        return items;
    }



    removeItemFromBasket(item: IBasketItem) {
        const basket = this.getCurrentBasket();
        if (!basket) return;
        const foundItemIndex = basket.items.findIndex((x) => x.productId === item.productId);
        if (foundItemIndex < 0) return;
        basket.items.splice(foundItemIndex, 1);
        if (basket.items.length > 0) {
            this.setBasket(basket);
        } else {
            this.deleteBasket(basket.userName);
        }
    }

    deleteBasket(userName: string)
    {
        return this.http.delete(this.baseUrl + '/Basket/DeleteBasket/' + userName).subscribe({
            next : _ =>{
                this.basketSource.next(null);
                this.basketTotalSource.next(null);
                localStorage.removeItem('basket_username');
            },error: (err)=>{
                console.log('Error Occurred while delting basket');
                console.log(err);
            }
        })
    }

    decrementItemQuantity(item: IBasketItem) {
        const basket=this.getCurrentBasket();
        if(!basket) return;
        const foundItemInde=basket.items.findIndex(x=>x.productId===item.productId);
        if (basket.items[foundItemInde].quantity>1) {
            basket.items[foundItemInde].quantity--;
            this.setBasket(basket);
        } else {
this.removeItemFromBasket(item);
        }
    }

   

    private mapProductItemToBasketItem(item: IProduct): IBasketItem {
        return {
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity:0,
            imageFile: item.imageFile
        };
    }

        private calculateBasketTotal(){
            const basket=this.getCurrentBasket();
            if(!basket) return;
            const total=basket.items.reduce((x,y)=>(y.price * y.quantity) + x,0);
            this.basketTotalSource.next({total});
        }

        getCurrentBasket(){
            return this.basketSource.value;
        }
}