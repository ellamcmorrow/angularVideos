import { Component, OnInit, Input } from "@angular/core";
import { Video } from "../video";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { VideoService } from "../video.service";

@Component({
  selector: "app-video-detail",
  templateUrl: "./video-detail.component.html",
  styleUrls: ["./video-detail.component.less"]
})
export class VideoDetailComponent implements OnInit {
  video: Video;

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
    this.videoService.getVideo(id).subscribe(data => {
      const video = data.items[0];
      this.video = {
        videoId: video.id,
        title: video.snippet.title,
        thumbnailUrl: video.snippet.thumbnails.default.url,
        channelId: video.snippet.channelId,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        description: video.snippet.description
      };
    });
    console.log("Video:" + JSON.stringify(this.video));
  }

  goBack(): void {
    this.location.back();
  }
}
