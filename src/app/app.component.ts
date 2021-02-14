import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(
      'https://ang-http-backend-01-default-rtdb.firebaseio.com/posts.json',
      postData //angular automatically convert data to json format
    ).subscribe(responseData => { // subscription needed, managed by angular
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get('https://ang-http-backend-01-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(responseData => { //observable operator to transorm data
      const postsArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key });
        }
      }
      return postsArray;
    }))
    .subscribe(posts => {
      console.log(posts);
    });
  }
}
