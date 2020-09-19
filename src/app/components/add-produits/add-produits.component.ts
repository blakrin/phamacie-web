import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProduitsComponent} from '../produits/produits.component'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {ProduitsService} from '../../services/produits.service';
@Component({
  selector: 'app-add-produits',
  templateUrl: './add-produits.component.html',
  styleUrls: ['./add-produits.component.css']
})
export class AddProduitsComponent implements OnInit {
  form: FormGroup;
  minDate =new Date(Date.now() + 24*60*60*1000);
  constructor(public dialogRef: MatDialogRef<ProduitsComponent>,
    private formBuilder: FormBuilder,
    private prodService : ProduitsService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ],
      code: ['', Validators.required ],
      date: ['', Validators.required ]
    });
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data) {
    if(this.form.valid){

      var formData = {
        "name": this.form.get("name").value,
        "code":this.form.get("code").value,
        "price":this.form.get("price").value,
        "expiratedDate":this.form.get("date").value
      }; 
      this.prodService.createProduit(formData).subscribe((response) => {
        if(response['status'] == 500 ){
          alert("Verifier le code et le nom doivent etre unique");
        }else if(response['status'] == 201){
          alert("Le produit a ete bien enregistre")
        }
        alert(response)
        this.dialogRef.close();
      }); 
      
    }else {
      this.validateAllFormFields(this.form);
    }
   
  }

  /**
   * 
   * @param formGroup 
   */
  validateAllFormFields(formGroup: FormGroup) {        
  Object.keys(formGroup.controls).forEach(field => {  
    const control = formGroup.get(field);             
    if (control instanceof FormControl) {             
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        
      this.validateAllFormFields(control);      
    }
  });
}
}
