import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ICar } from './car.model';

import { CarService } from './carservice';


@Component({
  selector: 'app-cars',
  templateUrl: './car.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .car-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
  
})
export class CarComponent { 
 
    cars: ICar[];

    carDialog!: boolean; 

    car: ICar;

    selectedcars: ICar[];

    submitted: boolean;
 //cars = Observable<Array<any>>;

    constructor(private carService: CarService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.carService.findAll().subscribe((res: HttpResponse<ICar[]>) => {this.onSuccess(res.body)});
    }
    protected onSuccess(body: ICar[]) {
        this.cars = body ?? [];
    }

    openNew() {
        this.car = {};
        this.submitted = false;
        this.carDialog = true;
    }

    deleteSelectedcars() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected cars?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.cars = this.cars.filter(val => !this.selectedcars.includes(val));
                this.selectedcars = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'cars Deleted', life: 3000});
            }
        });
    }

    editcar(car: ICar) {
        this.car = {...car};
        this.carService.update(car).subscribe(() => {});
        this.carDialog = true;
    }

    deletecar(car: ICar) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + car.brand + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log("id carro a eliminar " ,car.id);
                this.carService.delete(car.id).subscribe(() => {});
                this.cars = this.cars.filter(val => val.id !== car.id);
                this.car = {};
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'car Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.carDialog = false;
        this.submitted = false;
    }
    
    savecar() {
        this.submitted = true;

        if (this.car.brand.trim()) {
            if (this.car.id) {
                this.cars[this.findIndexById(this.car.id)] = this.car;                
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'car Updated', life: 3000});
            }
            else {
                this.car.id = this.createId();
          
                this.cars.push(this.car);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'car Created', life: 3000});
            }

            this.cars = [...this.cars];
            this.carDialog = false;
            this.car = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
 
}
