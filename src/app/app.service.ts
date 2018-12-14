import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cluster, Node, NodeStatusResponse } from './app.objects';
import {getACluster} from './app.mocks'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root',})
export class DistRaftService {

    constructor(private http: HttpClient) { }

    getNodeStatus(id: string, url: string): Observable<NodeStatusResponse> {
        /*
        // Mocked data...
        let c: Cluster = getACluster('test', url);
        let node: Node = null;

        // get node info
        for (let n of c.nodes) {
            if (n.id === id) {
                node = n;
            }
        }

        return of({"ok": "success", "status": node});
        */
        return this.http.get<NodeStatusResponse>(url);
    }

    changeNodeStatus(url: string, state: string): void {
        /*
        // Mocked data...
        let c: Cluster = getACluster('test', url);
        let node: Node = null;

        // get node info
        for (let n of c.nodes) {
            if (n.id === id) {
                node = n;
            }
        }

        return of({"ok": "success", "status": node});
        */
        console.log(`changeNodeStatus() --> ${url}${state}`)
        this.http.get(`${url}${state}`).subscribe(resp => console.log(`OK: ${resp['ok']}`));
    }
}