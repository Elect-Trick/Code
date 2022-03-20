import { MembersService } from 'src/app/Services/members.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Member } from '../models/member.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MemberDetailResolver implements Resolve<Member> {
  constructor(private memberService: MembersService) {}
  // No need to subscribe, the router will handle that
  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.memberService.getMember(
      route.paramMap.get('username') as string
    );
  }
}
