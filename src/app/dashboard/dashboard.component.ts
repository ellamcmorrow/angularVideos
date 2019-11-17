import { Component, OnInit } from "@angular/core";
import { Video } from "../video";
import { VideoService } from "../video.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  videos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos().subscribe(data => {
      for (let element of data["items"]) {
        this.videos.push(element);
      }
    });
  }
}
