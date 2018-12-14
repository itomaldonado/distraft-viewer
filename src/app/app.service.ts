import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cluster, Node, NodeStatusResponse, PostResponse } from './app.objects';
import {getACluster} from './app.mocks'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root',})
export class DistRaftService {

    constructor(private http: HttpClient) { }

    getNodeStatus(id: string, url: string): Observable<NodeStatusResponse> {
        return this.http.get<NodeStatusResponse>(url);
    }

    changeNodeStatus(url: string, state: string): void {
        console.log(`changeNodeStatus() --> ${url}${state}`)
        this.http.get(`${url}${state}`).subscribe(resp => console.log(`OK: ${resp['ok']}`));
    }

    sendCommand(url: string, key: string, value: string): Observable<PostResponse> {
        console.log(`sendCommand() --> Post: "${url}${key}" --data "value=${value}"`)
        var body = {'value': value}
        return this.http.post<PostResponse>(`${url}${key}`, body);
    }

}