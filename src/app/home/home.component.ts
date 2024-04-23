import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {TenantListingService} from "../tenant/tenant-listing.service";
import {ToastService} from "../layout/toast.service";
import {CategoryService} from "../layout/navbar/category/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardListing} from "../landlord/model/listing.model";
import {Pagination} from "../core/model/request.model";
import {filter, Subscription} from "rxjs";
import {Category} from "../layout/navbar/category/category.model";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CardListingComponent} from "../shared/card-listing/card-listing.component";
import {Search} from "../tenant/search/search.model";
import dayjs from "dayjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FaIconComponent,
    CardListingComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  tenantListingService = inject(TenantListingService);
  toastService = inject(ToastService);
  categoryService = inject(CategoryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  listings: Array<CardListing> | undefined;

  pageRequest: Pagination = {size: 20, page: 0, sort: []};

  loading = false;

  categoryServiceSubscription: Subscription | undefined;
  searchIsLoading = false;
  emptySearch = false;
  private searchSubscription: Subscription | undefined;

  constructor() {
    this.listenToGetAllCategory();
    this.listenToSearch();
  }

  ngOnDestroy(): void {
    this.tenantListingService.resetGetAllCategory();

    if (this.categoryServiceSubscription) {
      this.categoryServiceSubscription.unsubscribe();
    }

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.startNewSearch();
    this.listenToChangeCategory();
  }

  private listenToChangeCategory() {
    this.categoryServiceSubscription = this.categoryService.changeCategoryObs.subscribe({
      next: (category: Category) => {
        this.loading = true;
        if (!this.searchIsLoading) {
          this.tenantListingService.getAllByCategory(this.pageRequest, category.technicalName);
        }
      }
    })
  }

  private listenToGetAllCategory() {
    effect(() => {
      const categoryListingsState = this.tenantListingService.getAllByCategorySig();
      if (categoryListingsState.status === "OK") {
        this.listings = categoryListingsState.value?.content;
        this.loading = false;
        this.emptySearch = false;
      } else if (categoryListingsState.status === "ERROR") {
        this.toastService.send({
          severity: "error", detail: "Error when fetching the listing", summary: "Error",
        });
        this.loading = false;
        this.emptySearch = false;
      }
    });
  }

  private listenToSearch() {
    this.searchSubscription = this.tenantListingService.search.subscribe({
      next: searchState => {
        if (searchState.status === "OK") {
          this.loading = false;
          this.searchIsLoading = false;
          this.listings = searchState.value?.content;
          this.emptySearch = this.listings?.length === 0;
        } else if (searchState.status === "ERROR") {
          this.loading = false;
          this.searchIsLoading = false;
          this.toastService.send({
            severity: "error", summary: "Error when search listing",
          })
        }
      }
    })
  }

  private startNewSearch(): void {
    this.activatedRoute.queryParams.pipe(
      filter(params => params['location']),
    ).subscribe({
      next: params => {
        this.searchIsLoading = true;
        this.loading = true;
        const newSearch: Search = {
          dates: {
            startDate: dayjs(params["startDate"]).toDate(),
            endDate: dayjs(params["endDate"]).toDate(),
          },
          infos: {
            guests: {value: params['guests']},
            bedrooms: {value: params['bedrooms']},
            beds: {value: params['beds']},
            baths: {value: params['baths']},
          },
          location: params['location'],
        };

        this.tenantListingService.searchListing(newSearch, this.pageRequest);
      }
    })
  }

  onResetSearchFilter() {
    this.router.navigate(["/"], {
      queryParams: {"category": this.categoryService.getCategoryByDefault().technicalName}
    });
    this.loading = true;
    this.emptySearch = false;
  }
}
