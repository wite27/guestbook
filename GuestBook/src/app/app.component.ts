import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
        this.region = "title";
        this.template = "";
        this.getData();
    }

    reload() {
        this.getData(this.region, this.template);
    }

    setPage(page: number) {
        this.getData(this.region, this.template, page);
    }

    onPosted(resp: Response) {
        this.reload();
    }

    subscripition: Subscription;

    getData(region: string = undefined, template: string = undefined, page: number = undefined) {
        const params = new URLSearchParams();
        if (region)
            params.set('region', region);
        if (template)
            params.set('template', template);
        if (page)
            params.set('page', page.toString());
        
        if (this.subscripition)
            this.subscripition.unsubscribe();

        this.subscripition = this._httpService.get('/api/posts?', {params: params}).subscribe(values => {
            const paged = (values.json() as PagedPosts);
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
