import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(
    private http: HttpClient,
    private title: Title,
    private meta: Meta
  ) {}

  // getLoggedUser(token: any) {
  //   return this.http.get(`${env.apiRoot}users/get-user`, {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  updateUserData(data: any, token: any) {
    return this.http.patch(`${env.apiRoot}users/update`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  uploadImage(fd: any, token: any) {
    return this.http.patch(`${env.apiRoot}users/update`, fd, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  changePassword(body: any, token: any) {
    return this.http.put(`${env.apiRoot}users/change-password`, body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getAllProducts() {
    return this.http.get(`${env.apiRoot}products/get-all?page=1&limit=100`);
  }

  getProductById(productId: any) {
    return this.http.get(`${env.apiRoot}products/id/` + productId);
  }

  getAllCategories() {
    return this.http.get(`${env.apiRoot}/products/get-all-categories`);
  }

  addOrder(data: any, token: any) {
    return this.http.post(`${env.apiRoot}order/add`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getAllOrders(token: any, paginationObj: any) {
    return this.http.get(`${env.apiRoot}users/order/buyer`, {
      params: paginationObj,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getOrederById(id: any, token: any) {
    return this.http.get(`${env.apiRoot}users/order/buyer/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getUserBalance(token: any) {
    return this.http.get(`${env.apiRoot}users/balance`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getUserTransactions(token: any, obj: any) {
    return this.http.get(
      `${env.apiRoot}users/withdrawal/buyer?page=${obj.page}&limit=${obj.limit}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getUserLastTransactions(token: any) {
    return this.http.get(`${env.apiRoot}users/withdrawal/buyer/latest`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  addWithdrawlRequest(body: any, token: any) {
    return this.http.post(`${env.apiRoot}user/withdraw`, body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  sendAMessageForUs(form: any) {
    return this.http.post(`${env.apiRoot}contact-us/add`, form);
  }

  setTitleAndMeta(title: any, url: any) {
    this.title.setTitle(`ايزي موني | ${title}`);
    this.meta.addTags([
      { name: 'developed by', content: 'فريق ايزي موني التقني' },
      { name: 'author', content: 'فريق ايزي موني التقني' },
      {
        name: 'description',
        content: ``,
      },
      {
        name: 'keywords',
        content: ``,
      },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: 'شركة ايزي موني' },
      { name: 'twitter:title', content: `ايزي موني | ${title}` },
      {
        name: 'twitter:description',
        content: ``,
      },
      { name: 'twitter:image', content: '../../../assets/imgs/logo.png' },

      // Facebook Card
      { name: 'og:url', content: `${url}` },
      { name: 'og:type', content: 'Service' },
      { name: 'og:title', content: `ايزي موني | ${title}` },
      {
        name: 'og:description',
        content: ``,
      },
      { name: 'og:image', content: '../../../assets/imgs/logo.png' },
    ]);
  }
}
