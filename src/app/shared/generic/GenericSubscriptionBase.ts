import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable()
export class GenericSubscriptionBase implements OnDestroy {

    protected subscriptions = new Subscription();

    constructor() { }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
  
}