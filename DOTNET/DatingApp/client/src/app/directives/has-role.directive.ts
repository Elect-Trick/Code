import { AccountService } from './../Services/account.service';
import { Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { Directive } from '@angular/core';
import { User } from '../models/user.model';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appHasRole]', //*Ngif, *ngFor , *appHasRole
})
export class HasRoleDirective implements OnInit {
  user!: User;
  @Input() appHasRole!: string[];
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user: User) => {
      this.user = user;
    });
  }
  async ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as any) as User;
    // Clear the view if no roles found
    if (user === null || !user?.roles) {
      this.viewContainerRef.clear();
      return;
    } else {
      if (Array.isArray(user.roles)) {
        // If the user has a role, then we create an emdeded view
        if (user.roles.some((r: any) => this.appHasRole.includes(r))) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      } else {
        this.viewContainerRef.clear();
      }
    }
  }
}
