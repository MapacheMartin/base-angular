import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class selectSearchService {
  constructor(private http: HttpClient) {}

  getSearch(endpoint, pageSize, search?, id?, search_key?): Observable<any> {
    return this.http.get<any>(
      `${environment.api}${endpoint}?page=${1}&pageSize=${pageSize}${
        id ? "&selected_id=" + id : ""
      }${search && search_key ? "&" + search_key + "=" + search : ""}`
    );
  }
}
