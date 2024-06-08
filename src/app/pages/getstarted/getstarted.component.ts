import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

//import { Posts } from '../../../workings';

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.scss']
})
export class GetstartedComponent implements OnInit {

  posts: any;

  constructor(private postService: BlockchainService) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe((retreiveData) => this.posts = retreiveData);
  }
  deletePost(post: any){
    this.postService.deletePost(post.id).subscribe(() => this.posts = this.posts.filter(
      (p: any) => p.id != post.id
    ));
  }

}
