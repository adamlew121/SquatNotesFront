import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ImageService} from '../services/image.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent implements OnInit {
  selectedFile: any = null;
  imgSrc = 'assets/img/default_profile_photo.png';
  imageFromDb: any = null;
  @ViewChild('content', {static: false})
  element: TemplateRef<any>;
  modalReference: any;

  constructor(private imageService: ImageService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadPhoto(1);
  }

  onFileChanged(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const oldSrc = this.imgSrc;
      this.imgSrc = e.target.result;
      this.open(this.element, oldSrc);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  loadPhoto(idUser) {
    this.imageService.loadImage(idUser).subscribe(res => {
      if (res != null) {
        this.imageFromDb = res;
        const reader = new FileReader();
        reader.onload = (e: any) => this.imgSrc = e.target.result;
        reader.readAsDataURL(this.imageFromDb);
      }
    });
  }

  open(content, oldSrc) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then(() => {
      },
      () => {
        this.imgSrc = oldSrc;
      });
  }

  selectedImage(event): void {
    this.imgSrc = event.src;
    this.selectedFile = event.file;
    this.imageService.uploadImage(1, this.selectedFile);
    this.modalReference.close();
  }
}
