export interface Cluster {
  name: string;
  first_member: string;
  nodes: Array<Node>;
}

export interface Node {
  id:               string;
  leader:           string;
  is_leader:        boolean;
  state:            string;
  up:               boolean;
  commit_index:     number;
  last_applied:     number;
  last_log_index:   number;
  last_log_term:    number;
  term:             number;
  next_index:       any;
  match_index:      any;
  members:          any;
}

export interface NodeStatusResponse {
  'ok': string;
  'status': Node;
}