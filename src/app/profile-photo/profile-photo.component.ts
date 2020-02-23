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
  closeResult: string;
  @ViewChild('content', { static: false })
  element: TemplateRef<any>;
  modalReference: any;

  constructor(private imageService: ImageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadPhoto(1);
  }

  onFileChanged(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
      this.open(this.element);
    };
    reader.readAsDataURL(event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  loadPhoto(idUser) {
    this.imageService.loadImage(idUser).subscribe(res => {
      this.imageFromDb = res;
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(this.imageFromDb);
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  selectedImage(event): void {
    this.imgSrc = event.src;
    this.selectedFile = event.file;
    this.imageService.uploadImage(1, this.selectedFile);
    this.modalReference.close();
  }
}
