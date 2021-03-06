import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VideosComponent } from "./videos/videos.component";
import { VideoDetailComponent } from "./video-detail/video-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/videos", pathMatch: "full" },
  { path: "detail/:id.videoId", component: VideoDetailComponent },
  { path: "videos", component: VideosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
