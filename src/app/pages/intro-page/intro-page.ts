import { NewsWizardService } from './../../services/wizard-service';
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { CategoryService } from './../../services/categoty.service';

@Component({
    templateUrl: 'intro-page.html',
    styleUrls: ['intro-page.scss'],
    providers: [NewsWizardService, CategoryService]
})
export class IntroPage {

    data: any = [];
    loading = true;
    constructor(
        private modalController: ModalController,
        public navCtrl: NavController,
        private service: NewsWizardService,
        private categoryService: CategoryService) {
        this.categoryService.getCategories().subscribe(items => {
            this.data = items;
            this.loading = false;
        });
    }
    initialLoading() {
        return this.loading;
    }

    closeModal() {
        localStorage.setItem('SHOW_START_WIZARD', 'true');
        this.modalController.dismiss();
        this.navCtrl.navigateForward(['/home']);
    }
}
