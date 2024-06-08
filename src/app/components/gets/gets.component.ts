import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-gets',
  templateUrl: './gets.component.html',
  styleUrls: ['./gets.component.scss']
})
export class GetsComponent implements OnInit {

  @Input() post1: any;
  @Output() onDeletePost: EventEmitter<any> = new EventEmitter();

  constructor(private postService: BlockchainService) { }

  ngOnInit(): void {
  }

 onDelete(){
  this.onDeletePost.emit(this.post1);
 }

}
