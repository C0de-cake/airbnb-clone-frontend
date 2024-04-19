import {Component, EventEmitter, inject, input, OnInit, Output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Category, CategoryName} from "../../../../layout/navbar/category/category.model";
import {CategoryService} from "../../../../layout/navbar/category/category.service";

@Component({
  selector: 'app-category-step',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './category-step.component.html',
  styleUrl: './category-step.component.scss'
})
export class CategoryStepComponent implements OnInit {

  categoryName = input.required<CategoryName>();

  @Output()
  categoryChange = new EventEmitter<CategoryName>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  categoryService = inject(CategoryService);
  categories: Category[] | undefined;

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  onSelectCategory(newCategory: CategoryName): void {
    this.categoryChange.emit(newCategory);
    this.stepValidityChange.emit(true);
  }
}
