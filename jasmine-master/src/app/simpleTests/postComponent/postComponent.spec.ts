import { postComponent } from './postComponent';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Unit Tests : Post Component ', () => {
  let component: postComponent;
  //only once
  //before -> setup
  //after -> teardown
  beforeAll(() => {});

  afterAll(() => {
    component = null;
  });

  //every time for a spec
  beforeEach(() => {
    //Arrange
    component = new postComponent();
    component.post = { totalLikes: 3 };
  });

  afterEach(() => {});

  it('Should increase likes 👍', () => {
    //Act
    component.like();
    //Assert
    expect(component.post.totalLikes).toBe(4);
  });

  it('should decrease likes 👎', () => {
    component.dislike();
    expect(component.post.totalLikes).toBe(2);
  });

  it('should decrease likes only if the post.totalLikes is not 0', () => {
    component.post = { totalLikes: 0 };
    component.dislike();
    expect(component.post.totalLikes).not.toBe(-1);
  });
});

describe('Integration Tests : Post Component', () => {
  let component: postComponent;
  let fixture: ComponentFixture<postComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [postComponent]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(postComponent);
    component = fixture.componentInstance;
    component.post = { totalLikes: 4 };
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('Should Create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Display Global total Likes', async () => {
    let debugElement = fixture.debugElement.query(By.css('.totalLikes'));
    let htmlElement: HTMLElement = debugElement.nativeElement;
    expect(htmlElement.innerText).toContain('4');
  });
});
