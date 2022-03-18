import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AwsLambdaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public callCoinbaseOauth() {
    
  }
}
