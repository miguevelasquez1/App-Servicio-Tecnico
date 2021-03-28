import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  servicesForm: FormGroup;
  servicesList: AngularFireList<any>;
  private items;
  public itemsCopy;
  private itemTemplate;
  public spinnerActive: boolean;
  /**
   * desahabilitar botón de save
   */
  public saveDisabled: boolean;
  public cardDefault: boolean;
  public cardReorder: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private aFDB: AngularFireDatabase
  ) {
    this.buildForm();
    this.itemsCopy = this.items;
    this.spinnerActive = false;
    this.itemsCopy = [];
    this.itemTemplate = {
      serviciosArray: [{
        subTitle: 'subTitle',
        title: 'Title',
        description: 'description'
      }]
    };
    this.cardDefault = true;
    this.cardReorder = false;
  }

  private buildForm() {
    this.servicesForm = this.formBuilder.group ({
      $key: [null, []],
      serviciosArray: this.formBuilder.array([])
    });
  }

  get serviciosArray(): FormArray {
    return this.servicesForm.get('serviciosArray') as FormArray;
  }

  newServicio() {
    return this.formBuilder.group({
      subTitle: new FormControl('hola'),
      title: new FormControl('hola'),
      description: new FormControl('hola')
    });
  }

  addServicio() {
    this.serviciosArray.push(this.newServicio());
  }

  removeServicio(i: number) {
    this.serviciosArray.removeAt(i);
  }

  public isSpinnerActive() {
    if (this.itemsCopy !== this.items) {
      this.saveDisabled = false;
    }
  }

  public insertServicioCopy() {
    this.itemsCopy.push(this.itemTemplate);
    this.addServicio();
    this.onSubmit();
  }

  getServices() {
    this.servicesList = this.aFDB.list('servicios');
    return this.servicesList.snapshotChanges();
  }

  insertServicio(servicio: any) {
    this.servicesList.push({
      serviciosArray: servicio.serviciosArray
    });
  }

  updateServicio(servicio: any) {
    this.servicesList.update(servicio.$key, {
      serviciosArray: servicio.serviciosArray
    });
  }

  deleteServicio($key: string) {
    this.servicesList.remove($key);
  }

  onSubmit() {
    if (this.servicesForm.get('$key').value === null) {
      this.insertServicio(this.servicesForm.value);
    } else {
      this.updateServicio(this.servicesForm.value);
    }
  }
}
