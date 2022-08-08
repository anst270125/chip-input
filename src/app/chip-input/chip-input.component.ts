import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipInputComponent),
      multi: true
    }]
})
export class ChipInputComponent implements ControlValueAccessor {

  @Input() question: string = "";
  @Input() options: Array<string> = [];


  inputFieldText: string = "";
  disabled: boolean = false;
  selectedOptions: Array<string> = [];
  selectedOptionIndex: number = 0;
  validOptions: Array<string> = [];


  private onChange?: (selectedOptions: Array<string>) => {}
  private onTouch?: () => {}

  get value() {
    return this.selectedOptions;
  }

  set value(selectedOptions: Array<string>) {
    this.selectedOptions = selectedOptions;
    if (this.onChange) {
      this.onChange(selectedOptions);
    }
    if (this.onTouch) {
      this.onTouch();
    }
  }


  //ControlValueAccessor implementation
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  writeValue(value: Array<string>): void {
    this.selectedOptions = value;
  }



  onAddOption(option: string) {
    this.selectedOptions.push(option);
    this.validOptions = [];
    this.inputFieldText = "";
    if (this.onChange) {
      this.onChange(this.selectedOptions);
    }

  }

  onInputChange(event: KeyboardEvent) {
    const pressedKey = event.key;

    if (pressedKey.startsWith("Arrow")) {
      if (pressedKey == "ArrowUp" && this.selectedOptionIndex - 1 >= 0) {
        --this.selectedOptionIndex;
      }
      else if (pressedKey == "ArrowDown" && this.selectedOptionIndex + 1 < this.validOptions.length) {
        ++this.selectedOptionIndex;
      }
      return;
    }

    if (pressedKey == "Enter") {
      this.onAddOption(this.validOptions[this.selectedOptionIndex]);
      (event.target as HTMLInputElement).blur();
      return;
    }

    this.validOptions = this.options.filter(option => !this.selectedOptions.includes(option) && option.toLowerCase().startsWith(this.inputFieldText.toLowerCase().trim()));
    this.selectedOptionIndex = 0;
  }


  onInputFocusChanged(focused: boolean) {
    if (focused) {
      this.validOptions = this.options.filter(option => (!this.selectedOptions || !this.selectedOptions.includes(option)) && option.toLowerCase().startsWith(this.inputFieldText.toLowerCase().trim()));
    }
    else if (!focused) {
      if (this.onTouch) {
        this.onTouch();
      }
      this.validOptions = [];
    }
  }


  onOptionHovered(index: number) {
    this.selectedOptionIndex = index;
  }


  onRemoveOption(index: number) {
    this.selectedOptions.splice(index, 1);
    if (this.onChange) {
      this.onChange(this.selectedOptions);
    }
  }

}
