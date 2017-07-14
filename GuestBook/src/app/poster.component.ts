import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'

@Component({
    selector: 'poster-comp',
    templateUrl: './poster.component.html',
    styleUrls: ['./poster.component.css']
})
export class PosterComponent {
    constructor(private _httpService: Http) { }
    title: string;
    content: string;
    post() {
        const params = new URLSearchParams();
            params.set('title', this.title);
            params.set('content', this.content);
        
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 

        this._httpService.post('/api/posts', params.toString(), { headers: headers })
            .subscribe(resp => {
                this.title = "";
                this.content = "";
                this.onPosted.emit(resp);
            });

        console.log("ok");
    }   
    @Output() onPosted = new EventEmitter<Response>();
}