import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { SpecialtyService } from '../core/services/specialty.service';
import { Specialty } from '../core/models/specialty.model';

@Component({
  selector: 'app-specialists-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './specialists-dashboard.html',
  styleUrl: './specialists-dashboard.css',
})
export class SpecialistsDashboard implements OnInit {
  public specialtyService = inject(SpecialtyService);
  private fb = inject(FormBuilder);

  showForm = signal(false);
  isEditing = signal(false);
  editingId = signal<string | null>(null);
  
  specialtyForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: [null]
  });

  selectedFile = signal<File | null>(null);

  ngOnInit() {
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.specialtyService.getAllSpecialties().subscribe();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile.set(file);
    }
  }

  openAddForm() {
    this.isEditing.set(false);
    this.editingId.set(null);
    this.specialtyForm.reset();
    this.selectedFile.set(null);
    this.showForm.set(true);
  }

  openEditForm(specialty: Specialty) {
    this.isEditing.set(true);
    this.editingId.set(specialty.id);
    this.specialtyForm.patchValue({
      name: specialty.name,
      description: specialty.description
    });
    this.selectedFile.set(null);
    this.showForm.set(true);
  }

  cancelForm() {
    this.showForm.set(false);
    this.specialtyForm.reset();
  }

  onSubmit() {
    if (this.specialtyForm.invalid) {
      return;
    }

    const formData = {
      name: this.specialtyForm.value.name,
      description: this.specialtyForm.value.description,
      image: this.selectedFile()
    };

    if (this.isEditing() && this.editingId()) {
      this.specialtyService.updateSpecialty(this.editingId()!, formData).subscribe({
        next: () => {
          this.loadSpecialties();
          this.cancelForm();
        }
      });
    } else {
      this.specialtyService.createSpecialty(formData).subscribe({
        next: () => {
          this.loadSpecialties();
          this.cancelForm();
        }
      });
    }
  }

  deleteSpecialty(id: string) {
    if (confirm('Are you sure you want to delete this specialty?')) {
      this.specialtyService.deleteSpecialty(id).subscribe({
        next: () => {
          this.loadSpecialties();
        }
      });
    }
  }

  restoreSpecialty(id: string) {
    this.specialtyService.restoreSpecialty(id).subscribe({
      next: () => {
        this.loadSpecialties();
      }
    });
  }
}
