import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination.model';


export function getPaginatedResult<T>(url: string, params: any, http: HttpClient) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map((response) => {
      paginatedResult.result = response.body as T;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(
          response.headers.get('Pagination') as any
        );
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber.toString());
  // Dont confuse pageSize with itemsPerpage, in the backend its referred to as pageSize
  params = params.append('pageSize', pageSize.toString());
  return params;
}
