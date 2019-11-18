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
  video: Video = {
    videoId: undefined,
    title: undefined,
    thumbnailUrl: undefined,
    channelTitle: undefined,
    channelId: undefined,
    publishedAt: undefined,
    description: undefined,
  };

  constructor(
    private route: ActivatedRoute, //holds info about the route
    private videoService: VideoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }
//return a single video
  getVideo(): void {
    const id = this.route.snapshot.paramMap.get("id.videoId");
    this.videoService.getVideo(id).subscribe(video => {
      debugger;
      // const newVideo = {
      //   videoId: string;
      //   title: string;
      //   thumbnailUrl: string;
      //   channelTitle: string;
      //   channelId: string;
      //   publishedAt: string;
      //   description: string;
      // }
      this.video = video;
    });
    console.log("Video: " + JSON.stringify(this.video));
  }

  goBack(): void {
    this.location.back();
  }
}
