import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly chip1Question = "What languages do you speak ?"
  readonly chip1Options = [
    "English",
    "Chinese",
    "Hindi",
    "Spanish",
    "French",
    "Arabic",
    "Bengali",
    "Russian",
    "Portuguese",
    "Urdu",
    "Indonesian",
    "German",
    "Japanese",
    "Nigerian",
    "Marathi",
    "Telugu",
    "Turkish",
    "Tamil",
    "Vietnamese"
  ].sort(); // ignore this



  readonly chip2Question = "Where have you been?"
  readonly chip2Options = [
    "Russia",
    "Canada",
    "China",
    "United States	",
    "Brazil",
    "Australia",
    "India",
    "Argentina",
    "Kazakhstan",
    "Algeria",
    "DR Congo",
    "Greenland",
    "Saudi Arabia",
    "Mexico",
    "Indonesia",
    "Sudan",
    "Libya",
    "Iran",
    "Mongolia",
    "Peru",
    "Chad"
  ].sort(); // this too


  readonly reactiveForm = new FormGroup({
    birthplace: new FormControl(),
    countries: new FormControl([]), // is there a workaround for not providing a default value (empty array)?   
  });

  name: string = "";
  languages: Array<string> = []; // same as above, now for ngModel   


  onSubmitTemplateForm() {
    console.log("Template driven form data:");
    console.log(this.name);
    console.log(this.languages);
    this.name = "";
    this.languages = [];
  }

  onSubmitReactiveForm() {
    console.log("Reactive form data:");
    console.log(this.reactiveForm.value.birthplace);
    console.log(this.reactiveForm.value.countries);
    this.reactiveForm.reset();
  }

}
