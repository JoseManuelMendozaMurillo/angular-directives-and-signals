import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(errors: ValidationErrors | null | undefined) {
    this._errors = errors;
    this.setErrorMessage();
  }

  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element;
    this.htmlElement.nativeElement.innerHTML = 'Hola';
  }

  public setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  public setErrorMessage(): void {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);
    const errorCode: string = errors[0];
    this.htmlElement.nativeElement.textContent = this.getErrorMessage(errorCode, this._errors[errorCode]);
  }

  private getErrorMessage(errorCode: string, dataError: ValidationErrors): string {
    switch(errorCode){
      case 'required':
        return 'Este elemento es requerido';
      case 'minlength':
        return `Este elemento debe contener al menos ${dataError['requiredLength']} caracteres`;
      case 'email':
        return 'Este elemento debe ser un email';
      default:
        return 'Campo correcto';
    }
  }
}
