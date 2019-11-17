import { Component, OnInit } from "@angular/core";
import { Video } from "../video";
import { VideoService } from "../video.service";

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.css"]
})
export class VideosComponent implements OnInit {
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
