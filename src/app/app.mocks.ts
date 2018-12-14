import { Cluster, Node } from './app.objects';

// Add a cluster (template below)          
export function getACluster(name, first_member): Cluster {
    let cluster: Cluster = JSON.parse(`
        {
            "name": "${name}",
            "first_member": "${first_member}",
            "nodes": [
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
                "term": 11,
                "up": true
              },
              {
                "commit_index": 0,
                "id": "server2",
                "is_leader": false,
                "last_applied": 0,
                "last_log_index": 0,
                "last_log_term": 0,
                "leader": "server1",
                "match_index": {},
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
                "next_index": {},
                "state": "Follower",
                "term": 11,
                "up": true
              },
              {
                "commit_index": 0,
                "id": "server3",
                "is_leader": false,
                "last_applied": 0,
                "last_log_index": 0,
                "last_log_term": 0,
                "leader": "server1",
                "match_index": {},
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
                "next_index": {},
                "state": "Follower",
                "term": 11,
                "up": true
              },
              {
                "commit_index": 0,
                "id": "server4",
                "is_leader": false,
                "last_applied": 0,
                "last_log_index": 0,
                "last_log_term": 0,
                "leader": "server1",
                "match_index": {},
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
                "next_index": {},
                "state": "Follower",
                "term": 11,
                "up": true
              },
              {
                "commit_index": 0,
                "id": "server5",
                "is_leader": false,
                "last_applied": 0,
                "last_log_index": 0,
                "last_log_term": 0,
                "leader": "server1",
                "match_index": {},
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
                "next_index": {},
                "state": "Follower",
                "term": 11,
                "up": false
              }
            ]
        }
    `);
    return cluster
  }