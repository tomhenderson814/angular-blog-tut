import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  title?: string;
  content?: string;

  constructor(private postService: BlockchainService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){ 
    const new_post = {
      title: this.title,
      content: this.content
    }

    this.postService.addPost(new_post).subscribe(() => this.router.navigate(['']));
  }

}
