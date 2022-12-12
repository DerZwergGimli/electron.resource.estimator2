export interface VM {
  id: number;
  uuids: string[];
  name: string;
  os: string;
  preset: string | undefined;
  vcpu: SystemRecommendations;
  vram: SystemRecommendations;
  vstorage: SystemRecommendations;
}

export interface SystemRecommendations {
  min: number;
  rec: number;
  max: number;
}
