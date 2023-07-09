import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, map } from 'rxjs';

import { ComponentService } from "./app.component.service";

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FaceLocked_Frontend';
  data:string = "";

  constructor(private ComponentService:ComponentService) {
  }


  public get_data() {
    this.data = "Updated Data."
  };
  public unget_data() {
    this.data = ""
  };


  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  image = "";

  response:any = "";

  ngOnInit() {}

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    this.image = webcamImage!.imageAsBase64;
    // console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public send_image_0(image: any): Observable<any> {
    return this.ComponentService.sendData(image).pipe(
      map((response: any) => {
        // console.log(response);
        return response;
      })
    );
  }

  public send_image_1() {
    this.send_image_0(this.sysImage).subscribe((response) => {
      this.response = response;
      // this.groupData = this.serverResponse;
      console.log("Response: ", this.response);
    });
  }

  public send_image(image:any){
     this.response = this.ComponentService.sendData(image);
     console.log(this.response);
  }

  

  // Image at this.sysImage
}

// export class ItemsComponent {
//   list: string[] = ["0", "1", "2"];
//   Test_name = "Test.";
//   items: string[] = [];
//   test = false;
//   // groups: any;

//   groups: {[key: string]: { creator_name: string; group_name: string; id: number; members: string[]; }} = {};

//   response: any;

//   serverResponse: any;

//   groupData:Record<string, Group> = {};

//   // userProfile: any;

//   userProfileJSON: any;

//   constructor(private ItemsService: ItemsService, public auth: AuthService, public router: Router){
//     // this.auth.user$.subscribe((profile) => {
//     //   this.userProfileJSON = profile;
//     //   this.serverResponse = this.populate(this.userProfileJSON);
//     //   this.groupData = this.serverResponse;
//     //   console.log("groupData: ", this.groupData);
//     // });
//     this.auth.user$.subscribe((profile) => {
//       this.userProfileJSON = profile;
//       this.populate(this.userProfileJSON).subscribe((response) => {
//         this.serverResponse = response;
//         this.groupData = this.serverResponse;
//         // console.log("groupData: ", this.groupData);
//       });
//     });
//   }


//   // ngOnInit() {  }


//   public populate(userProfile: any): Observable<any> {
//     return this.ItemsService.sendData(userProfile).pipe(
//       map((response: any) => {
//         // console.log(response);
//         return response;
//       })
//     );
//   }

//   public visit(value: any) {
//     this.router.navigate(['/group'], { queryParams: { groupId: value } });
//     console.log(value);
//   }
// }