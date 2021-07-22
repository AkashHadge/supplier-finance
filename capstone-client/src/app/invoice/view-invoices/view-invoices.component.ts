import {Component, OnInit} from '@angular/core';
import {Dayjs} from 'dayjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {InvoiceFiltersOptional, ViewInvoicesService} from './view-invoices.service';
import {Sort} from '@angular/material/sort';
import {SnackbarService} from '../../util/snakbar.service';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.scss'],
})
export class ViewInvoicesComponent implements OnInit {
  displayedColumns: string[] = [
    'invoiceId',
    'invoiceNumber',
    'uploadedDate',
    'invoiceDate',
    'invoiceAge',
    'supplierId',
    'amount',
    'invoiceStatus',
    'options',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public viewInvoicesService: ViewInvoicesService,
    private snackBarService: SnackbarService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // assign parameters to state
      const pageSize = params['pageSize'] ? params['pageSize'] : 10;
      const pageIndex = params['pageNumber'] ? params['pageNumber'] - 1 : 0;
      const invoiceNumber = params['invoiceNumber'];
      const supplierCode = params['supplierCode'];
      const dateFrom = params['dateFrom']
        ? new Dayjs(params['dateFrom']).startOf('date').toDate()
        : undefined;
      const dateTo = params['dateTo']
        ? new Dayjs(params['dateTo']).startOf('date').toDate()
        : undefined;
      const ageing = params['ageing'];
      const status = params['status'];
      const sortBy = params['sortBy'] || 'uploadedDate';
      const sortDirection = params['sortDirection'] || 'DESC';

      this.viewInvoicesService.$filters.next({
        pageSize,
        pageIndex,
        invoiceNumber,
        supplierCode,
        dateFrom,
        dateTo,
        ageing,
        status,
        sortBy,
        sortDirection,
      });
    });
  }

  filterInputChange = (e: any) => {
    const inputName = e.target?.name;
    const value = e.target?.value;

    this._changeQuery({
      [inputName]: !!value ? value : undefined,
    });
  };

  handlePageChange = (e: PageEvent) => {
    this._changeQuery({
      pageSize: e.pageSize,
      pageIndex: e.pageIndex,
    });
  };

  _changeQuery = (filers: InvoiceFiltersOptional) => {
    const queryParams: any = {
      ...this.viewInvoicesService.$filters.value,
      ...filers,
    };

    // adjust page number
    queryParams.pageNumber = queryParams.pageIndex + 1;
    delete queryParams.pageIndex;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    }).then();
  };

  handleSortChange(e: Sort): void {
    this._changeQuery({
      sortBy: e.active,
      sortDirection: e.direction.toUpperCase(),
      pageIndex: 0,
    });
  }

  onClickDelete(invoiceId: number): void {
    console.log(invoiceId);
    this.viewInvoicesService.deleteInvoice(invoiceId).then(() => this.snackBarService.snackBar?.open(
      'Invoice Delete Successfully',
      undefined,
      {
        duration: 2000,
      }
    )).catch((err) => console.error(err));
  }
}
