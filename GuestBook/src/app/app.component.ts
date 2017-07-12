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
    currentPage: number;
    totalPages: number;
    template: "";
    region: "title";
    ngOnInit() {
        this._httpService.get('/api/posts').subscribe(values => {
            this.region = "title";
            this.template = "";
            let paged = (values.json() as PagedPosts);
            this.posts = paged.posts;
            this.currentPage = paged.page;
            this.totalPages = paged.totalPages;
        });
    }

    reload() {
        console.log("reload called");
        this._httpService.get('/api/posts?region=' + this.region + '&template=' + this.template).subscribe(values => {
            let paged = (values.json() as PagedPosts);
            this.posts = paged.posts;
            this.currentPage = paged.page;
            this.totalPages = paged.totalPages;
        });
    }

    setPage(page: number) {
        this._httpService.get('/api/posts?region=' + this.region + '&template=' + this.template + '&page=' + page).subscribe(values => {
            let paged = (values.json() as PagedPosts);
            this.posts = paged.posts;
            this.currentPage = paged.page;
            this.totalPages = paged.totalPages;
        });
    }

    range(min: number, max: number) {
        var input = [];
        for (var i = min; i <= max; i += 1) {
            input.push(i);
        }
        return input;
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
