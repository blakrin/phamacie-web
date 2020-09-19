import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProduitsComponent} from '../produits/produits.component'
import { Produit } from 'src/app/model/produit';
@Component({
  selector: 'app-detail-produits',
  templateUrl: './detail-produits.component.html',
  styleUrls: ['./detail-produits.component.css']
})
export class DetailProduitsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProduitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produit) { }

  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
