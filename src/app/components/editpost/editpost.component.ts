import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {

  post: any;
  id?: number;
  title?: string;
  content?: string;

  constructor(private postService: BlockchainService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((parameters) => this.postService.getPosts(parameters.id).subscribe((retrievedPost) => 
    {
      this.id = retrievedPost.id,
      this.title = retrievedPost.title,
      this.content = retrievedPost.content
    }));
  }
  onSubmit(){
    const updatedPost = {
      id: this.id,
      title: this.title,
      content: this.content
    }
    this.postService.editPost(updatedPost).subscribe(() => this.router.navigate(['']));
  }


}
