import { Component } from '@angular/core';
import { Http } from '@angular/http'

@Component({
    selector: 'poster-comp',
    templateUrl: './poster.component.html',
    styleUrls: ['./poster.component.css']
})
export class PosterComponent {
    constructor(private _httpService: Http) { }
    post(title: string, content: string) {
        this._httpService.post('/api/posts?title=' + title + '&content=' + content, "");
    }
}