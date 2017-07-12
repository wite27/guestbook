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
    region: "title";
    ngOnInit() {
        this._httpService.get('/api/posts').subscribe(values => {
            this.region = "title";
            this.posts = (values.json() as PagedPosts).posts;
        });
    }

    reload() {
        console.log("reload called");
        this._httpService.get('/api/posts?region=' + this.region + '&template=' + this.template).subscribe(values => {
            this.posts = (values.json() as PagedPosts).posts;
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

export class PagedPosts {
    posts: Post[];
    page: number;
    totalPages: number;

    constructor(posts: Post[], page: number, totalPages: number) {
        this.posts = posts;
        this.page = page;
        this.totalPages = totalPages;
    }
}
