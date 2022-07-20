import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as moment from 'moment';
moment.locale('es')
@Component({
  selector: "app-record-viewer",
  templateUrl: "./record-viewer.component.html",
  styleUrls: ["./record-viewer.component.scss"],
})
export class RecordViewerComponent implements OnInit {
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() actions: any[] = [];
  @Input() actionsTitle: string = "ACCIONES";
  @Input() isLoading: boolean;
  @Output() onActionClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  validate(head, item) {
    var content = "";
    Object.keys(item).forEach((key) => {
      if (head.key == key) {
        content = head.type == "date" ? moment(item[key]).format('DD-MM-YYYY')  : item[key];
      }
    });

    return content;
  }
}
