import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CafeReviewComponent } from "./cafe-review-component";

describe("CafeReviewComponent", () => {
  let component: CafeReviewComponent;
  let fixture: ComponentFixture<CafeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CafeReviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
