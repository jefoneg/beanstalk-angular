import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SessionKeyConstant } from "../../../constants/session-key.constant";
import { SeparatorEnum } from "../../../enums/separator.enum";
import { DateHelper } from "../../../helpers/date.helper";
import { CafeReviews } from "../../../modes/cafe-information.model";
import { IGeneric } from "../../interface/IGeneric.interface";
import { ApiService } from "../../service/api-service";
import { CafeReviewService } from "../../service/cafe-review.service";
import { StorageService } from "../../service/storage/storage.service";
import { RoutesEnum } from "../../../enums/routes.enum";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CafeReviewConstants } from "../../../constants/cafe-review.constant";
import { CommonConstant } from "../../../constants/common.constant";

@Component({
  selector: "app-cafe-review-component",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./cafe-review-component.html",
  styleUrl: "./cafe-review-component.less",
})
export class CafeReviewComponent {
  private routeParamSubscription: Subscription;
  private currentParam: string;
  protected isLoggedIn: boolean;
  protected postCommentFormGroup: FormGroup;
  protected CafeReviewConstants = CafeReviewConstants;

  /**
   * Constructs a new instance of the CafeReviewComponent.
   *
   * @param {ApiService}         apiService         A service for making HTTP requests.
   * @param {CafeReviewService}  cafeReviewService  A service for managing cafe reviews.
   * @param {ActivatedRoute}     route              The activated route for retrieving query parameters.
   * @param {StorageService}     storageService     The storage service for managing user session data.
   * @param {Router}             router             The router for navigating between routes.
   * @param {FormBuilder}        formBuilder        The form builder for creating reactive forms.
   */
  constructor(
    private readonly apiService: ApiService,
    protected readonly cafeReviewService: CafeReviewService,
    private readonly route: ActivatedRoute,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) {}

  /**
   * Initializes the component on initialization.
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.isLoggedIn = Boolean(this.storageService.getItem(SessionKeyConstant.EMAIL));
    this.initializeReviewFormGroup();
    this.getQueryParam();
    this.loadCafeReviews()
      .then(() => {
        this.loadCafeReviewComments();
      })
      .catch(() => {
        this.router.navigate([RoutesEnum.PageNotFound]);
      });
  }

  /**
   * Unsubscribes from the route parameter subscription on component destruction.
   *
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this.routeParamSubscription.unsubscribe();
  }

  /**
   * Initializes the review form group.
   *
   * @returns {void}
   */
  private initializeReviewFormGroup(): void {
    this.postCommentFormGroup = this.formBuilder.group({
      comment: [SeparatorEnum.EmptyString, Validators.minLength(CommonConstant.COMMENT_MIN_LENGTH)],
    });
  }

  /**
   * Handles the form submission.
   *
   * @returns {void}
   */
  protected onSubmit(): void {
    console.log(this.postCommentFormGroup);
  }

  /**
   * Retrieves the query parameter for the cafe.
   *
   * @returns {void}
   */
  private getQueryParam(): void {
    this.routeParamSubscription = this.route.queryParamMap.subscribe((param: IGeneric) => {
      this.currentParam = param["params"]["cafe"];
    });
  }

  /**
   * Loads the cafe reviews.
   *
   * @returns {Promise<void>}
   */
  private async loadCafeReviews(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.setLoaderVisibility(true);

      const payload = {
        param: this.currentParam,
      };

      this.apiService.postCafeReviews(payload).subscribe({
        next: (data: CafeReviews) => {
          this.cafeReviewService.setCafeReviews(data);
          this.apiService.setLoaderVisibility(false);
          resolve();
        },
        error: (error) => {
          this.apiService.setLoaderVisibility(false);
          console.error(error);
          reject(error);
        },
      });
    });
  }

  /**
   * Loads the cafe review comments.
   *
   * @param   {number}          [pageNumber]  The page number of the comments to load.
   * @returns {Promise<void>}
   */
  private async loadCafeReviewComments(pageNumber?: number): Promise<void> {
    this.apiService.setLoaderVisibility(true);

    const payload = {
      cafeId: this.currentParam,
      email: this.storageService.getItem(SessionKeyConstant.EMAIL) || SeparatorEnum.EmptyString,
      pageNumber: pageNumber ? pageNumber : CommonConstant.NUMERIC.ZERO,
    };

    this.apiService.postCafeReviewComments(payload).subscribe({
      next: (data) => {
        this.cafeReviewService.setCafeReviewComments(data);
        this.apiService.setLoaderVisibility(false);
      },
      error: (error) => {
        console.error(error);
        this.apiService.setLoaderVisibility(false);
      },
    });
  }

  /**
   * Converts a UTC date string to a human-readable format.
   *
   * @param   {string}    utcDate  The UTC date string to convert.
   * @returns {string}             The human-readable date string.
   */
  protected convertDateToString(utcDate: string): string {
    const getDaysGap = DateHelper.getDaysFromCurrentDate(utcDate);

    if (CommonConstant.DATE_GAP.ONE_HOUR > getDaysGap) {
      return `${Math.round(DateHelper.getHoursFromCurrentDate(utcDate))} hour(s) ago.`;
    } else if (CommonConstant.DATE_GAP.THIRTY_DAYS < getDaysGap) {
      return CafeReviewConstants.MORE_THAN_A_MONTH_AGO;
    }

    return `${Math.round(getDaysGap)} days ago.`;
  }

  /**
   * Handles the route action when the user is not logged in.
   *
   * @returns {void}
   */
  protected onRouteAction(): void {
    this.router.navigate([RoutesEnum.Login]);
  }
}
