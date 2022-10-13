import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ProductData } from '../interfaces/product-data';

@Injectable({
  providedIn: 'root',
})

export class GeneralProductsService {
  constructor(private http: HttpClient) {}

  // get All Product✅
  getAllProducts(paginationObj: any): Observable<ProductData[]> {
    return this.http
      .get<ProductData[]>(`${environment.apiRoot}products/get-all`, {
        params: paginationObj,
      })
      .pipe(retry(3), catchError(this.handleError));
  }

  // Function to return all Categories in API✅
  getAllCategories(): Observable<ProductData[]> {
    return this.http
      .get<ProductData[]>(`${environment.apiRoot}products/get-all-categories`)
      .pipe(retry(3), catchError(this.handleError));
  }

  // MAking change by Selected value from category [Filter By Category]✅
  filterProductsByCategory(categoryName: any) {
    return this.http.get(
      `${environment.apiRoot}products/category/${categoryName}`
    );
  }

  // Filter By Name ✅
  filterProductsByName(name: string) {
    return this.http.get(`${environment.apiRoot}products/name/${name}`);
  }

  //  Get Product By Id [Get Product Details] ✅
  getProductById(id: number) {
    return this.http.get(`${environment.apiRoot}products/id/${id}`);
  }

  // Handle error in any funstion
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured:', error.error);
    } else {
      console.error(
        `returned code from backend ${error.status} and error is:`,
        error.error
      );
    }
    return throwError(
      () => new Error('Sorry.. Something bad was happenning, Please Try again')
    );
  }
}
