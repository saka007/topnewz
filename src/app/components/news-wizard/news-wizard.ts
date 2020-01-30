import { Component, Output, EventEmitter, Input, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'news-wizard',
  templateUrl: 'news-wizard.html',
  styleUrls: ['news-wizard.scss'],
})
export class NewsWizardPage implements OnChanges {
  @Input() data: any;
  @Output() onFinish = new EventEmitter();
  @Output() onNext = new EventEmitter();
  @Output() onPrevious = new EventEmitter();

  @ViewChild('wizardSlider') slider: { slideNext: (arg0: number) => void; slidePrev: (arg0: number) => void; };

  sliderOptions = { pager: true };

  prev = false;
  next = true;
  ignoreDidChange = false;
  checkUserArray = [];
  finalArray = [];
  loading = true;
  constructor() { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  checkUser(index: number) {
    const checked = this.data[index].isChecked;
    if (checked === true) {
      if (this.checkUserArray.indexOf(this.data[index]) === -1) {
        this.checkUserArray.push(this.data[index].id);
      }
    } else {
      const dle = this.checkUserArray.splice(index, 1);
    }
    this.finalArray = this.checkUserArray;

  }

  initialLoading() {
    return this.loading;
  }

  onFinishFunc() {
    if (event) {
      event.stopPropagation();
    }
    this.onFinish.emit();
    localStorage.setItem("CatSelected", JSON.stringify(this.finalArray));
  }

  onNextFunc() {
    if (event) {
      event.stopPropagation();
    }
    this.onNext.emit();
    this.slider.slideNext(300);
  }

  onPreviousFunc() {
    this.onPrevious.emit();
    this.slider.slidePrev(300);
  }

  ionSlideReachStart() {
    this.prev = false;
    this.next = true;
    this.ignoreDidChange = true;
  }

  ionSlideReachEnd() {
    this.prev = true;
    this.next = false;
    this.ignoreDidChange = true;
  }

  ionSlideDidChange() {
    if (this.ignoreDidChange) {
      this.ignoreDidChange = false;
    } else {
      this.prev = true;
      this.next = true;
    }
  }
}
