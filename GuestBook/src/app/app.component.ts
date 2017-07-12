import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private _httpService: Http) { }
    posts: Post[] = [];
    template: "";
    regions: [
        { value: 'title', desc: 'In title' },
        { value: 'content', desc: 'In content' },
        { value: 'both', desc: 'In title or content' }
    ];
    // selected region for finding
    region: { value: 'title', desc: 'In title' };
    ngOnInit() {
        // selected region for finding
        this.region = { value: 'title', desc: 'In title' };
        this._httpService.get('/api/posts').subscribe(values => {
            this.posts = values.json() as Post[];
        });
    }

    reload() {
        console.log("reload called");
        this._httpService.get('/api/posts?region=' + this.region.value + '&template=' + this.template).subscribe(values => {
            this.posts = values.json() as Post[];
        });
    }
}
export class Post {
    title: string;
    content: string;
    creationTime: Date;

    constructor(title: string, content: string, creationTime: Date) {
        this.title = title;
        this.content = content;
        this.creationTime = creationTime;
    }
}
