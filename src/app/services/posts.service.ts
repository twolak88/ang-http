import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePosts(post: Post) {
    return this.http.post<{ name: string }>(
      'https://ang-http-backend-01-default-rtdb.firebaseio.com/posts.json',
      post //angular automatically convert data to json format
    ).pipe(
      catchError(errorRes => {
        //sent to other server
        return throwError(errorRes);
      })
    );
  }

  fetchPosts () {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{ [key: string]: Post }>(
      'https://ang-http-backend-01-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello'
        }),
        params: searchParams
      }
    )
    .pipe(
      map(responseData => { //observable operator to transorm data
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }), catchError(errorRes => {
        //sent to other server
        return throwError(errorRes);
      })
    );
  }

  deletePosts() {
    return this.http.delete('https://ang-http-backend-01-default-rtdb.firebaseio.com/posts.json');
  }
}
