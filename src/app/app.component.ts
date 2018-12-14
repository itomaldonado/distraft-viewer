import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { Cluster, Node, NodeStatusResponse, PostResponse } from './app.objects'
import { DistRaftService } from './app.service';

/* Example Node:
{
    "commit_index": 0, 
    "id": "server1", 
    "is_leader": true, 
    "last_applied": 0, 
    "last_log_index": 0, 
    "last_log_term": 0, 
    "leader": "server1", 
    "match_index": {
      "server2": 1, 
      "server3": 1, 
      "server4": 1, 
      "server5": 1
    }, 
    "members": {
      "server1": [
        "server1", 
        9000, 
        "127.0.0.1", 
        5001
      ], 
      "server2": [
        "server2", 
        9000, 
        "127.0.0.1", 
        5002
      ], 
      "server3": [
        "server3", 
        9000, 
        "127.0.0.1", 
        5003
      ], 
      "server4": [
        "server4", 
        9000, 
        "127.0.0.1", 
        5004
      ], 
      "server5": [
        "server5", 
        9000, 
        "127.0.0.1", 
        5005
      ]
    }, 
    "next_index": {
      "server2": 1, 
      "server3": 1, 
      "server4": 1, 
      "server5": 1
    }, 
    "state": "Leader", 
    "term": 1, 
    "up": true
  }
}
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'distraft-viewer';
  clusterName;
  clusterDict:{ [key: string]: Cluster; } = {};
  interval: any;

  constructor(private distraftService: DistRaftService) { }
  //clusterForm: new FormGroup()

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => { this.refreshData(); }, 500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

    addCluster(name, first_member){
      if ((name!=="") && (first_member!=="") && (name in this.clusterDict)){
        alert(`Cluster ${name} already added`);
      }else if((name!=="") && (first_member!=="")){
        this.clusterDict[name] = {'name': name, 'first_member': first_member, 'nodes': []};
        this.distraftService.getNodeStatus('server1',first_member).subscribe(
          (resp) => this.getNodeStatusFromMembers(name, resp)
        );
      }else{
        alert('Missing "name" or "first member" Fields**');
      }

    }

  sendRequest(c_name: string, key: string, value: string) {
    if (this.clusterDict[c_name]) {
      var node = this.clusterDict[c_name].nodes[0]
      this.distraftService.sendCommand(this.getMemberUrl(node), key, value).subscribe(resp => this.parseSendRequestResponse(resp));
    }
    
  }

  private parseSendRequestResponse(response: PostResponse) {
    if(response['ok']!=='success') {
      var reason = response["error"];
      alert(`Could not send request, reason: ${reason}.`);
    }
  }

  private getNodeStatusFromMembers(cluster_name, node_resp) {
    let resp: NodeStatusResponse = node_resp;
    if (resp.status) {
      var members = [];
      var n = resp['status'];
      for (let key in n.members) {
          var new_m = {"id": key, "url":`http://${n.members[key][2]}:${n.members[key][3]}/`};
          members.push(new_m);
      }

      // get all memebr's statuses!
      for (let m of members) {
        this.distraftService.getNodeStatus(m.id, m.url).subscribe((resp) => this.updateNodeStatus(cluster_name, resp));
      }
    }
  }

  private updateNodeStatus(cluster_name, node_resp) {
    let node: Node = node_resp.status;
    if (node !== null) {
      if (this.clusterDict[cluster_name] && this.clusterDict[cluster_name].nodes.some(e => e.id === node.id)) {
        var index = this.clusterDict[cluster_name].nodes.indexOf(this.clusterDict[cluster_name].nodes.find(e => e.id === node.id))
        this.clusterDict[cluster_name].nodes[index] = node;

      } else if (this.clusterDict[cluster_name]) {
        this.clusterDict[cluster_name].nodes.push(node);
      }
    }
  }

  private refreshData(): void {
    for (let c in this.clusterDict) {
      for (let m of this.clusterDict[c].nodes) {
        this.distraftService.getNodeStatus(m.id, this.getMemberUrl(m)).subscribe((resp) => this.updateNodeStatus(c, resp));
      }
    }
      
  }

  private getMemberUrl(node): string {
    var address_arr = node.members[node.id]
    return `http://${address_arr[2]}:${address_arr[3]}/`
  }

  keys(dict) : Array<string> {
    return Object.keys(dict);
  }

  deleteCluster(value){
   delete this.clusterDict[value];
  }

  changeNodeState(node, state){
    this.distraftService.changeNodeStatus(this.getMemberUrl(node), state);
  }

  clusterSubmit(name,first_member){
    this.addCluster(name, first_member);
  }

  sortedNames = (a, b) => {
    return a.key < b.key ? -1 : 1;
  }
}