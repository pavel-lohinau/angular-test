import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {

  hero: Hero;
  hero$: Observable<Hero>;
  editForm: FormGroup;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required]
    });
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getHero(+params.get('id')))
    );
    this.hero$.subscribe(x => this.editForm.setValue(x));
  }

  goBack() {
    window.history.go(-1);
  }
  delete() {
    //   console.log(this.hero);
    this.heroService.deleteHero(this.editForm.value).subscribe(
      x => { this.router.navigate(['heroes']); },
      err => console.log(err));
    //   window.history.go(-1);
  }
  update() {
    this.heroService.updateHero(this.editForm.value).subscribe(
      x => { this.router.navigate(['heroes']); },
      err => console.log(err));
  }
}
