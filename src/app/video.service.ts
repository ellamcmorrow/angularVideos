import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Video} from './video';
import {MessageService} from './message.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    private videosUrl =
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAsMiGn7Z09Yh1zYyJlmPf0ak8XwZ7lFJY&channelId=UCcyq283he07B7_KUX07mmtA&order=date&part=snippet%20&type=video,id&maxResults=10';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {
    }

    /** GET videos from the server */
    getVideos(): Observable<any[]> {
        return this.http.get<Video[]>(this.videosUrl).pipe(
            tap(videos => this.log(`fetched videos`)), // log each values emitted by observable
            catchError(this.handleError('getvideos', []))
        );
    }

    /** GET hero by id. Will 404 if id not found */
    getVideo(id: string): Observable<any> {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyAsMiGn7Z09Yh1zYyJlmPf0ak8XwZ7lFJY`;
        return this.http.get<Video>(url)
            .pipe(
                tap(_ => this.log(`fetched video id=${id}`)),
                catchError(this.handleError<Video>(`getVideo id=${id}`))
            );
    }

    /** Log a VideoService message with the MessageService */
    private log(message: string) {
        this.messageService.add('VideoService: ' + message);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
