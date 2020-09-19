import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from "../../user.service"
import {ProduitsService} from "../../services/produits.service"
import {AddProduitsComponent} from "../add-produits/add-produits.component"
import {DetailProduitsComponent} from "../detail-produits/detail-produits.component"
import {Produit,RootObject } from "../../model/produit"

import {HttpClient} from '@angular/common/http';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['number',  'code', 'title', 'price','created', 'getdetails'];
  produitsList : Observable<string>;

  data: Produit[] = [];

  resultsLength = 0;
  pageSize= 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private prodService : ProduitsService,
    private _httpClient: HttpClient,
    public dialog: MatDialog) { }

  ngOnInit(): void {  
    //this.produitsList = this.getProduits();
   // console.log(this.produitsList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ''){
      this.ngAfterViewInit();
    }else {
      this.paginator.pageIndex = 0
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.prodService!.getProduitsSearchPage(
              filterValue.trim().toUpperCase(), this.paginator.pageIndex);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data['totalElements'];
            this.pageSize = data['numberOfElements'];
  
            return data;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe(data => this.data = data['content']);
    }
   
  }
  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.prodService!.getProduitsPage(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data['totalElements'];
          this.pageSize = data['numberOfElements'];

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data['content']);
  }


  getProduits() {
    return this.prodService.getProduitPage("1","10");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProduitsComponent, {
      width: '250px',
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }


  getRecord(row) : void
  {
    const dialogRef = this.dialog.open(DetailProduitsComponent, {
      width: '250px',
      data: {"price": row.price, "code": row.code, "name": row.name, "datexpiratedDatee": row.expiratedDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}


