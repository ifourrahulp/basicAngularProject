import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FloatLabelType} from '@angular/material/form-field';
export interface DialogData {
    id: number;
}

@Component({
    selector: 'app-add-edit-record',
    templateUrl: './add-edit-record.component.html',
    styleUrls: ['./add-edit-record.component.scss']
})

export class AddEditRecordComponent implements OnInit {
    fileName = '';
    isEditMode: boolean = false;
    constructor( 
        public dialogRef: MatDialogRef<AddEditRecordComponent>,  
        @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) 
        { 
            this.isEditMode = this.dialogData?.id != 0 ? true : false;
        }

    ngOnInit() { }

    onFileSelected(event) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

           // const upload$ = this.http.post("/api/thumbnail-upload", formData);

            //upload$.subscribe();
        }
    }
}