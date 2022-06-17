import { Component, OnInit } from "@angular/core";
import { actions, headers, pageSize } from "./table.config";
@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  headers = headers;
  pageSize = pageSize;
  actions = actions;
  selected_id: any = "1";
  data: any[] = [];
  total = 2;
  page = 1;
  isLoading = false;

  constructor() {}

  ngOnInit() {
    this.change();
  }

  onActionClick(e) {
    switch (e.action) {
      case "delete":
        alert("delete");
        break;
      case "copy":
        alert("copy");
        break;
      default:
        break;
    }
  }

  change() {
    this.isLoading = true;
    if (this.page == 1) {
      this.data = [
        {
          id: 1,
          name: "Martin Lugo",
          description: "Web developer",
          date: "05/04/1999",
        },
      ];
    } else {
      this.data = [
        {
          id: 2,
          name: "Otro test",
          description: "Test page 2",
          date: "05/04/2000",
        },
      ];
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }
}
