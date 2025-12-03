import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitiveTiers } from './competitive-tiers';

describe('CompetitiveTiers', () => {
  let component: CompetitiveTiers;
  let fixture: ComponentFixture<CompetitiveTiers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitiveTiers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitiveTiers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
