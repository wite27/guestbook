import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http'

@Component({
    selector: 'poster-comp',
    templateUrl: './poster.component.html',
    styleUrls: ['./poster.component.css']
})
export class PosterComponent {
    constructor(private _httpService: Http) { }
    post(title: string, content: string) {
        //const body = JSON.stringify(new PostToPost(title, content));
        const params = new URLSearchParams();
            params.set('title', title);
            params.set('content', content);

        //const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 

        this._httpService.post('/api/posts', params.toString(), { headers: headers })
            .subscribe(resp => console.log(resp));

        console.log("ok");
    }
}
export class PostToPost {
    title: string;
    content: string;
    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}