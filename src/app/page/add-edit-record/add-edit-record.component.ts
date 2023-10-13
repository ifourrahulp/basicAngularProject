import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FloatLabelType} from '@angular/material/form-field';
import { CommonService } from 'src/app/common/_service/common.service';
export interface DialogData {
    id: number;
}

export interface RecordElement {
    firstName?: string;
    lastName?: string;
    id?: number;
    startDate?: string;
    endDate?: string;
    uploadImage?: string;
  }

@Component({
    selector: 'app-add-edit-record',
    templateUrl: './add-edit-record.component.html',
    styleUrls: ['./add-edit-record.component.scss']
})

export class AddEditRecordComponent implements OnInit {
    fileName = '';
    isEditMode: boolean = false;
    addRecordForm: FormGroup;
    minStartDate: Date;
    maxStartDate: Date;
    record: RecordElement;
    minEndDate: Date;
    constructor( 
        public dialogRef: MatDialogRef<AddEditRecordComponent>,  
        @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
        private formBulider : FormBuilder,
        private commonService: CommonService
        ) {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            const currentDay = new Date().getDate();
            this.minStartDate = new Date(currentYear, currentMonth, currentDay);
            this.isEditMode = this.dialogData?.id != 0 ? true : false;
        }

    ngOnInit() { 
        this.initializeForm();
        if(this.dialogData?.id != 0) {
            let records  = this.commonService.getlocalStroage();
            if(records != null && records != undefined) {
               let recordObject = records.filter(x => x?.id.toString() == this.dialogData?.id?.toString());
               this.record = recordObject?.length > 0 ? recordObject[0] : {};
               
                this.setRecordModel(this.record);
            }
        }   
    }
    onFileSelected(event) {

        var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();
        this.fileName = file?.name;
        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
        console.log(reader.result);
    }

    _handleReaderLoaded(e) {
        console.log("_handleReaderLoaded")
       var reader = e.target;
       let imageSrc = reader.result;
       this.addRecordForm.get('uploadImage').setValue(imageSrc);
       console.log(imageSrc, 'imagesrc');
   }
    setRecordModel(record) {
        this.addRecordForm.patchValue({
            firstName: record?.firstName,
            lastName: record?.lastName,
            startDate: record?.startDate,
            endDate: record?.endDate
        });
    }


    oncancel(): void {
        this.dialogRef.close();
    }

    initializeForm() {
        this.addRecordForm = this.formBulider.group({
            firstName: ['', Validators.compose([Validators.required])],
            lastName:  ['', Validators.compose([Validators.required])],
            startDate:  ['', Validators.compose([Validators.required])],
            endDate:  ['', Validators.compose([Validators.required])],
            uploadImage: [],
        })
    }

    onSubmit() {
        if(this.addRecordForm.valid) {
            const formData = this.addRecordForm?.value;
            let records = this.commonService.getlocalStroage();
            debugger
            if(this.isEditMode) {
               
                if(records != null && records != undefined) {
                    let recordIndex =  records.findIndex(x => x?.id?.toString() == this.dialogData?.id?.toString());
                    if(recordIndex != -1) {
                        records[recordIndex].firstName = formData['firstName'];
                        records[recordIndex].lastName = formData['lastName'];
                        records[recordIndex].startDate = formData['startDate'];
                        records[recordIndex].endDate = formData['startDate'];
                    }
                    this.commonService.setlocalStroage(records);
                    this.commonService.successMessage("Record Updated Sccessfully.");
                    this.oncancel();
                }
            }
            else {
               
                if(records != null && records != undefined) {
                    let id = this.generateString(12);
                    formData['id'] = id;
                    let array = [];
                    array.push(formData);
                    this.commonService.setlocalStroage(array);
                }
                else {
                    formData['id'] = this.generateString(12);
                    let array = [];
                    array.push(formData);
                    this.commonService.setlocalStroage(array); 
                }  

                this.commonService.successMessage("Record Insert Sccessfully.");
                this.oncancel();
            }
        }
    }


    startDateChange(event) {
        const formData = this.addRecordForm?.value;
        const currentYear = formData['startDate'].getFullYear();
        const currentMonth = formData['startDate'].getMonth();
        const currentDay = formData['startDate'].getDate();
        this.minEndDate = new Date(currentYear, currentMonth, currentDay);
    }

    

    generateString(length) {
        let result = '';
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}