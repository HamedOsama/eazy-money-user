import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MerchantProductsService {
  constructor(private http: HttpClient) {}

  getYourOwnProducts(paginationObj: any, token: any) {
    return this.http.get(`${env.apiRoot}products/get-own-products`, {
      params: paginationObj,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  addProduct(data: any, token: any) {
    return this.http.post(`${env.apiRoot}products/create`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  // Get Product Details ✅
  getProductDetails(id: number) {
    return this.http.get(`${env.apiRoot}/products/id/${id}`);
  }

  // Update Product ✅
  updateProduct(id: any, data: any, token: any) {
    return this.http.patch(`${env.apiRoot}products/${id}`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  // Delete Product ✅
  deleteProduct(id: number, token: any) {
    return this.http.delete(`${env.apiRoot}products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getAllOrders(token: any, obj: any) {
    return this.http.get(`${env.apiRoot}users/order/seller`, {
      params: obj,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}
