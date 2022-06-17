import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  Injectable,
  Injector,
  INJECTOR,
  Input,
  OnInit,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {
  debounceTime,
  delay,
  filter,
  map,
  ReplaySubject,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-select-search",
  templateUrl: "./select-search.component.html",
  styleUrls: ["./select-search.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSearchComponent),
      multi: true,
    },
  ],
})
export class SelectSearchComponent implements OnInit, ControlValueAccessor {
  @Input() page_size: Number = 20;
  @Input() placeholder: string = "Select";
  @Input() not_found_placeholder: string = "No se encontraron datos";
  @Input() label: string = "Selecciona un elemento";
  @Input() placeholder_searcher: string = "Escribe para empezar a buscar";
  @Input() view_label: boolean = true;
  @Input() endpoint: string = "";
  @Input() search_key: string = "";
  @Input() view_key: string = "";

  private sub = new Subscription();
  colaborador: any;
  public clienteServerSideFilteringCtrl: FormControl = new FormControl();
  public searching = false;
  public filteredServerSideClientes: ReplaySubject<any[]> = new ReplaySubject<
    any[]
  >(1);
  protected _onDestroy = new Subject<void>();
  data: any = {};
  key: any;
  value: any;
  _control: NgControl;
  isDisabled: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    @Inject(Injector) private injector: Injector
  ) {}

  ngOnInit(): void {
    const form: NgControl = this.injector.get(NgControl, null);
    if (form) {
      this._control = form;
    }
    setTimeout(() => {
      this.getFirstTime();
    }, 100);
    this.clienteServerSideFilteringCtrl.valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.searching = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        switchMap((search) => {
          return this.http
            .get<any>(
              `${environment.api}${this.endpoint}?page=${1}&limit=${
                this.page_size
              }&${this.search_key}=${search}`
            )
            .pipe(
              map((data) => {
                return data;
              })
            );
        }),
        delay(10),
        takeUntil(this._onDestroy)
      )
      .subscribe(
        (filteredData: any) => {
          this.searching = false;
          this.filteredServerSideClientes.next(filteredData);
          this.changeDetectorRef.detectChanges();
        },
        (error) => {
          this.searching = false;
        }
      );
  }

  onChange = (val) => {};
  onTouch = () => {};

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  getFirstTime() {
    this.sub.unsubscribe();
    this.sub = this.http
      .get<any>(
        `${environment.api}${this.endpoint}?page=${1}&limit=${this.page_size}${
          this.value ? "&id=" + this.value : ""
        }`
      )
      .subscribe({
        next: (e) => {
          this.filteredServerSideClientes.next(e);
          this.changeDetectorRef.detectChanges();
        },
      });
  }
}
