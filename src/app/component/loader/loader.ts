import { Component } from "@angular/core";
import { ApiService } from "../../service/api-service";

@Component({
  selector: "app-loader",
  imports: [],
  templateUrl: "./loader.html",
  styleUrl: "./loader.less",
})
export class Loader {
  constructor(protected readonly apiService: ApiService) {}
}
