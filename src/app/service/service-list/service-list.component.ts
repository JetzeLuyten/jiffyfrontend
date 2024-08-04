import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Service} from '../../model/service';
import {ServicesService} from '../../services/service.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  services: Service[] = [];
  services$: Subscription = new Subscription();
  deleteService$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private servicesService: ServicesService, private router: Router) {
  }

  ngOnInit(): void {
    this.getServices();
  }

  ngOnDestroy(): void {
    this.services$.unsubscribe();
    this.deleteService$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['newservice']);
  }

  edit(id: number) {
    //TODO
    this.router.navigate(['editservice/' + id]);
  }

  delete(id: number) {
    this.deleteService$ = this.servicesService.deleteService(id).subscribe(result => {
      //all went well
      this.getServices();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getServices() {
    this.services$ = this.servicesService.getServicesFromUser().subscribe(result => this.services = result);
  }

  /* isUnpublished(article: Service): boolean {
    return article.statusId !== StatusEnum.PUBLISHED;
  }

  publish(articleId: number): void {
    this.articleService.publishArticle(articleId).subscribe(result => {
      this.getArticles();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  } */

}
