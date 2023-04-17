import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['./incoming-call.component.scss']
})
export class IncomingCallComponent implements OnInit {

  data: any;

  constructor(
    public dialogRef: MatDialogRef<IncomingCallComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any
  ) {}

  ngOnInit() {
    this.data = this.modalData;
  }

  async answer(answer: boolean) {
    await this.dialogRef.close({ answer });
  }
}
