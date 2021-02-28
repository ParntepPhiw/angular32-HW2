import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  xRates: any[];
  form: FormGroup;
  money1: number;
  money2: number;
  cur1: string;
  cur2: string;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { 
    this.form = this.fb.group({
      currency1: '',
      currency2: '',
      amount1: '',
      amount2: ''
    });
  }

  ngOnInit(): void {
    this.httpClient.get('https://api.exchangeratesapi.io/latest?base=USD').subscribe(result => {
    this.xRates = result['rates'] as any[];
    // console.log(this.xRates)
    });
  }

  calculateRate() {
    this.cur1 = this.form.value['currency1'].toUpperCase();
    this.cur2 = this.form.value['currency2'].toUpperCase();
    this.money1 = this.form.value['amount1'];
    this.money2 = +((this.xRates[this.cur2] / this.xRates[this.cur1]) * this.money1).toFixed(2);
    alert(this.money2);
  }

}
