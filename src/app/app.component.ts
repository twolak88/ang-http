import { Component } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.error = null;
    this.postsService.createAndStorePosts(postData).subscribe(responseData => { // subscription needed, managed by angular
      this.fetchPosts();
      // alert("Posts successfully added!");
    }, error => {
      this.error = error.message
      console.log(error);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(responseData => {
      this.fetchPosts();
      // alert("All posts deleted!");
    });
  }

  private fetchPosts() {
    this.error = null;
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message
      console.log(error);
    });
  }
}
