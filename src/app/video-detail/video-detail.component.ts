import { Component, OnInit, Input } from "@angular/core";
import { Video } from "../video";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { VideoService } from "../video.service";

@Component({
  selector: "app-video-detail",
  templateUrl: "./video-detail.component.html",
  styleUrls: ["./video-detail.component.css"]
})
export class VideoDetailComponent implements OnInit {
  @Input() video: Video;

  constructor(
    private route: ActivatedRoute, //holds info about the route
    private videoService: VideoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.videoService.getVideo(id).subscribe(video => (this.video = video));
  }

  goBack(): void {
    this.location.back();
  }
}
